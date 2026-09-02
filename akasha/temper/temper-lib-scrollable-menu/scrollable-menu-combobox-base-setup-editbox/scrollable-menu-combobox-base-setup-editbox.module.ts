import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseSetupEditbox = {
  id: "01a06275-c445-7836-b971-835899e6f48f",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-setup-editbox",
  definition: "the wiring and re-anchoring of the edit box inside an edit-box row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Re-anchoring is deferred to the next frame through zo_callLater.",
    },
    {
      invariantKind: "departure",
      statement: "A hidden label is collapsed to zero width rather than removed.",
    },
    {
      invariantKind: "departure",
      statement: "The right-click handler is registered once per edit box control.",
    },
    {
      invariantKind: "constraint",
      statement: "Text type and input length fall back to game-wide defaults when unset.",
    },
  ],
} as const satisfies Module
