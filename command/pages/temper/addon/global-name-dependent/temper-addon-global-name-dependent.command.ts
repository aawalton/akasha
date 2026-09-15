import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAddonGlobalNameDependent = {
  id: "01a0603c-c1ca-77a6-9408-76d7485c7dcf",
  type: "page-type/command",
  slug: "temper-addon-global-name-dependent",
  definition:
    "the command naming what depends on an addon global and ruling whether renaming it is safe",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A dependent is found by reading the sources rather than by running those sources.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The markup files are read for dependents as well as the sources.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A global a call names is reported whether or not that global has dependents.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming no global reports only the globals a menu entry is bound to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A global an addon saves its variables under is one that addon writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
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
