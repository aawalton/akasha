import type { Module } from "../../code-system/modules/module.page-type.ts"

export const terminalMarks = {
  id: "01a06491-1a8d-7b02-a92e-48083598a4b9",
  pageTypeSlug: "module",
  slug: "terminal-marks",
  definition:
    "what the renamer last put on each terminal, and the name it puts on one with no process id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mark is held against the terminal rather than against the terminal's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mark says what the renamer last applied rather than what the terminal now shows.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal holding no mark is a terminal the renamer has not named.",
    },
    {
      invariantKind: "departure",
      statement: "A name and a color are marked apart.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal with no process id is given one fixed name.",
    },
    {
      invariantKind: "departure",
      statement: "The fixed name is compared only inside the terminal renamer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renames or recolors a terminal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here drops the mark of a closed terminal.",
    },
  ],
} as const satisfies Module
