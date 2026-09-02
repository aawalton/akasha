import type { Command } from "@akasha/command-system/command"

export const temperAddonGlobalNameDependents = {
  id: "01a0603c-c1ca-77a6-9408-76d7485c7dcf",
  pageTypeSlug: "command",
  slug: "temper-addon-global-name-dependents",
  definition:
    "the command naming what depends on an addon global and ruling whether renaming it is safe",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<global>", takes: "the global name dependents are enumerated for" },
    { said: "--global <name>", takes: "the global name dependents are enumerated for" },
    { said: "--json", takes: "give one report per line as JSON rather than as prose" },
    { said: "--repo-root <path>", takes: "the checkout scanned" },
  ],
  helpNotes: [
    "naming no global reports every global an addon writes that a menu entry is bound to.",
    "the addon sources and the markup files alike are read for dependents.",
    "a global an addon saves its variables under counts as one the addon writes.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dependent is found by reading the sources rather than by running them.",
    },
    {
      invariantKind: "departure",
      statement: "The markup files are read for dependents as well as the sources.",
    },
    {
      invariantKind: "departure",
      statement: "A global a call names is reported whether or not it has dependents.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no global reports only the globals a menu entry is bound to.",
    },
  ],
} as const satisfies Command
