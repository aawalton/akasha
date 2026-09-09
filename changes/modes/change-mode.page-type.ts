import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"

export type ChangeMode = Domain

export const changeMode = {
  id: "01a07c24-30e1-7802-88da-aa05d0b289dd",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "change-mode",
  definition: "the act one change makes",
  pluralSlug: "change-modes",
  parts: [
    "change-mode/change-mode-add",
    "change-mode/change-mode-change",
    "change-mode/change-mode-move",
    "change-mode/change-mode-remove",
    "change-mode/change-mode-rename",
    "change-mode/change-mode-add-if-not-present",
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
} as const satisfies PageType
