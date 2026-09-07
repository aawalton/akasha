import { join } from "node:path"
import { Glob } from "bun"
import type { Stoplight } from "./readout-group-serving.module.code.ts"

export const GROUP = "a-group-named-only-in-this-test"

export const READOUT = "a-readout-named-only-in-this-test"

export const OTHER = "another-readout-named-only-in-this-test"

const SCALE = "a-scale-named-only-in-this-test"

export const READOUT_ROW = {
  slug: READOUT,
  label: "Safety",
  unit: "levels",
  place: 1,
  scaleSlug: SCALE,
  wireKey: "safety",
  groupSlugs: [GROUP],
}

export const OTHER_ROW = {
  slug: OTHER,
  label: "Surplus",
  place: 2,
  scaleSlug: SCALE,
  wireKey: "surplus",
  groupSlugs: [GROUP],
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

let heldOrigin: string | undefined

export function servingStore(): ReturnType<typeof Bun.serve> {
  const store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as { pageTypeSlug: string }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.readouts })
      if (asked.pageTypeSlug === "readout-group") return Response.json({ rows: ANSWERED.groups })
      if (asked.pageTypeSlug === "readout-scale") return Response.json({ rows: ANSWERED.scales })
      return Response.json({ rows: [] })
    },
  })
  heldOrigin = process.env.PAGES_SERVICE_ORIGIN
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

export type Drawn = Record<string, unknown>

export type Tile = {
  readonly answer: () => Promise<Response>
  readonly drawn: () => Promise<readonly Drawn[]>
  readonly ringFor: (named: string) => Promise<Drawn | undefined>
}

export function colorIn(one: Drawn, key: string): string {
  const held = one[key]
  if (typeof held !== "string") {
    throw new Error(`a stoplight carries no text under \`${key}\`: ${JSON.stringify(held)}`)
  }
  return held
}

async function stoplightsAt(url: string): Promise<readonly Drawn[]> {
  const answered = await fetch(url)
  if (answered.status !== 200) {
    throw new Error(`the tile at ${url} answered ${answered.status} rather than 200`)
  }
  const body = (await answered.json()) as { stoplights: readonly Drawn[] }
  return body.stoplights
}

export function tileAt(origin: string, path: string, key: string): Tile {
  const url = `${origin}${path}`
  return {
    answer: () => fetch(url),
    drawn: () => stoplightsAt(url),
    ringFor: async (named) => (await stoplightsAt(url)).find((one) => one[key] === named),
  }
}

export async function readoutsNaming(root: string, group: string): Promise<readonly string[]> {
  const named: string[] = []
  for await (const relative of new Glob("**/*.readout.ts").scan({ cwd: root })) {
    if (relative.includes("node_modules")) continue
    const loaded = (await import(join(root, relative))) as Record<
      string,
      { slug?: string; groupSlugs?: readonly string[] } | undefined
    >
    for (const one of Object.values(loaded)) {
      if (one?.slug === undefined) continue
      if (one.groupSlugs?.includes(group) === true) named.push(one.slug)
    }
  }
  return named.sort()
}
