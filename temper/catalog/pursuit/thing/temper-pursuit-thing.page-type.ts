import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPursuitThing = {
  id: "01a06153-0ea9-7002-8317-f34518274d6f",
  type: "page-type/page-type",
  slug: "temper-pursuit-thing",
  definition: "a node of a catalog against which the game shows a player's progress",
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
  createdAt: "2026-09-02T08:53:48.329Z",
  updatedAt: "2026-09-22T14:14:06.000Z",
} as const satisfies PageType
