import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLibraryDataEu1 = {
  id: "01a06113-b7cf-7517-a675-86cd3606cdca",
  type: "page-type/module",
  slug: "housing-library-data-eu-1",
  definition: "part 1 of the houses European players have shared with the community",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from an upstream library file rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An entry's place in this part is the place the gathered list keeps that entry in.",
    },
  ],
} as const satisfies Module
