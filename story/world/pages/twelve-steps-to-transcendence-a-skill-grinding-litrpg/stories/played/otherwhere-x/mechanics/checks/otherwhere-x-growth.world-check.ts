import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXGrowth = {
  id: "01a0ea79-b2bc-7afe-b3ca-411782bf17e7",
  type: "page-type/world-check",
  slug: "otherwhere-x-growth",
  title: "Growth",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition: "the practice, skill levels and essence one turn in Otherwhere X gives a character",
  description: "How much a turn of practice, danger and hunting grew someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Growth is settled once a turn for each character who practised, fought or killed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every ability she works at in earnest is named in the reading, held as a skill or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of earnest practice is one point, and an hour under a teacher two more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of real danger is six points, and an hour fighting for her life thirty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill left running in the background earns nothing; only earnest use counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At Tier 0 no skill is learned and no level rises; the points bank on her practice pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "From Tier 1 a skill's next level costs its level times two, four, six or eight points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Common costs two a level to cap 10, uncommon four to 20, rare six to 30, epic eight to 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last two levels below a cap cost twice as much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points left over stay banked for the next level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill at its cap gains nothing more until it evolves or fuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At its cap the System offers four evolution paths the world builder names from her use.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An evolved skill starts at level 1 of the next rarity, with its old levels hidden inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "From Tier 1 an ability banked to ten points is offered as a common skill if a slot is free.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten skill slots are open at Tier 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At her first advancement, calibration turns each ability banked to ten into a skill with levels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A memory shard absorbed offers its skill at level 1, with no points needed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill gives one essence for a Tier 0 beast, 10 Tier 1, 40 Tier 2, 160 Tier 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill made fighting for her life gives half again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Essence from any source is halved for each tier she holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An essence shard dissolved in hot water gives one essence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Without a cycling technique she keeps only a quarter of the essence she gathers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With a technique, a day drinking at Stillwater gives one essence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Advancing from Tier 0 takes 100 essence, from Tier 1 400, from Tier 2 1600.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stages run early, middle, late and peak, at each quarter of the essence needed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Advancing from Tier 0 also needs a cycling technique and forty hours of hard training banked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Forcing essence into an untrained core tears its channels: a crushing Tier 0 harm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On advancing, her essence is spent, her tier rises, and her most health and mana rise with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On advancing she splits her essence among strength, dexterity, constitution and mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On advancing the System offers one new skill fitting her paths, named by the world builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new tier costs one on bodily acts for a week while the body settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gain shows as a System box only where the System would show one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At Tier 0 she sees no box for her own skills; offers and kill notices still show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Practice, skills, essence and tier are written on her pages before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The essence gained is added to her essence page in the same landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck
