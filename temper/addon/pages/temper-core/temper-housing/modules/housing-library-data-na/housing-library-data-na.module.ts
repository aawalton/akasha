import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLibraryDataNa = {
  id: "01a06113-b7d1-7e85-b730-9398c3972952",
  type: "page-type/module",
  slug: "housing-library-data-na",
  definition: "the houses North American players have shared with the community",
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
  ],
} as const satisfies Module
