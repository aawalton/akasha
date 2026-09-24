import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const attackResolution = {
  id: "01a0c47f-725d-7d9c-9fd8-45724688d64d",
  type: "page-type/game-mechanic",
  slug: "attack-resolution",
  definition: "whether a strike lands, which band it lands in, and the damage it deals",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike's margin is the attacker's power and roll less the defender's defence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every bonus counted into a strike names what the bonus came from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fumble misses whatever the margin is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A critical strike counts a margin of at least six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike short of the defence by less than three grazes for a quarter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike that lands deals at least one damage.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the striker intends counts into the score, held between none and ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent saying no more than what is attempted counts two or less.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent that is specific and could work counts three to five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent using something true of the scene counts six to eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An intent using something true of the defender the striker read counts nine or ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent the striker's own sheet cannot support counts low whatever it says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gate is what engaging the defender's weakness is worth, set by the defender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A strike that engages the weakness not at all gates between a quarter and two fifths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike engaging nothing either way gates at one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike on a read weakness gates between one and a half and two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike placed on the one point the defender rests on gates at three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The gate and what the striker intends are counted at different points and compound.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No affinity carries a gate of its own, so no affinity stands in for a read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The damage a strike deals is its base, gated, grown by the margin over twelve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gate is handed in with the strike rather than fixed at one.",
    },
  ],
} as const satisfies GameMechanic
