import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperAddonGlobalNameDependent = {
  id: "01a0603c-c1ca-77a6-9408-76d7485c7dcf",
  type: "command",
  slug: "temper-addon-global-name-dependent",
  definition:
    "the command naming what depends on an addon global and ruling whether renaming it is safe",
  code: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A dependent is found by reading the sources rather than by running those sources.",
    },
    {
      invariantKind: "departure",
      statement: "The markup files are read for dependents as well as the sources.",
    },
    {
      invariantKind: "departure",
      statement: "A global a call names is reported whether or not that global has dependents.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no global reports only the globals a menu entry is bound to.",
    },
    {
      invariantKind: "departure",
      statement: "A global an addon saves its variables under is one that addon writes.",
    },
    {
      invariantKind: "departure",
      statement: "A JSON answer here is one report a line rather than one document.",
    },
  ],
  name: "global-name-dependent",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/global", saidAs: "flag-or-word" },
    { argument: "argument/json" },
  ],
} as const satisfies Command
