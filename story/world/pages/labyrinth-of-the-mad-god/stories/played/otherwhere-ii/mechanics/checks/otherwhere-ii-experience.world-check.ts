import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIiExperience = {
  id: "01a0e99f-283d-725a-9fa5-2fddec431c0f",
  type: "page-type/world-check",
  slug: "otherwhere-ii-experience",
  title: "Experience",
  world: "world/labyrinth-of-the-mad-god",
  definition:
    "how much a character in Otherwhere grows from what a turn earned, and the level it reaches",
  description:
    "Growth earned by killing, questing and surviving trials, counted toward the next level.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Experience is settled once a turn for each character who earned any, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level takes ten times the level after it in experience.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast killed is worth three for each level it has past nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beast beneath the killer's level is worth half, and five beneath is worth nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kill another landed the killing blow on is worth half to those who only helped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest stage or trial is worth what the world builder sets on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a turn earned settles in order, each weighed at the level what came before it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level gained gives its class's points and a flood of warmth in the core.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Levels fifteen, twenty and every fifth after give a bonus free point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level gained shows as a System window the moment it comes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Level and experience are written on the character's pages before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An experience page's value is what is held toward the next level, and its most is that level's cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience is never shown to the character as a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A survivor of Earth begins at level 0 of tier one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level gives the points its class states, and is felt in the core before it is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in level is written on the page and a line of its history before the turn moves on.",
    },
  ],
} as const satisfies WorldCheck
