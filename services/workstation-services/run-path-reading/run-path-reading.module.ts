import type { Module } from "@akasha/code/module"

export const runPathReading = {
  id: "01a088a6-acf3-740a-9bbc-9f25e543ec53",
  pageTypeSlug: "module",
  slug: "run-path-reading",
  definition: "the files of this repository a workstation service's run command names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command is read as the words whitespace parts that command into.",
    },
    {
      invariantKind: "departure",
      statement: "A word ending in `.ts` or `.sh` names a file of this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A command naming several files names each of them.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with a dash is a flag or a command that may fail.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with a slash, a tilde or a percent names the workstation.",
    },
    {
      invariantKind: "departure",
      statement: "A word carrying a scheme is an address rather than a path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the checkout root rather than against any other folder.",
    },
    {
      invariantKind: "departure",
      statement: "A path no file is at is given back beside the command spelling that path.",
    },
    {
      invariantKind: "absence",
      statement: "A word in none of these shapes is judged here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or an index.",
    },
  ],
} as const satisfies Module
