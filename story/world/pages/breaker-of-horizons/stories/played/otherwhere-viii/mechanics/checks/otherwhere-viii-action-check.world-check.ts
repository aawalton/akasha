import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiActionCheck = {
  id: "01a0ea38-49e6-7de7-95e5-1a8b84fca941",
  type: "page-type/world-check",
  slug: "otherwhere-viii-action-check",
  title: "Action Check",
  world: "world/breaker-of-horizons",
  definition: "whether a declared act in Otherwhere VIII comes off, and how well",
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
      statement: "A fitting tool, a plan using a weakness, help or preparation adds one to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's unfamiliar body costs two on bodily acts her first week and one the second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bare feet on paving or rough ground cost one on acts of footing and speed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Hunger, thirst, cold, want of sleep, harm and overdraw cost what their checks say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act of the Art is her act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting work she knows adds her control bonus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph she only half knows costs one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "She cannot picture a glyph in her mind, so holding a glyph sequence there costs two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph traced by hand or scribed on paper costs her nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Working an artefact needs its activation glyph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Without that glyph she cannot work the artefact at all, and no roll is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Talking past an official who asks for papers she lacks is hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lying to an official about papers she lacks is extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Passing as a local in manners and small customs is standard in her first days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contest with a trained arcanist is one band harder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contest with a thaumaturgist is two bands harder.",
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
        "Settled by `akasha story settle --story otherwhere-viii --check otherwhere-viii-action-check`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settling rolls one d20.",
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
