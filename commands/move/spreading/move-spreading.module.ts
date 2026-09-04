import type { Module } from "@akasha/code-system/module"

export const moveSpreading = {
  id: "01a05d57-f5d8-7e53-8ccd-0fd0f89a3053",
  pageTypeSlug: "module",
  slug: "move-spreading",
  definition: "a folder named for a move opened into the pairs the files under it carry",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pair naming a file is handed back untouched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pair naming a folder becomes one pair for every file git holds under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file keeps the place the file had beneath the folder the file moved with.",
    },
    {
      invariantKind: "departure",
      statement: "A folder arrives at the path the folder names rather than inside that path.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page is left out of the pairs.",
    },
    {
      invariantKind: "departure",
      statement: "The move pulls that file in by the page it is beside.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git holds no file under is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder holding a file git does not track is refused rather than moved without that file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding a file git is told to ignore is moved rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path git cannot be asked about is refused rather than read as holding nothing.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal stops the whole call rather than the pair that drew that refusal.",
    },
    {
      invariantKind: "absence",
      statement: "No file is renamed here.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty folder is nowhere in a commit.",
    },
    {
      invariantKind: "departure",
      statement: "A folder a move empties is cleared on disk.",
    },
  ],
} as const satisfies Module
