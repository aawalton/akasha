import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLibraryDataEu3 = {
  id: "01a06113-b7cf-7f28-ab07-d5dea7a7a9e8",
  type: "page-type/module",
  slug: "housing-library-data-eu-3",
  definition: "part 3 of the houses European players have shared with the community",
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
    {
      decisionKind: "decision-kind/gap",
      statement: "An entry moved to another place moves the entry every library row shows.",
    },
  ],
} as const satisfies Module
