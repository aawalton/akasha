import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLibraryDataEu = {
  id: "01a06113-b7ce-77ca-bda6-f521aa196130",
  type: "page-type/module",
  slug: "housing-library-data-eu",
  definition: "the European community library, taken from its six parts in turn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from an upstream library file rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An entry's place in this list is the place the library tab shows that entry in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An entry moved to another place moves the entry every library row shows.",
    },
  ],
} as const satisfies Module
