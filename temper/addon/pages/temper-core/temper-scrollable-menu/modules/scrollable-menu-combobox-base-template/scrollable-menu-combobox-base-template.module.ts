import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseTemplate = {
  id: "01a06275-c446-7cbe-bc6c-f699e056c835",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-template",
  definition: "the row templates a combo box registers with its dropdown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Caller templates are mixed over the defaults per entry type rather than replacing those defaults.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A single highlight template option overrides every entry type at once.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The normal entry row height becomes the base entry height of the menu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each allowed entry type is registered with the dropdown as a custom template.",
    },
  ],
} as const satisfies Module
