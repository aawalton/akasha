import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const affinityAdvance = {
  id: "01a0c4ff-1ec4-7a67-a152-8087ed5bb361",
  type: "page-type/game-mechanic",
  slug: "affinity-advance",
  definition: "what an element event does to the count an affinity holds in its tier",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A matched element event deposits one event, and absorbing a seed of it deposits two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At most three events are deposited in one encounter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element swung at for credit rather than used deposits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A count rises by one when the pool holds what that count costs, and that cost is spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A count through ten costs one event, through twenty-five two, through forty three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every count above forty costs four events, and none costs more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each further count within a tier costs more events, so the climb visibly slows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tier is promoted when its count reaches the tier's cap, and the count opens at one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance answers the counts climbed, so a promotion's reset is never a loss.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity at the top of the soul tier climbs no further.",
    },
  ],
} as const satisfies GameMechanic
