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
      statement: "The wide case is drawn to read five hours eighteen minutes left.",
    },
    {
      invariantKind: "departure",
      statement: "That wait is the widest a caption draws.",
    },
    {
      invariantKind: "constraint",
      statement: "A caption shrunk or truncated in the wide case is the defect that case is for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A surplus already under a rung is drawn in red re-aimed at the rung under that rung.",
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
      statement: "A surplus not falling still colors the cost.",
    },
    {
      invariantKind: "departure",
      statement: "That ring is red rather than yellow.",
    },
    {
      invariantKind: "departure",
      statement: "A cost carrying no surplus keeps the color the server drew it.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus is stated by the wait wanted.",
    },
    {
      invariantKind: "departure",
      statement: "The figure is worked back from that wait.",
    },
    {
      invariantKind: "departure",
      statement: "Each wait counted down is also drawn in every timer form of the caption.",
    },
    {
      invariantKind: "departure",
      statement: "A case naming a widget the bundle does not ship is asked for by no coverage.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here judges an image.",
    },
    {
      invariantKind: "gap",
      statement: "A person reads the drawing.",
    },
    {
      invariantKind: "gap",
      statement: "No image was drawn where these cases were written.",
    },
    {
      invariantKind: "gap",
      statement: "That machine has no simulator.",
    },
  ],
} as const satisfies IosHarness
