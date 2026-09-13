import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatNameClaiming = {
  id: "01a09c46-7450-76f1-bb55-13db5f6c98fd",
  type: "domain",
  slug: "seat-name-claiming",
  definition: "whether a seat may take the name it asks for",
  parts: [
    "module/agent-name-bind",
    "module/seat-name-bind",
    "module/seat-name-claim",
    "module/seat-name-held-refusal",
    "module/seat-parentless-refusal",
    "module/seat-relaunch-name-decide",
    "module/seat-spawn-name-decide",
    "module/seat-stated-name-refusal",
    "module/seat-stated-parent-refusal",
    "module/skill-token-guard",
    "module/spawn-guard",
  ],
} as const satisfies Domain
