import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreLifecycleUiButtons = {
  id: "01a06231-8f1d-713c-8f02-82ee12f29b49",
  type: "page-type/module",
  slug: "sets-core-lifecycle-ui-buttons",
  definition: "the extra button added to the set collections book's filter row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The button is only built when the saved variables ask for the button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same function is published under a public key and an internal key.",
    },
  ],
} as const satisfies Module
