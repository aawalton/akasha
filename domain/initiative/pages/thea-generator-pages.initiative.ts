import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const theaGeneratorPages = {
  id: "01a0d4cb-31a7-7467-9609-a3ad699afcb9",
  type: "page-type/initiative",
  slug: "thea-generator-pages",
  domain: "domain/check",
  persona: "persona/thea",
  intentStack: [
    {
      statement:
        "Each generator adding to a change before it lands is a change generator page, its code beside it.",
    },
    {
      statement: "A change generator names the change generators it runs after.",
    },
    {
      statement:
        "Every type generator is a change generator, and no page type states a type generator.",
    },
    {
      statement: "A page's id is minted by a change generator rather than when the draft is made.",
    },
    {
      statement: "The change code runs the change generators the index names and imports none.",
    },
  ],
} as const satisfies Initiative
