import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonCategorizeChecks = {
  id: "01a0d58b-cb58-751a-8626-2fef3af37476",
  type: "page-type/ios-component",
  slug: "alanwalton-categorize-checks",
  definition: "what holds Alan's categorize tile to the bodies the unreviewed readout sends",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bodies decoded are the ones the unreviewed readout's route sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A harness is handed the name and whether the check held and the reading the check saw.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "The categorize tile has no no-signal light, since a readout with no reading is answered 503.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This component is compiled by Alan's decode harness rather than by the app.",
    },
  ],
} as const satisfies IosComponent
