import { expect } from "bun:test"
import { RING_CREDENTIAL_HEADER } from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import {
  answerStoplightsAdmittedBy,
  type Stoplighted,
  stoplightsInGroup,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { readingValues } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  slugsIn,
  textIn,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const GROUP = "a-group-named-only-in-this-test"

export const READOUT = "a-readout-named-only-in-this-test"

export const OTHER = "another-readout-named-only-in-this-test"

const SCALE = "a-scale-named-only-in-this-test"

const SCALE_AT = `readout-scale/${SCALE}`

const GROUP_AT = `readout-group/${GROUP}`

export const READOUT_ROW = {
  slug: READOUT,
  label: "Safety",
  unit: "levels",
  place: 1,
  scale: SCALE_AT,
  wireKey: "safety",
  groups: [GROUP_AT],
}

export const OTHER_ROW = {
  slug: OTHER,
  label: "Surplus",
  place: 2,
  scale: SCALE_AT,
  wireKey: "surplus",
  groups: [GROUP_AT],
}

export const SCALE_ROW = { slug: SCALE, redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 }

export const GROUP_ROW = { slug: GROUP, wireKeyName: "habit" }

export const ANSWERED: {
  readouts: readonly Record<string, unknown>[]
  scales: readonly Record<string, unknown>[]
  groups: readonly Record<string, unknown>[]
} = { readouts: [READOUT_ROW], scales: [SCALE_ROW], groups: [GROUP_ROW] }

export function answeredAfresh(): undefined {
  ANSWERED.readouts = [READOUT_ROW]
  ANSWERED.scales = [SCALE_ROW]
  ANSWERED.groups = [GROUP_ROW]
  return undefined
}

type Rows = readonly Record<string, unknown>[]

type AskedOf = {
  pageTypeSlug: string
  where?: { slug?: { is?: string }; groups?: { has?: string } }
}

export function rowsAsked(rows: Rows, where: AskedOf["where"]): Rows {
  const named = where?.slug?.is
  if (named !== undefined) return rows.filter((row) => row.slug === named)
  const grouped = where?.groups?.has
  if (grouped === undefined) return rows
  return rows.filter(
    (row) => Array.isArray(row.groups) && (row.groups as readonly string[]).includes(grouped)
  )
}

let heldOrigin: string | undefined

type Answering = (asked: AskedOf) => Rows

function answeredRows(asked: AskedOf): Rows {
  if (asked.pageTypeSlug === "readout") return ANSWERED.readouts
  if (asked.pageTypeSlug === "readout-group") return ANSWERED.groups
  if (asked.pageTypeSlug === "readout-scale") return ANSWERED.scales
  return []
}

const READ_AT = "/read"

const WRITE_AT = "/write"

const AT_A_COMMIT = "0000000000000000000000000000000000000000"

const written = new Map<string, Record<string, unknown>>()

type Sought = {
  readonly pages?: readonly { readonly pageTypeSlug: string; readonly slug: string }[]
}

type Keeping = {
  readonly kept?: readonly { readonly path: string; readonly values: Record<string, unknown> }[]
}

function pageAt(pageTypeSlug: string, slug: string): string {
  return `${pageTypeSlug}/pages/${slug}/${slug}.${pageTypeSlug}.ts`
}

function writtenOnto(asked: AskedOf, rows: Rows): Rows {
  if (written.size === 0) return rows
  return rows.map((row) => {
    const slug = typeof row.slug === "string" ? row.slug : ""
    const held = written.get(pageAt(asked.pageTypeSlug, slug))
    return held === undefined ? row : { ...row, ...held }
  })
}

function placing(answering: Answering, sought: Sought): Response {
  const bodies: { path: string; content: null }[] = []
  const unplaced: string[] = []
  for (const one of sought.pages ?? []) {
    const found = rowsAsked(answering({ pageTypeSlug: one.pageTypeSlug }), {
      slug: { is: one.slug },
    })
    if (found.length === 0) unplaced.push(`${one.pageTypeSlug}/${one.slug}`)
    else bodies.push({ path: pageAt(one.pageTypeSlug, one.slug), content: null })
  }
  return Response.json({ at: AT_A_COMMIT, bodies, unplaced })
}

function keeping(asked: Keeping): Response {
  const kept = asked.kept ?? []
  for (const one of kept) written.set(one.path, { ...(written.get(one.path) ?? {}), ...one.values })
  return Response.json({ commit: null, wrote: kept.map((one) => one.path), took: [] })
}

export function servingStore(answering: Answering = answeredRows): ReturnType<typeof Bun.serve> {
  written.clear()
  const store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const at = new URL(request.url).pathname
      const body: unknown = await request.json()
      if (at === READ_AT) return placing(answering, body as Sought)
      if (at === WRITE_AT) return keeping(body as Keeping)
      const asked = body as AskedOf
      return Response.json({ rows: writtenOnto(asked, answering(asked)) })
    },
  })
  heldOrigin = optionalEnv("PAGES_SERVICE_ORIGIN")
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  return store
}

