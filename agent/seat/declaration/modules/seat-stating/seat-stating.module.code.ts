import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { seatPathForName } from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import {
  listedAt,
  readingIn,
  slugsOfType,
  typeSlugOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { importedFrom, saidAs } from "akasha/page/modules/body/page-body.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const PERSON = "person"

const PERSONA = "persona"

const ROLE = "role"

const SEAT = "seat"

const DOMAIN = "domain"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const PREFERRED: readonly string[] = [DOMAIN, PERSON, "persona", "initiative"]

const PUT = `${changeMechanicalFile.slug}/${addFile.slug}` as const

const TAKE = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const TAKE_FILE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const UNFILED = "names no page, so no page is taken away"

const ASSIGNMENT = "assignmentSlug"

const ADDRESSED = "/"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const HOLDS = "ts"

export function typedFrom(root: string, typeSlug: string): string {
  const at = listedAt(root, PAGE_TYPE, typeSlug)[0]?.path
  if (at === undefined) return ""
  const typing = valueAt(at, root) ?? {}
  const stated = (typing as Record<string, unknown>)[TYPES]
  return importedFrom((stated === HOLDS ? besideAt(at, TYPES, HOLDS) : null) ?? at)
}

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
  const rest = [...kindsUnder(DOMAIN, readingIn(root))].sort()
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

export function assignmentStatedIn(value: unknown, slug: string): string | null {
  if (typeof value !== "string") return null
  const at = value.indexOf(ADDRESSED)
  if (at < 1) return null
  return value.slice(at + 1) === slug ? value : null
}

function assignmentStatedOn(page: string, root: string, slug: string): string | null {
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
  const typeSlug = typeSlugOf(root, SEAT_TYPE)
  const from = typedFrom(root, typeSlug)
  if (from === "") return null
  const named = saidAs(namedAs(PAGE_TYPE, typeSlug, null))
  return [
    `import type { Seat } from ${saidAs(from)}`,
    "",
    `export const ${exportedAs(seatName)} = {`,
    `  id: ${saidAs(stated.agentId)},`,
    `  type: ${named},`,
    `  slug: ${saidAs(seatName)},`,
    `  persona: ${saidAs(namedAs(PERSONA, persona, null))},`,
    `  assignmentSlug: ${saidAs(addressed ?? assignmentAddressOf(domain, root))},`,
    `  role: ${saidAs(namedAs(ROLE, role, null))},`,
    person
      ? `  person: ${saidAs(namedAs(PERSON, principal, null))},`
      : `  principalSeatName: ${saidAs(namedAs(SEAT, above as string, null))},`,
    `  startMode: ${saidAs(mode)},`,
    `  onCall: ${stated.onCall ? "true" : "false"},`,
    `  registrationAccount: ${saidAs(registration)},`,
    ...(stated.session === null ? [] : [`  claudeCodeSessionUuid: ${saidAs(stated.session)},`]),
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

function refusing(wrong: readonly string[], done: readonly string[]): Stating {
  return { kind: "refused", said: [wrong.join("; "), ...partWay(done)].join(" ") }
}

export async function statedSeat(
  root: string,
  stated: SeatStated,
  seatName: string,
  landing: Landing = runMechanicalChange
): Promise<Stating> {
  const page = seatPathForName(seatName)
  const there = existsSync(join(root, page))
  const was = there ? readFileSync(join(root, page), "utf8") : null
  const addressed = addressFor(stated, page, root, there)
  const body = seatBody(stated, seatName, root, addressed)
  if (body === null) return { kind: "unstated" }
  if (was === body) return { kind: "unchanged" }
  const given = was === null ? { at: page, body } : { at: page, body, old: was }
  const done: string[] = []
  const landed = await landing(
    root,
    [{ at: PUT, given }],
    `${seatName}: the seat is in akasha as what it states`,
    { done }
  )
  const refused = refusalsIn(landed)
  if (refused.length > 0) return refusing(refused, done)
  return { kind: "wrote" }
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
  const done: string[] = []
  const refused = refusalsIn(
    await landing(root, [{ at: TAKE, given: { at: page } }], message, { done })
  )
  if (refused.length === 0) return { kind: "took" }
  if (!unfiled(refused)) return refusing(refused, done)
  const taken: readonly Asking[] = [{ at: TAKE_FILE, given: { at: page } }]
  const left = refusalsIn(await landing(root, taken, message, { done }))
  if (left.length > 0) return refusing(left, done)
  return { kind: "took" }
}
