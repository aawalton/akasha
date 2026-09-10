import type { Initiative } from "../initiative.page-type.types.ts"

export const scratchEmpty = {
  id: "01a08c96-98fd-74e4-a6f4-45ed4096f03e",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "scratch-empty",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [],
} as const satisfies Initiative
