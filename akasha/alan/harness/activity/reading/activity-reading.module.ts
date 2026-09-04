import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const activityReading = {
  id: "01a069bc-1a49-76f5-89d4-4edb7d44a3d1",
  pageTypeSlug: "module",
  slug: "activity-reading",
  definition: "the calories Alan burned, taken from his day and kept on the activity readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The calories are kept beside the readout the calories were taken for.",
    },
    {
      invariantKind: "departure",
      statement: "The day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A day moved into akasha is read from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "What to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The activity of a day is the cardio half added to the lifting half.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying neither the cardio half nor the lifting half takes no reading.",
    },
    {
      invariantKind: "departure",
      statement: "The two halves are added in akasha rather than by the markdown deriver.",
    },
    {
      invariantKind: "gap",
      statement: "The markdown deriver answers zero for a day recording neither half.",
    },
    {
      invariantKind: "departure",
      statement: "The cardio half is rolled onto the day by the health-sample rollup.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose health samples never arrived carries no cardio half.",
    },
    {
      invariantKind: "departure",
      statement: "A day that could not be read is a refusal rather than an absent reading.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "departure",
      statement: "The root read is the one the environment states or the one the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "The readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The cardio half is never read from health samples here.",
    },
    {
      invariantKind: "absence",
      statement: "The calories themselves are never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
