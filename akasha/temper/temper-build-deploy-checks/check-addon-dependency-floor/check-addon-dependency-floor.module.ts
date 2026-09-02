import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonDependencyFloor = {
  id: "01a06297-7f6a-744e-919c-2ff3483ee37b",
  pageTypeSlug: "module",
  slug: "check-addon-dependency-floor",
  definition: "the run judging whether every checkable game add-on version floor is met",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population this run states is the add-ons on the roster.",
    },
    {
      invariantKind: "constraint",
      statement: "An add-on examined is an add-on whose manifest was read.",
    },
    {
      invariantKind: "constraint",
      statement: "What the run declined to judge is reported beside what the run judged.",
    },
  ],
} as const satisfies Module
