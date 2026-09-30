import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereVGrowth = {
  id: "01a0e9fb-9dd9-74f4-8bd3-3f56468eeb8d",
  type: "page-type/world-check",
  slug: "otherwhere-v-growth",
  title: "Growth",
  world: "world/ends-of-magic",
  definition: "the levels and ranks Davrar grants a character in Otherwhere V for one turn",
  description: "How much stronger and more skilled a turn made someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Growth is settled once a turn for each character who faced a challenge or used a power.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A challenge is a hardship overcome: a fight, a peril survived, a hard truth faced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Killing is never needed; overcoming is what counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Davrar gives nothing for a sham, such as lying to a wall or a golem.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A minor challenge gives no level, a real one one, dangerous two, dire three, deadly six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A challenge failed or fled gives nothing, though a peril survived still counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Disadvantage doubles the levels a challenge gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Levels come half as fast past 27, a quarter past 81, and halve again each step on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'With no class, a level past nine shows as "level 9+" and the rest are banked.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At level nine Davrar offers classes chosen from her deeds and nature, all at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder names the classes offered, and a choice may wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class chosen grants its class skills and its resource at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class develops at levels 27, 81, 243 and on, as the world builder decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Talent or utility skill used in earnest gains one rank, strongly two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Disadvantage adds one rank to each use.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Uses of one power in one turn settle in order, each from the rank the use before left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank reaching each tenth waits there until Insight lets it develop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With Insight it develops into a greater power that starts again at rank one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new Talent or utility skill is offered as pending when a deed shows the gift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder decides every offer, and Nala may accept or refuse each one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person holds at most three Talents, and any number of utility skills.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A gain shows as a Davrar box only where Davrar would show one: an offer, a class, a rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Level and ranks are written on her pages before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck
