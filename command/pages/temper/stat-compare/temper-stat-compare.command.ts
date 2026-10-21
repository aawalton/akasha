import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperStatCompare = {
  id: "01a13ac6-0c63-7b9c-bc03-6035eeeed9e2",
  type: "page-type/command",
  slug: "temper-stat-compare",
  definition:
    "the command setting each of a character's readings beside Temper's estimate, stat by stat",
  code: "ts",
  test: "ts",
  parts: ["module/unsteady-recovery", "module/advanced-sheet-lines", "module/reading-stat-case"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The readings are read from the character's readings file, one reading to a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newest three readings are shown where no reading is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is named by the second it was captured or by the start of its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each reading opens with its id, when it was captured, its bar and its game version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading's opening line names the race and class its build hash holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading says whether it was taken in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading says its worn sets, skills, stars, buffs, class passives and curse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A worn set's pieces are counted as the estimate counts them, on the reading's bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn set the set catalog lacks is listed and marked as not in the catalog.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading sets every stat the game reported beside the estimate and the gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat the estimate gives exactly is marked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stamina recovery read while the player was blocking or moving is marked as no steady value.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Stamina recovery of exactly 0 on a reading keeping neither flag is marked the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Maximum Health, Magicka and Stamina read under 3.3 seconds after Fete changed are unsettled.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's maximum stats have trailed a Fete change by just over 3 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An unsettled stat is marked as no steady value, and the JSON says it is unsettled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat marked that way is not counted among the stats that match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count of stats that match says how many stats Fete left unsettled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The estimate is the stat cases' own, from the build and the reading's buffs and stars.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff the reading listed that no buff page names is marked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading names the stat case pinned from it, where one was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each reading shows the advanced stats the game's sheet gave in a section of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That section says how many stats it holds and groups them by the panel's category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat there is set beside the name the game's panel shows it under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That section sets each row beside the estimate of the stat whose page names that row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The JSON gives each such row's stat, the game's number, the estimate and a match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading shows the character sheet's other numbers in a section of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat named alone is shown one line to a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line of the readings that does not read is counted and the first one said.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "stat-compare",
  arguments: [
    { argument: "argument/character", required: true, saidAs: "flag-or-word" },
    { argument: "argument/reading-count" },
    { argument: "argument/captured-at", notWith: ["argument/reading-id"] },
    { argument: "argument/reading-id" },
    { argument: "argument/stat" },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-14T14:17:00.259Z",
  updatedAt: "2026-10-21T01:44:00.751Z",
} as const satisfies Command
