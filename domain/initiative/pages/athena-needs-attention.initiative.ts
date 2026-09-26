import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const athenaNeedsAttention = {
  id: "01a0deec-6004-785a-9837-212dfe8617b5",
  type: "page-type/initiative",
  slug: "athena-needs-attention",
  domain: "page-type/agent",
  persona: "persona/athena",
  intentStack: [
    {
      statement: "A model test judges whether an agent's closing words ask Alan for something.",
    },
    {
      statement:
        "A report of finished work that asks Alan for nothing is not asking for Alan's attention.",
    },
    {
      statement: "The Stop hook runs that test beside `keep-alan-directives` on every stop.",
    },
    {
      statement: "A stop held open before is judged by that test as any other stop is.",
    },
    {
      statement:
        "A seat keeps whether its last turn asked for Alan's attention in an uncommitted property.",
    },
    {
      statement:
        "A seat whose last turn asked for Alan's attention reads a turn state colored red.",
    },
    {
      statement:
        "A seat is drawn in the first color that holds of green, red, blue, purple, yellow.",
    },
  ],
} as const satisfies Initiative
