import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersReportedStats = {
  id: "01a13aba-15a3-7b78-9f8e-67140b6bcc70",
  type: "page-type/module",
  slug: "characters-reported-stats",
  definition: "the character sheet's numbers for the bar now held, read into the saved table",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading kept names every key the reading schema admits, and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat is named by the metric the stat calculator gives the same number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is taken for the bar held, and the other bar's last reading is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps the ability id and the name of each buff on the player when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the text the game gives each of those buffs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the effect text and the stacks the game gives each buff now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps Escalating Fete's stacks and how long ago Fete last changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each stat a second time as the game gives it without bonuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each pet the player has, by its name and whether it is dead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading says whether the player was in combat when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading says whether the player was blocking and whether moving when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the Ultimate and the Health the player held when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the Health of the power update before the last one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading kept as Elder Dragon's health recovery changes skips settling and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the version string the game gave when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the points spent on each champion star and the most it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the bonus the game says each champion star gives now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps whether the game lets each champion star be slotted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps each worn piece's link, armor, enchantment and trait text, and quality.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps the search category the game gives each worn piece's enchantment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the weapon power the game gives each worn piece.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the level and the champion points each worn piece requires.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each worn piece's set id, and 0 for a piece in no set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps what the game says of a worn piece's set as worn, with each bonus line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn piece's set text plans or diagnoses a case and is never a verified case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each skill on the bar held, with the text the game gives it now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each such skill's duration, cast time, channeling and cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the Ultimate the ultimate costs, and 0 for every other skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each class passive bought, with the text the game gives it now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading says whether the player was in the Infinite Archive when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps the game's critical damage, critical healing, healing done and healing taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each such percent is kept as a fraction under the metric giving the same number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each advanced stat the game's sheet shows, as the game gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each other number the character sheet shows, under its sheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps each Archive verse and vision held, with its stacks and its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps what the game gives of the class mastery lines where it has them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the build hash worked out in the same capture as its stats.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's stats can trail a build change by one capture.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's stats and its buff list can be read at different moments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Buffs agree where each buff's ability id, name and stacks agree, in any order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is kept only once the numbers it is made of have stopped changing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bar held is also given as read now, for a reader that cannot wait for a keep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Keeping a reading tells the one listener waiting for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character keeps its last twenty readings, each with its bar, oldest first.",
    },
  ],
  createdAt: "2026-10-14T14:03:56.194Z",
  updatedAt: "2026-10-20T18:02:43.455Z",
} as const satisfies Module
