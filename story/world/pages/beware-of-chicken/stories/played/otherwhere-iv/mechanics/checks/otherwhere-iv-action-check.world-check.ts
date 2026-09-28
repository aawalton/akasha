import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIvActionCheck = {
  id: "01a0e9eb-69c8-7f7c-82e0-e80dc64f4722",
  type: "page-type/world-check",
  slug: "otherwhere-iv-action-check",
  title: "Action Check",
  world: "world/beware-of-chicken",
  definition: "whether a declared act in Otherwhere IV comes off, and how well",
  description: "How well a thing Nala tries turns out.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an act whose outcome is in doubt and matters is rolled; the rest is told.",
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
      statement:
        "Easy is what a fit mortal usually manages, and standard asks real effort or risk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hard is what an untrained mortal rarely manages, and extreme is near impossible.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master sets the band from the fiction before rolling.",
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
      statement: "A skill she has gives its level as a bonus to an act it fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting tool, help, preparation or a sound plan each earns a bonus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, cold, tiredness, haste, darkness and bare feet each cost a bonus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her new body's reach and balance cost one on bodily acts until she is used to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mortal pitting her body against a cultivator's or a spirit beast's acts at extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Against one a realm or more past the first, such an act fails with no roll.",
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
      statement: "An act short of its target by five or more fails and leaves things worse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost is a real price the game master picks: hurt, time, noise, face or goods.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The act is settled on the turn before its outcome is told.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No die, band, bonus or margin shows in the prose.",
    },
  ],
} as const satisfies WorldCheck
