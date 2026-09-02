import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseSetupSlider = {
  id: "01a06275-c446-7bcc-a7cd-2864c24f89cb",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-setup-slider",
  definition: "the wiring and re-anchoring of the slider inside a slider row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value label is anchored differently depending on whether it is shown.",
    },
    {
      invariantKind: "departure",
      statement: "The hover tooltip reports the current value with the slider bounds and the step.",
    },
    {
      invariantKind: "departure",
      statement: "An existing mouse-up handler is post-hooked rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "Re-anchoring is deferred to the next frame through zo_callLater.",
    },
  ],
} as const satisfies Module
