import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiGrowth = {
  id: "01a0ea84-ed5c-707d-ba09-db2e1d5eac19",
  type: "page-type/world-check",
  slug: "otherwhere-xi-growth",
  title: "Growth",
  world: "world/the-calamitous-bob-stubbed",
  definition:
    "how far earnest effort raises a character's stats, skills and attunement in Otherwhere XI",
  description: "How much stronger effort has made someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is settled with no dice, once a turn, when effort has built up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat rises one for each span of earnest days: one under 10, two under 20, four under 30.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The span is eight earnest days under 40, and sixteen from 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An earnest day is a day of hard, purposeful use of what the stat measures, not mere living.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Labour raises Power, deft work Finesse, strain Endurance, study and practice Focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Close watching and puzzling raise Acuity; pain, fear or temptation withstood raise Willpower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feat done where her life hung on it counts two earnest days for its stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An outlander counts each earnest day twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Days carried over toward a stat's next rise are noted on its history line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Acuity at 20 gives the Inspection skill at Novice 1, and quicker sight that tires her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Willpower at 20 lets her resist another's pressure on her mind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Endurance at 20 lets her bear armor and long toil without flagging.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power at 20 lets her spells strike harder and reach farther from her body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Focus at 20 lets her hold a second rune in mind while casting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Finesse at 20 quickens her hands and feet beyond the untrained.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At 30 a mental stat splits her attention across several glyphs at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each milestone shows as: You have reached a milestone! and what it gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day in a power locus or mana-thick place adds a tenth of a percent attunement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Once she feels mana, each hour drawing it adds a tenth, at most three hours a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each time strong magic heals or strikes her adds a tenth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An outlander's first season doubles what attunement gains; past ten percent they halve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reaching one percent shows: Additional features have been unlocked. Status is now available.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill forms after a full day of earnest, repeated work at one narrow thing, at Novice 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new skill shows as: You have acquired the skill: Name at Novice 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is filed on its page the moment the interface grants it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill rises a level for each 2 earnest uses at Novice, 3 at Beginner, 4 at Apprentice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It takes 6 uses a level at Intermediate, 10 at Expert and 20 at Master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An earnest use is one scene where the skill bore on an outcome that mattered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Past level nine a skill takes the next rank at level one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At Intermediate 9 the interface offers her a choice of how the skill becomes Expert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rise shows as: Your Name skill has improved to Beginner 2!",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path is first offered at three skills and a stat at 20, or after a month at one pursuit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An outlander's path is her own, fitted to her deeds and the marks on her soul.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a path is her first step; it grants one path skill and ten more health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path shows progress as (n/10); each deed that fits its purpose fills one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A full path with a stat milestone behind it lets her take the next step, even mid-fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"character":"...","gains":[{"kind":"stat",...}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat page's slug ends in the stat it keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The six stats are Power, Finesse, Endurance, Focus, Acuity and Willpower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power, Finesse and Endurance are the physical stats; the other three the mental.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power also sets how hard her spells hit and how far from her body she can cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Focus, Acuity and Willpower set how well she casts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its rises raise most health and mana as the harm and mana-flow checks work them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An untrained adult sits from 8 to 15, a trained soldier in the twenties, a fourth-stepper past 30.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each ten is a tier; about 45 is the upper limit of a human.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each multiple of ten a stat reaches is a milestone, with the gift named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The interface shows a stat's rise as a line such as [Focus +1] as it happens.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stat shows as a number save where her status or the interface shows it.",
    },
  ],
} as const satisfies WorldCheck
