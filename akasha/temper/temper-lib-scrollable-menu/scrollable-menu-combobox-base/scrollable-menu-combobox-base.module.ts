import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBase = {
  id: "01a06275-c444-7462-9a01-bb0daeb9b5d0",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base",
  definition: "the ZO_ComboBox subclass every library menu derives from and its narration plumbing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Screen narration is gated behind two separate accessibility settings.",
    },
    {
      invariantKind: "departure",
      statement: "The submenu class is created here as a subclass of the base.",
    },
    {
      invariantKind: "departure",
      statement:
        "Narration text is queued through a named update handler rather than sent at once.",
    },
    {
      invariantKind: "departure",
      statement: "Every new instance appends itself to the library's list of live objects.",
    },
  ],
} as const satisfies Module
