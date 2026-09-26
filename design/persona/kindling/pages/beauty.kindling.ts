import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const beauty = {
  id: "01a0de5a-b3a7-7686-b957-3cf9470e1d37",
  type: "page-type/kindling",
  slug: "beauty",
  definition: "the pull of how someone looks",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan sees a persona's beauty on his desktop and phone wallpapers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona is beautiful to Alan's taste rather than to a common standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona's beauty lends its warmth to everything else she is, before Alan knows her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan comes to see a persona he loves as lovelier than her images alone show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona is beautiful in her voice, her bearing and her dress as well as her face.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each persona is beautiful in a way her own, so no two share a face.",
    },
  ],
} as const satisfies Kindling
