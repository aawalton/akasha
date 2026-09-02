import type { Module } from "@akasha/code-system/module"

export const libSetsCoreLifecycleUiButtons = {
  id: "01a06231-8f1d-713c-8f02-82ee12f29b49",
  pageTypeSlug: "module",
  slug: "lib-sets-core-lifecycle-ui-buttons",
  definition: "the extra button added to the set collections book's filter row",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The button is only built when the saved variables ask for the button.",
    },
    {
      invariantKind: "departure",
      statement: "The same function is published under a public key and an internal one.",
    },
  ],
} as const satisfies Module
