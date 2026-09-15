import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMechanicalPageType = {
  id: "01a09205-7229-7608-86d7-25634926ac24",
  type: "page-type/page-type",
  slug: "change-mechanical-page-type",
  definition: "a mechanical change acting on a page type and on every page filed under it",
  extends: ["page-type/change-mechanical"],
  parts: [
    "change-mechanical-page-type/rename-page-type",
    "domain/change-mechanical-page-type-add",
    "domain/change-mechanical-page-type-change",
    "domain/change-mechanical-page-type-move",
    "domain/change-mechanical-page-type-remove",
  ],
  properties: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here answers the whole scope of one act in one call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here reads the pages of the page type from the index once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here takes the shortcuts knowing the whole act allows.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung here reaches a rung beneath once for each page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
