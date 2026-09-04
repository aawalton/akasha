import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { listedAt, readingIn, slugsOfType } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import { valueAt } from "@akasha/pages-system/page-value"
import { seatPathForName } from "../seat-reading/seat-reading.module.code.ts"

const PERSON = "person"

const DOMAIN = "domain"

const PREFERRED: readonly string[] = [DOMAIN, PERSON, "persona", "initiative"]

const CALLED_AS = "seat-stating"

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
  for (const kind of assignedKinds(root)) {
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
  return [
    'import type { Seat } from "../seat.page-type.ts"',
    "",
    `export const ${exportedAs(seatName)} = {`,
    `  id: ${said(stated.agentId)},`,
    '  pageTypeSlug: "seat",',
    `  slug: ${said(seatName)},`,
    `  personaSlug: ${said(persona)},`,
    `  assignmentSlug: ${said(addressed ?? assignmentAddressOf(domain, root))},`,
    `  roleSlug: ${said(role)},`,
    person ? `  personSlug: ${said(principal)},` : `  principalSeatName: ${said(above as string)},`,
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

export function statedSeat(root: string, stated: SeatStated, seatName: string): Stating {
  const page = seatPathForName(seatName)
  const there = existsSync(join(root, page))
  const addressed = addressFor(stated, page, root, there)
  const body = seatBody(stated, seatName, root, addressed)
  if (body === null) return { kind: "unstated" }
  if (there && readFileSync(join(root, page), "utf8") === body) {
    return { kind: "unchanged" }
  }
  const landed = landedMechanically(
    root,
    CALLED_AS,
    [{ path: page, body: new TextEncoder().encode(body) }],
    `${seatName}: the seat is in akasha as what it states`
  )
  if (landed.code !== 0) return { kind: "refused", said: landed.refusals.join("; ") }
  return { kind: "wrote" }
}

export function tookSeat(root: string, seatName: string, why: string): Stating {
  const page = seatPathForName(seatName)
  if (!existsSync(join(root, page))) return { kind: "unchanged" }
  const landed = landedMechanically(
    root,
    CALLED_AS,
    [{ path: page, body: null }],
    `${seatName} stopped, ${why}, so its page goes`
  )
  if (landed.code !== 0) return { kind: "refused", said: landed.refusals.join("; ") }
  return { kind: "took" }
}
