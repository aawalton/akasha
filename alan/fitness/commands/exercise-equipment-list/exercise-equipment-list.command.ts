import type { Command } from "@akasha/command-system/command"

export const exerciseEquipmentList = {
  id: "01a0685c-7d81-7c43-a336-76c28eed59fd",
  pageTypeSlug: "command",
  slug: "exercise-equipment-list",
  definition: "the command saying what kit Alan has to load a movement with",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--all", takes: "the kit Alan wants as well as the kit he owns" },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
  ],
  helpNotes: [
    "a piece Alan does not own yet is left out unless `--all` is said.",
    "the kit comes back in the order it is meant to be read in.",
    "a line carries the name, the sort of kit, how it is configured, the loads and whether it is owned.",
    "the loads are the weights the piece can be set to, in pounds.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece saying nothing about whether it is owned is taken as owned.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Command
