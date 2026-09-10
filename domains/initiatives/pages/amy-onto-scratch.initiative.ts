import type { Initiative } from "../initiative.page-type.types.ts"

export const amyOntoScratch = {
  id: "01a08c8e-f414-7233-908c-7b37c079f98a",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-onto-scratch",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Scratch B.",
    },
    {
      statement: "Scratch C.",
    },
    {
      statement: "Scratch A.",
    },
    {
      statement: "Scratch D.",
    },
  ],
} as const satisfies Initiative
