import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceReaching = {
  id: "01a0930d-d3b8-7d4d-8e4e-acf83c0ad0dd",
  type: "module",
  slug: "service-reaching",
  definition:
    "the files of this repository a workstation service reaches by its run and its imports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file of this repository a service's run command names is reached by that service.",
    },
    {
      invariantKind: "departure",
      statement: "A file importing a file a service reaches is reached by that service too.",
    },
    {
      invariantKind: "departure",
      statement: "A file is reached through as many imports as it takes rather than through one.",
    },
    {
      invariantKind: "departure",
      statement: "Which files import a file is asked of the index rather than read out of a body.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching outside this repository is reached by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A file named by a page rather than by a run command is reached by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run spelled under a tree is read as the paths of the repository that tree holds.",
    },
    {
      invariantKind: "departure",
      statement: "A file already reached is not reached again.",
    },
    {
      invariantKind: "departure",
      statement: "The reach stops at the ceiling it is handed and says that the reach stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A file no file of this repository imports is reached by itself alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here watches a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a unit or reaches systemd.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether a service is started again.",
    },
  ],
} as const satisfies Module
