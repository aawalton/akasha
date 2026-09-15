import type { DecisionKind } from "akasha/domain/decision-kind/decision-kind.page-type.types.ts"

export const absence = {
  id: "01a04e11-9f98-749e-86ea-46237bfead5e",
  type: "page-type/decision-kind",
  slug: "absence",
  definition: "something the domain deliberately leaves out",
  decisionGroup: "decision-group/design",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Knowing an absence stops a reader adding the thing left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An absence belongs where the thing left out sits near the thing kept and is reached in error.",
    },
  ],
} as const satisfies DecisionKind
