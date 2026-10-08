import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseSetupSlider = {
  id: "01a06275-c446-7bcc-a7cd-2864c24f89cb",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-setup-slider",
  definition: "the wiring and re-anchoring of the slider inside a slider row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The value label is anchored differently depending on whether that label is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hover tooltip reports the current value with the slider bounds and the step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An existing mouse-up handler is post-hooked rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Re-anchoring is deferred to the next frame through zo_callLater.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.262Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
