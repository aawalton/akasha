import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPursuitThing = {
  id: "01a06153-0ea9-7002-8317-f34518274d6f",
  type: "page-type/page-type",
  slug: "temper-pursuit-thing",
  definition: "a node of a catalog the game shows a player's progress against",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-collectible-id"],
  properties: [
    { pageProperty: "number-property/eso-collectible-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property more than one pursuit page type has is declared here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
