import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoGenerateColonMethod = {
  id: "01a0685d-f8fa-7dc8-bf64-5a62864e6dbb",
  type: "command",
  slug: "temper-eso-generate-colon-method",
  definition: "the command staging the census of the method names the base game defines on a class",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The census is names rather than receivers.",
    },
    {
      invariantKind: "departure",
      statement: "The census is written as numbered runs with an aggregate composing those runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's ordinal carries at least two digits and as many as the count of runs needs.",
    },
    {
      invariantKind: "departure",
      statement: "A clone with no colon-method refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The command remains while nothing reads the census that command would make.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing lands here.",
    },
    {
      invariantKind: "departure",
      statement: "The writing call that lands the staged bodies is named instead.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "departure",
      statement: "The staging folder is named as soon as this made it.",
    },
    {
      invariantKind: "departure",
      statement: "Each body staged is named as soon as that body is written.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw part way names in its refusal what it had staged.",
    },
    {
      invariantKind: "departure",
      statement: "The staging is handed in.",
    },
    {
      invariantKind: "gap",
      statement: "A check reads this census.",
    },
  ],
  name: "colon-method",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/stage" },
    { argument: "argument/eso-root" },
  ],
} as const satisfies Command
