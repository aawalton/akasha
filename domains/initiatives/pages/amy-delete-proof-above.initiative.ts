import type { Initiative } from "../initiative.page-type.types.ts"

export const amyDeleteProofAbove = {
  id: "01a08c58-a73a-795d-b321-10f8250bc16d",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-delete-proof-above",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "The Work Panel's Delete proves itself on a page nothing else needs.",
    },
  ],
} as const satisfies Initiative
