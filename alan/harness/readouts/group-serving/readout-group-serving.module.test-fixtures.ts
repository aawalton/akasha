import { expect } from "bun:test"
import { join } from "node:path"
import { RING_CREDENTIAL_HEADER } from "akasha/alan/harness/readouts/credential/readout-credential.module.code.ts"
import {
  answerStoplightsAdmittedBy,
  type Stoplight,
  stoplightsInGroup,
} from "akasha/alan/harness/readouts/group-serving/readout-group-serving.module.code.ts"
import { relayedFor } from "akasha/alan/harness/readouts/relay/readout-relay.module.test-fixtures.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { Glob } from "bun"

export const GROUP = "a-group-named-only-in-this-test"

export const READOUT = "a-readout-named-only-in-this-test"

export const OTHER = "another-readout-named-only-in-this-test"

const SCALE = "a-scale-named-only-in-this-test"

export const READOUT_ROW = {
  slug: READOUT,
  label: "Safety",
  unit: "levels",
  place: 1,
  scale: SCALE,
  wireKey: "safety",
  groups: [GROUP],
}

export const OTHER_ROW = {
  slug: OTHER,
  label: "Surplus",
  place: 2,
  scale: SCALE,
  wireKey: "surplus",
  groups: [GROUP],
}

export const SCALE_ROW = { slug: SCALE, redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 }

export const GROUP_ROW = { slug: GROUP }

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

export type Rows = readonly Record<string, unknown>[]

export type AskedOf = {
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

export type Answering = (asked: AskedOf) => Rows

export function answeredRows(asked: AskedOf): Rows {
  if (asked.pageTypeSlug === "readout") return ANSWERED.readouts
  if (asked.pageTypeSlug === "readout-group") return ANSWERED.groups
  if (asked.pageTypeSlug === "readout-scale") return ANSWERED.scales
  return []
}

export function servingStore(answering: Answering = answeredRows): ReturnType<typeof Bun.serve> {
  const store = Bun.serve({
    port: 0,
    fetch: async (request) => Response.json({ rows: answering((await request.json()) as AskedOf) }),
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

export function figureOffScaleOn(one: Stoplight | undefined): unknown {
  return (one as Record<string, unknown> | undefined)?.figureOffScale
}

export const WIRE_KEY_NAME = "a-key-named-only-in-this-test"

export const agedOut = (): Date => new Date(Date.now() - 46 * 60_000)

export function drawn(wireKeyName?: string): Promise<Response> {
  return answerStoplightsAdmittedBy(new Request("http://a.test/"), () => null, GROUP, wireKeyName)
}

export async function stoplights(): Promise<readonly Stoplight[]> {
  const answered = await drawn()
  expect(answered.status).toBe(200)
  return ((await answered.json()) as { stoplights: readonly Stoplight[] }).stoplights
}

export async function keysAnswered(wireKeyName?: string): Promise<readonly string[]> {
  const answered = await drawn(wireKeyName)
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Record<string, unknown>[] }
  return Object.keys(body.stoplights[0] ?? {})
}

export async function keysDrawn(): Promise<readonly (string | undefined)[]> {
  return (await stoplights()).map((one) => one.habit)
}

export async function oneDrawn(
  value: number,
  at: Date = new Date(),
  fallsPerHour?: number
): Promise<Stoplight | undefined> {
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

export type Drawn = Record<string, unknown>

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

export async function readoutsNaming(root: string, group: string): Promise<readonly string[]> {
  const named: string[] = []
  for await (const relative of new Glob("**/*.readout.ts").scan({ cwd: root })) {
    if (relative.includes("node_modules")) continue
    const loaded = (await import(join(root, relative))) as Record<
      string,
      { slug?: string; groups?: readonly string[] } | undefined
    >
    for (const one of Object.values(loaded)) {
      if (one?.slug === undefined) continue
      if (one.groups?.includes(group) === true) named.push(one.slug)
    }
  }
  return named.sort()
}
