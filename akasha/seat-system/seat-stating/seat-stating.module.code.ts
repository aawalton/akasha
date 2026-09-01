import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Given } from "@akasha/command-system/calling"
import { listedAt, slugsOfType } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import { seatPathForName } from "../seat-reading/seat-reading.module.code.ts"

const PERSON = "person"

const DOMAIN = "domain"

const PREFERRED: readonly string[] = [DOMAIN, PERSON, "persona", "initiative"]

export type SeatStated = {
  readonly agentId: string
  readonly persona: string | null
  readonly domain: string | null
  readonly role: string | null
  readonly principal: string | null
  readonly mode: string | null
  readonly registration: string | null
  readonly onCall: boolean
  readonly session: string | null
  readonly parentName: string | null
}

export function assignedKinds(root: string): readonly string[] {
  const rest = [...kindsUnder(root, DOMAIN)].sort()
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

export function seatBody(stated: SeatStated, seatName: string, root: string): string | null {
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
    `  assignmentSlug: ${said(assignmentAddressOf(domain, root))},`,
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
  | { readonly kind: "unchanged" }
  | { readonly kind: "unstated" }
  | { readonly kind: "refused"; readonly said: string }

export function statedSeat(given: Given, stated: SeatStated, seatName: string): Stating {
  const body = seatBody(stated, seatName, given.root)
  if (body === null) return { kind: "unstated" }
  const page = seatPathForName(seatName)
  if (existsSync(join(given.root, page)) && readFileSync(join(given.root, page), "utf8") === body) {
    return { kind: "unchanged" }
  }
  const landed = landingAsked(given, {
    changes: [{ path: page, body: new TextEncoder().encode(body) }],
    message: `${seatName}: the seat is in akasha as what it states`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (landed.code !== 0) return { kind: "refused", said: landed.refusals.join("; ") }
  return { kind: "wrote" }
}
