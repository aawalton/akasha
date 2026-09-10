import type { Initiative } from "../initiative.page-type.types.ts"

export const scratchTwo = {
  id: "01a08c96-98fd-77c5-a942-20e4f23c2b2f",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "scratch-two",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [{ statement: "Scratch two alpha." }, { statement: "Scratch two beta." }],
} as const satisfies Initiative
