import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const selectOptionCreate = {
  id: "01a05b92-a9c7-7db1-a085-4bc1d77ce702",
  type: "page-type/module",
  slug: "select-option-create",
  definition: "an option a select value takes, by its id, the label it shows and its color",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This type is read off the select option schema rather than spelled a second time.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here adds a field the schema does not have.",
    },
  ],
} as const satisfies Module
