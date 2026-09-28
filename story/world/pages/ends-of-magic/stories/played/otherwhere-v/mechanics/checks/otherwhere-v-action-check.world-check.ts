import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereVActionCheck = {
  id: "01a0e9f3-a87d-73ab-82ab-1f72b581e333",
  type: "page-type/world-check",
  slug: "otherwhere-v-action-check",
  title: "Action Check",
  world: "world/ends-of-magic",
  definition: "whether a declared act in Otherwhere V comes off, and how well",
  description: "Whether something Nala tries comes off.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every act whose outcome is in doubt and matters is settled here, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that is sure, trivial or harmless to fail is told with no roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The band is picked from the fiction before the roll, never after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act clearing its target by five or more comes off strongly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by four or less comes off at a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by five or more fails, and the situation worsens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cost is a real price: hurt, lost time, noise, a lost thing or a worse position.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Talent or skill that fits adds one below rank 10, two to 19, three to 39, four past.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting tool, a plan using a weakness, help or preparation adds one to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's unfamiliar body costs two on bodily acts her first week and one the second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bare feet on rough ground cost one on acts of footing and speed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, thirst, cold and want of sleep cost what the needs and harm say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contest with a stronger foe is one band harder for each tenfold its level has over hers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Asking with no shared tongue is extreme; with a few shared words hard; getting by standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gesture alone carries only the concrete: food, water, danger, a direction, a no.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Throwing off a spell is her act: standard against low tier, hard moderate, extreme high.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her Earth-born body adds two to throwing off a spell while its quirk lasts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell she casts is her act, and her Earth-born body costs four on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe's attack is settled as her act to dodge or block it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands is then settled by the harm check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Settled by `akasha story settle --story otherwhere-v --check otherwhere-v-action-check`, one d20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcome is told as the roll answered it, never softened to save the scene.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No die, band, bonus or margin appears in the prose.",
    },
  ],
} as const satisfies WorldCheck
