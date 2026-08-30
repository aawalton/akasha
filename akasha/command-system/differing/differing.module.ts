import type { Module } from "../../code-system/module/module.page-type.ts"

export const differing = {
  id: "01a04ebb-d762-7000-92c3-765835d1b7a3",
  pageTypeSlug: "module",
  slug: "differing",
  definition: "the body an object id names, and what moved between it and the body that stands now",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is found again by the object id git holds it under, and by nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "An object id git does not hold is no body, and nothing is put in its place.",
    },
    {
      invariantKind: "departure",
      statement: "A difference is git's own, and carries one line either side of what moved.",
    },
    {
      invariantKind: "departure",
      statement: "Both bodies a difference is taken between are written out first.",
    },
    {
      invariantKind: "departure",
      statement: "Whatever goes wrong is no difference, never a difference that might be wrong.",
    },
    {
      invariantKind: "departure",
      statement: "The files a difference was taken over are gone before it is answered.",
    },
  ],
} as const satisfies Module
