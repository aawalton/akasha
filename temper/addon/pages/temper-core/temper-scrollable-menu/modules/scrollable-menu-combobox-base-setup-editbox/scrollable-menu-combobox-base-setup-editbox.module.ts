import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseSetupEditbox = {
  id: "01a06275-c445-7836-b971-835899e6f48f",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-setup-editbox",
  definition: "the wiring and re-anchoring of the edit box inside an edit-box row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Re-anchoring is deferred to the next frame through zo_callLater.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden label is collapsed to zero width rather than removed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The right-click handler is registered once per edit box control.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Text type and input length fall back to game-wide defaults when unset.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.261Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
