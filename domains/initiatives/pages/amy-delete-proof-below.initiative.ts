import type { Initiative } from "../initiative.page-type.types.ts"

export const amyDeleteProofBelow = {
  id: "01a08c58-bc31-7358-81b8-b27deb9b86f3",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-delete-proof-below",
  domain: "domain/alan-harness",
  persona: "amy",
  parent: "initiative/amy-delete-proof-above",
  intents: [
    {
      statement: "The Work Panel's Delete says which page still names the one it took away.",
    },
  ],
} as const satisfies Initiative
