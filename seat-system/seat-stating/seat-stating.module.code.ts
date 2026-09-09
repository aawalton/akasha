import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "@akasha/changes/mechanical-change-running"
import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { listedAt, readingIn, slugsOfType, typeSlugOf } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages/page-export-name"
import { kindsUnder } from "@akasha/pages/page-type-descent"
import { valueAt } from "@akasha/pages/page-value"
import { seatPathForName } from "../seat-reading/seat-reading.module.code.ts"

const PERSON = "person"

const DOMAIN = "domain"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const PREFERRED: readonly string[] = [DOMAIN, PERSON, "persona", "initiative"]

const PUT = "change-mechanical-file/add-file"

const TAKE = "change-mechanical-file/remove-file-page"

const TAKE_FILE = "change-mechanical-file/remove-file"

const UNFILED = "names no page, so no page is taken away"

const ASSIGNMENT = "assignmentSlug"

const ADDRESSED = "/"

export type SeatStated = {
  readonly agentId: string
  readonly persona: string | null
  readonly domain: string | null
  readonly assignment: string | null
  readonly role: string | null
  readonly principal: string | null
  readonly mode: string | null
  readonly registration: string | null
  readonly onCall: boolean
  readonly session: string | null
  readonly parentName: string | null
}

export function assignedKinds(root: string): readonly string[] {
  const rest = [...kindsUnder(DOMAIN, readingIn(root), (path) => valueAt(path, root))].sort()
  return [...PREFERRED, ...rest.filter((one) => !PREFERRED.includes(one))]
}

export function assignmentAddressOf(named: string, root: string): string {
  const kinds = assignedKinds(root)
  const at = named.indexOf(ADDRESSED)
  if (at > 0) {
    const kind = named.slice(0, at)
    if (kinds.includes(kind) && listedAt(root, kind, named.slice(at + 1)).length > 0) return named
  }
  for (const kind of kinds) {
    if (listedAt(root, kind, named).length > 0) return `${kind}/${named}`
  }
  return `${DOMAIN}/${named}`
}

export function personNamed(root: string, principal: string): boolean {
  return slugsOfType(root, PERSON).includes(principal)
}

function said(value: string): string {
  return JSON.stringify(value)
}

export function assignmentStatedIn(value: unknown, slug: string): string | null {
  if (typeof value !== "string") return null
  const at = value.indexOf(ADDRESSED)
  if (at < 1) return null
  return value.slice(at + 1) === slug ? value : null
}

export function assignmentStatedOn(page: string, root: string, slug: string): string | null {
  const held = valueAt(page, root)
  if (held === null) return null
  return assignmentStatedIn((held as Record<string, unknown>)[ASSIGNMENT], slug)
}

export function seatBody(
  stated: SeatStated,
  seatName: string,
  root: string,
  addressed: string | null = null
): string | null {
  const { persona, domain, role, principal, mode, registration } = stated
  if (persona === null || domain === null || role === null || principal === null) return null
  if (mode === null || registration === null) return null
  const person = personNamed(root, principal)
  const above = person ? null : stated.parentName
  if (!person && (above === null || above === "")) return null
  const typeSlug = said(typeSlugOf(root, SEAT_TYPE))
  return [
    'import type { Seat } from "../seat.page-type.ts"',
    "",
    `export const ${exportedAs(seatName)} = {`,
    `  id: ${said(stated.agentId)},`,
    `  pageTypeSlug: ${typeSlug},`,
    `  type: ${typeSlug},`,
    `  slug: ${said(seatName)},`,
    `  persona: ${said(persona)},`,
    `  assignmentSlug: ${said(addressed ?? assignmentAddressOf(domain, root))},`,
    `  role: ${said(role)},`,
    person ? `  person: ${said(principal)},` : `  principalSeatName: ${said(above as string)},`,
    `  startMode: ${said(mode)},`,
    `  onCall: ${stated.onCall ? "true" : "false"},`,
    `  registrationAccount: ${said(registration)},`,
    ...(stated.session === null ? [] : [`  claudeCodeSessionUuid: ${said(stated.session)},`]),
    "} as const satisfies Seat",
    "",
  ].join("\n")
}

export type Stating =
  | { readonly kind: "wrote" }
  | { readonly kind: "took" }
  | { readonly kind: "unchanged" }
  | { readonly kind: "unstated" }
  | { readonly kind: "refused"; readonly said: string }

export function addressFor(
  stated: SeatStated,
  page: string,
  root: string,
  there: boolean
): string | null {
  const { domain, assignment } = stated
  if (domain === null) return null
  const onPage = there ? assignmentStatedOn(page, root, domain) : null
  return onPage ?? assignmentStatedIn(assignment, domain)
}

export async function statedSeat(
  root: string,
  stated: SeatStated,
  seatName: string
): Promise<Stating> {
  const page = seatPathForName(seatName)
  const there = existsSync(join(root, page))
  const addressed = addressFor(stated, page, root, there)
  const body = seatBody(stated, seatName, root, addressed)
  if (body === null) return { kind: "unstated" }
  if (there && readFileSync(join(root, page), "utf8") === body) {
    return { kind: "unchanged" }
  }
  const landed = await runMechanicalChange(
    root,
    [{ at: PUT, given: { at: page, body } }],
    `${seatName}: the seat is in akasha as what it states`
  )
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return { kind: "refused", said: wrong.join("; ") }
  return { kind: "wrote" }
}

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

export function wrongIn(landed: Awaited<ReturnType<Landing>>): readonly string[] {
  return "refusals" in landed ? landed.refusals : landed.wrong
}

export function unfiled(wrong: readonly string[]): boolean {
  return wrong.length === 1 && wrong[0]?.includes(UNFILED) === true
}

export async function tookSeat(
  root: string,
  seatName: string,
  why: string,
  landing: Landing = runMechanicalChange
): Promise<Stating> {
  const page = seatPathForName(seatName)
  if (!existsSync(join(root, page))) return { kind: "unchanged" }
  const message = `${seatName} stopped, ${why}, so its page goes`
  const wrong = wrongIn(await landing(root, [{ at: TAKE, given: { at: page } }], message))
  if (wrong.length === 0) return { kind: "took" }
  if (!unfiled(wrong)) return { kind: "refused", said: wrong.join("; ") }
  const left = wrongIn(await landing(root, [{ at: TAKE_FILE, given: { at: page } }], message))
  if (left.length > 0) return { kind: "refused", said: left.join("; ") }
  return { kind: "took" }
}
