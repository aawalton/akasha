import type { Command } from "@akasha/command-system/command"

export const exerciseEquipmentSet = {
  id: "01a0685c-7d81-772a-834c-9d50baf98d45",
  pageTypeSlug: "command",
  slug: "exercise-equipment-set",
  definition: "the command recording a piece of kit, what it loads to and whether Alan owns it",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<title>", takes: "the name of the piece, said as the first word" },
    { said: "--title <name>", takes: "the name of the piece, which is what it is reached by" },
    { said: "--category <sort>", takes: "the sort of kit the piece is" },
    {
      said: "--configuration <how>",
      takes: "whether there is one of it, a pair, or a load that moves",
    },
    { said: "--loads <csv>", takes: "the weights in pounds it can be set to, parted by commas" },
    { said: "--unavailable", takes: "that Alan wants the piece rather than owns it" },
    { said: "--notes <text>", takes: "what is worth knowing about the piece" },
    { said: "--notes-file <file>", takes: "a file the notes are read from" },
    { said: "--sort-order <n>", takes: "where the piece sits when the kit is read as a list" },
    { said: "--json", takes: "answer as JSON rather than as a line meant for a reader" },
  ],
  helpNotes: [
    "the piece is named as the first word or at `--title`, and either does the same thing.",
    "the first call on a name makes the page and every later call changes the one that stands.",
    "a field the call does not name is left as it was.",
    "a piece is owned unless `--unavailable` is said, and saying it once does not unsay it later.",
    "the loads are one line rather than a list, so `3,5,8,10` is what is meant.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece of kit is reached by its name.",
    },
    {
      invariantKind: "departure",
      statement: "A field the call does not name is left as it was.",
    },
    {
      invariantKind: "departure",
      statement: "A piece made by this call is owned unless the call says otherwise.",
    },
  ],
} as const satisfies Command
