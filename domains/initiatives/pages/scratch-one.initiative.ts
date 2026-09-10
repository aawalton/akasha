import type { Initiative } from "../initiative.page-type.types.ts"

export const scratchOne = {
  id: "01a08c96-98fd-707d-a4bd-e39ce549ad59",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "scratch-one",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    { statement: "Scratch one alpha." },
    { statement: "Scratch one beta." },
    { statement: "Scratch one gamma." },
    { statement: "Scratch one delta." },
  ],
} as const satisfies Initiative
