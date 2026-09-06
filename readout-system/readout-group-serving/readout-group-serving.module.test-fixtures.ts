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

// EACH PAGE TYPE THE MODULE ASKS FOR IS ANSWERED BY A BRANCH OF ITS OWN, AND ANYTHING ELSE BY NONE.
//
// A store answering whatever the last branch holds is a store that passes a test for the wrong
// reason: before groups were answered here, a group asked for came back as a scale, and a scale
// carries no answer about a figure off scale, so the false case would have passed without the
// reading ever having been built.
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

// THE ORIGIN THIS STORE SET IS THE WHOLE PROCESS'S, AND COMES BACK WHEN THE STORE GOES.
//
// Every test file in one run shares one process, so a file leaving this origin in place leaves
// every later file asking this store rather than the store the run was pointed at. Stopping the
// store does not cover that on its own: `stop` leaves an open connection open, and `fetch` holds
// one open, so a stopped store goes on answering the file that runs next. These rows reached
// `readout-unread` that way and made Alan's status bar read as drawing lights carrying no reading.
export function storeGoes(store: ReturnType<typeof Bun.serve>): undefined {
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
  return undefined
}

export function figureOffScaleOn(one: Stoplight | undefined): unknown {
  return (one as Record<string, unknown> | undefined)?.figureOffScale
}
