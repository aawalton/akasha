import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiLearning = {
  id: "01a0ea3e-acd0-79dd-979b-6435ce3d4ab8",
  type: "page-type/world-check",
  slug: "otherwhere-viii-learning",
  title: "Learning the Art",
  world: "world/breaker-of-horizons",
  definition: "how much of a glyph set a character in Otherwhere VIII learns in one turn",
  description: "How far Nala has come in the Art.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Learning is settled once a turn for each glyph set she studied, was taught or used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Glyph fluency runs from nought to a hundred, kept on her glyph-fluency page per set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sets are basic, signifier, advanced and special.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala arrived with nought in every set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of study adds a half, or one for a fast reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of being taught adds one and a half, and an hour of practice a half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Learning slows by half past fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Signifier gains are halved, advanced gains a third, and special gains a sixth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No set beyond basic is learned until her basic fluency reaches fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below ten she knows no glyph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At ten she knows the activation glyph and the universal control glyphs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At thirty she knows the common sequences: Minor Query, light orb, Minor Control Sphere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At sixty she reads most everyday sequences, and at ninety she has perfect recall.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Control is an attribute apart, kept on her control page from nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Control gains one for each turn she works the Art in earnest and the act comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Control gains two instead when the act comes off strongly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Control adds one on acts of the Art at 3, two at 8, three at 15 and four at 25.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new work she can do is learned from a teacher, a text or a discovery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder files a new work as a world-skill page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work's arcana cost is its `manaCost`, and its duration its `durationMinutes`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beside the work the world builder files an art page naming her and it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No fluency, control or gain shows as a number, in the prose or on the play screen.",
    },
  ],
} as const satisfies WorldCheck
