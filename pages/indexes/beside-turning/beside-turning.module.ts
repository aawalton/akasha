import type { Module } from "@akasha/code/module"

export const besideTurning = {
  id: "01a079a7-c9d9-7936-a9d3-e002d3f8e708",
  pageTypeSlug: "module",
  type: "module",
  slug: "beside-turning",
  definition: "the pages a change files again though the change has none of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type is turned where the files that page type has beside its pages differ.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is turned where a page type that page type extends is turned.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration gaining or losing a default turns the page type declaring that property.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of a turned page type are read off the index rather than off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "Every page the index names is answered where a property's unique kind turns.",
    },
    {
      invariantKind: "departure",
      statement: "No page is answered for a unique kind where no unique kind turns.",
    },
    {
      invariantKind: "departure",
      statement: "A page type whose slug the change leaves naming no page type strands its pages.",
    },
    {
      invariantKind: "departure",
      statement: "A stranded page is answered so the change withdraws what that page was filed by.",
    },
    {
      invariantKind: "absence",
      statement: "A page the change has is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here files an entry.",
    },
  ],
} as const satisfies Module
