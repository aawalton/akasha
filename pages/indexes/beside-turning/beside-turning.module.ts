import type { Module } from "@akasha/code/module"

export const besideTurning = {
  id: "01a079a7-c9d9-7936-a9d3-e002d3f8e708",
  pageTypeSlug: "module",
  slug: "beside-turning",
  definition: "the pages a change leaves claiming different files beside them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type is turned where the files that page type holds beside its pages differ.",
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
      invariantKind: "absence",
      statement: "A page the change carries is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here files an entry.",
    },
  ],
} as const satisfies Module