export function storeGoes(store: ReturnType<typeof Bun.serve>): undefined {
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
  return undefined
}

export function figureOffScaleOn(one: Stoplighted | undefined): unknown {
  return one?.figureOffScale
}

export const WIRE_KEY_NAME = "a-key-named-only-in-this-test"

export const agedOut = (): Date => new Date(Date.now() - 46 * 60_000)

export function drawn(): Promise<Response> {
  return answerStoplightsAdmittedBy(new Request("http://a.test/"), () => null, GROUP)
}

export async function stoplights(): Promise<readonly Stoplighted[]> {
  const answered = await drawn()
  expect(answered.status).toBe(200)
  return ((await answered.json()) as { stoplights: readonly Stoplighted[] }).stoplights
}

export async function keysAnswered(wireKeyName?: string): Promise<readonly string[]> {
  if (wireKeyName !== undefined) ANSWERED.groups = [{ ...GROUP_ROW, wireKeyName }]
  const answered = await drawn()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Record<string, unknown>[] }
  return Object.keys(body.stoplights[0] ?? {})
}

export async function keysDrawn(): Promise<readonly unknown[]> {
  return (await stoplights()).map((one) => one.habit)
}

export async function oneDrawn(
  value: number,
  at: Date = new Date(),
  fallsPerHour?: number
): Promise<Stoplighted | undefined> {
  relayedFor(READOUT, value, at, fallsPerHour)
  return (await stoplights())[0]
}

export function rowReading(
  value: number,
  at: Date = new Date(),
  fallsPerHour?: number
): readonly Record<string, unknown>[] {
  return [
    {
      ...READOUT_ROW,
      lastValue: value,
      lastValueAt: at.toISOString(),
      ...(fallsPerHour === undefined ? {} : { lastValueFallsPerHour: fallsPerHour }),
    },
  ]
}

export async function offScaleDrawn(): Promise<unknown> {
  return figureOffScaleOn((await stoplightsInGroup(GROUP))[0])
}

type Drawn = Record<string, unknown>

export type Tile = {
  readonly answer: () => Promise<Response>
  readonly drawn: () => Promise<readonly Drawn[]>
  readonly ringFor: (named: string) => Promise<Drawn | undefined>
  readonly askedWith: (credential: string | null) => Promise<Response>
}

export function colorIn(one: Drawn, key: string): string {
  const held = one[key]
  if (typeof held !== "string") {
    throw new Error(`a stoplight carries no text under \`${key}\`: ${JSON.stringify(held)}`)
  }
  return held
}

type Sent = Readonly<Record<string, string>>

async function stoplightsAt(url: string, headers: Sent): Promise<readonly Drawn[]> {
  const answered = await fetch(url, { headers })
  if (answered.status !== 200) {
    throw new Error(`the tile at ${url} answered ${answered.status} rather than 200`)
  }
  const body = (await answered.json()) as { stoplights: readonly Drawn[] }
  return body.stoplights
}

function ringHeaders(credential: string | null): Sent {
  return credential === null ? {} : { [RING_CREDENTIAL_HEADER]: credential }
}

export function tileAt(
  origin: string,
  path: string,
  key: string,
  credential: string | null = null
): Tile {
  const url = `${origin}${path}`
  const headers = ringHeaders(credential)
  return {
    answer: () => fetch(url, { headers }),
    drawn: () => stoplightsAt(url, headers),
    ringFor: async (named) => (await stoplightsAt(url, headers)).find((one) => one[key] === named),
    askedWith: (asking) => fetch(url, { headers: ringHeaders(asking) }),
  }
}

const READOUT_TYPE = "readout"

const SLUG = "slug"

const GROUPS = "groups"

export function readoutsNaming(group: string): readonly string[] {
  const named: string[] = []
  for (const value of shadowAt(akashaRoot()).index.valuesByPath(READOUT_TYPE).values()) {
    const slug = textIn(value, SLUG)
    if (slug === null) continue
    if (slugsIn(value[GROUPS]).includes(group)) named.push(slug)
  }
  return named.sort()
}

export function relayedFor(
  readout: string,
  value: number,
  at: Date = new Date(),
  fallsPerHour = 0
): undefined {
  const path = pageAt(READOUT_TYPE, readout)
  written.set(path, {
    ...(written.get(path) ?? {}),
    ...readingValues({ value, at: at.toISOString(), fallsPerHour }),
  })
  return undefined
}

export function readingsDropped(): undefined {
  written.clear()
  return undefined
}
