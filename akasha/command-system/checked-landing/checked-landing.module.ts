import type { Module } from "@akasha/code-system/module"

export const checkedLanding = {
  id: "01a068a9-315a-7984-852b-e8664f66deb2",
  pageTypeSlug: "module",
  slug: "checked-landing",
  definition: "a landing a program asks for and the checks judge",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing here carries the `change-checked` kind.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here is judged by every check the change is input to.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here owes no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here takes the arguments a mechanical landing takes.",
    },
    {
      invariantKind: "constraint",
      statement: "Only a path under akasha reaches a check.",
    },
    {
      invariantKind: "constraint",
      statement: "A reader reaching a body by a name built at runtime is reached by no check.",
    },
    {
      invariantKind: "absence",
      statement: "A commit made here carries no `Checks-bypassed` line.",
    },
  ],
} as const satisfies Module
