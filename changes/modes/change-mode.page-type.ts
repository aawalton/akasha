import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const changeMode = {
  id: "01a07c24-30e1-7802-88da-aa05d0b289dd",
  type: "page-type",
  slug: "change-mode",
  definition: "the act one change makes",
  pluralSlug: "change-modes",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change states the mode from the verb its slug opens with.",
    },
    {
      invariantKind: "departure",
      statement: "Which sort a change is and which act a change makes are two answers.",
    },
  ],
  types: "ts",
} as const satisfies PageType
