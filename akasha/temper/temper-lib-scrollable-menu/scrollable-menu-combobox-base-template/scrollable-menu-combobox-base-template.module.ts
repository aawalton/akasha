import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseTemplate = {
  id: "01a06275-c446-7cbe-bc6c-f699e056c835",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-template",
  definition: "the default XML row template and highlight template for each entry type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Caller templates are mixed over the defaults per entry type rather than replacing them.",
    },
    {
      invariantKind: "departure",
      statement: "A single highlight template option overrides every entry type at once.",
    },
    {
      invariantKind: "constraint",
      statement: "The normal entry row height becomes the base entry height of the menu.",
    },
    {
      invariantKind: "departure",
      statement: "Each allowed entry type is registered with the dropdown as a custom template.",
    },
  ],
} as const satisfies Module
