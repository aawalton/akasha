import type { IosHarness } from "../../ios-harness.page-type.types.ts"

export const renderHarnessCasesCost = {
  id: "01a08c83-ffd7-7522-a7f2-606479a6ddb9",
  pageTypeSlug: "ios-harness",
  type: "ios-harness",
  slug: "render-harness-cases-cost",
  definition: "every case a render run draws of the cost tile",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every moment a case states is worked off the run's clock rather than frozen.",
    },
    {
      invariantKind: "departure",
      statement: "A case is named for the reading its picture is meant to show.",
    },
    {
      invariantKind: "departure",
      statement: "The near case is drawn to read forty-six minutes left under a yellow ring.",
    },
    {
      invariantKind: "departure",
      statement: "The wide case is drawn to read five hours eighteen minutes left, the widest.",
    },
    {
      invariantKind: "constraint",
      statement: "A caption shrunk or truncated in the wide case is the defect that case is for.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus already under a rung is drawn re-aimed at the rung under that, in red.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of nothing is drawn green and captioned with the readout's label.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus that is not falling leaves the label and no countdown at all.",
    },
    {
      invariantKind: "departure",
      statement: "A cost carrying no surplus keeps the color the server drew it.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus is stated by the wait wanted, the figure being worked back from it.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here judges an image, and a person reads what was drawn.",
    },
    {
      invariantKind: "gap",
      statement: "No image was drawn where these were written, that machine having no simulator.",
    },
  ],
} as const satisfies IosHarness
