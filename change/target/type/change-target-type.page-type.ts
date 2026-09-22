import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeTargetType = {
  id: "01a07c73-47c8-7571-af7f-96259b306e66",
  type: "page-type/page-type",
  slug: "change-target-type",
  definition: "the sort of thing on which a change acts",
  parts: [
    "change-target-type/file",
    "change-target-type/file-content",
    "change-target-type/folder",
    "change-target-type/page-property",
    "change-target-type/page-type",
    "change-target-type/prose",
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change states the target type from the thing that change acts on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which act a change makes and which thing a change acts on are two answers.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
