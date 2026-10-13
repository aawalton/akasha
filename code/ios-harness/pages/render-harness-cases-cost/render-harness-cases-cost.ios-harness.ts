import type { IosHarness } from "akasha/code/ios-harness/ios-harness.page-type.types.ts"

export const renderHarnessCasesCost = {
  id: "01a08c83-ffd7-7522-a7f2-606479a6ddb9",
  type: "page-type/ios-harness",
  slug: "render-harness-cases-cost",
  definition: "every case a render run draws of the cost tile",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every moment a case states is worked off the run's clock rather than frozen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is named for the reading its picture is meant to show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A surplus falling is drawn under a yellow ring captioned with the readout's label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost of nothing is drawn green and captioned with the readout's label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surplus not falling still colors the cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That ring is red rather than yellow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost carrying no surplus keeps the color the server drew it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surplus is stated by the wait wanted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The figure is worked back from that wait.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No case draws the tile in a form the tile does not hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here judges an image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person reads the drawing.",
    },
  ],
  createdAt: "2026-09-10T18:10:56.087Z",
  updatedAt: "2026-10-13T14:51:37.767Z",
} as const satisfies IosHarness
