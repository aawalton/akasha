import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatStartGuard = {
  id: "01a09c46-7450-76f1-bb55-13db5f6c98fd",
  type: "page-type/domain",
  slug: "seat-start-guard",
  definition: "whether a seat may take the name it states",
  parts: [
    "module/agent-name-bind",
    "module/seat-name-bind",
    "module/seat-name-claim",
    "module/seat-name-held-refusal",
    "module/seat-parentless-refusal",
    "module/seat-spawn-name-decide",
    "module/seat-stated-name-refusal",
    "module/seat-stated-parent-refusal",
    "module/skill-token-guard",
    "module/spawn-guard",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name already on the seat's row is the name that seat comes back under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A revive is refused where the seat's row names that seat nothing.",
    },
  ],
} as const satisfies Domain
