import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMode = {
  id: "01a07c24-30e1-7802-88da-aa05d0b289dd",
  type: "page-type/page-type",
  slug: "change-mode",
  definition: "the act a change makes",
  parts: [
    "change-mode/change-mode-add",
    "change-mode/change-mode-add-if-not-present",
    "change-mode/change-mode-append",
    "change-mode/change-mode-change",
    "change-mode/change-mode-divide",
    "change-mode/change-mode-move",
    "change-mode/change-mode-remove",
    "change-mode/change-mode-rename",
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change states the mode from the verb its slug opens with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which sort a change is and which act a change makes are two answers.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
