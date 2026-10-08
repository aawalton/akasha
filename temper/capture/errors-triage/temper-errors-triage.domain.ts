import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperErrorsTriage = {
  id: "01a060cd-564e-7685-8e5f-1bf87cbf4467",
  type: "page-type/domain",
  slug: "temper-errors-triage",
  definition: "how an error the game reported is judged",
  parts: [
    "module/errors-collect",
    "module/errors-crash-signatures",
    "module/errors-liveness",
    "module/errors-saved-variables",
    "module/errors-triage",
    "module/errors-triage-gather",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An error is judged from the variables the addon saved rather than from the live game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement has the reason the judgement was reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  createdAt: "2026-09-02T06:27:44.846Z",
  updatedAt: "2026-09-21T15:14:12.000Z",
} as const satisfies Domain
