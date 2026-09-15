import type { IosHarness } from "akasha/code/ios-harness/ios-harness.page-type.types.ts"

export const renderHarnessCasesCost = {
  id: "01a08c83-ffd7-7522-a7f2-606479a6ddb9",
  type: "ios-harness",
  slug: "render-harness-cases-cost",
  definition: "every case a render run draws of the cost tile",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every moment a case states is worked off the run's clock rather than frozen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A case is named for the reading its picture is meant to show.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The near case is drawn to read forty-six minutes left under a yellow ring.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The wide case is drawn to read five hours eighteen minutes left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That wait is the widest a caption draws.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caption shrunk or truncated in the wide case is the defect that case is for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A surplus already under a rung is drawn in red re-aimed at the rung under that rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost of nothing is drawn green and captioned with the readout's label.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus that is not falling leaves the label and no countdown at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus not falling still colors the cost.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That ring is red rather than yellow.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost carrying no surplus keeps the color the server drew it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus is stated by the wait wanted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The figure is worked back from that wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each wait counted down is also drawn in every timer form of the caption.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A case naming a widget the bundle does not ship is asked for by no coverage.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here judges an image.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A person reads the drawing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No image was drawn where these cases were written.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "That machine has no simulator.",
    },
  ],
} as const satisfies IosHarness
