import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pathRuns = {
  id: "01a08dc8-f79a-7000-992b-06d5107912ec",
  type: "module",
  slug: "path-runs",
  definition: "the runs of path characters a body holds, each with the line that run sits on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is read as the runs of path characters that body holds.",
    },
    {
      invariantKind: "departure",
      statement: "A run is read again from each separator in that run.",
    },
    {
      invariantKind: "departure",
      statement: "The readings of one run are answered from the longest reading down.",
    },
    {
      invariantKind: "departure",
      statement: "A run with no separator is no path.",
    },
    {
      invariantKind: "departure",
      statement: "A line with no separator holds no run.",
    },
    {
      invariantKind: "departure",
      statement: "A run is answered with the line that run sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A run states whether a shell variable opens the path that run is part of.",
    },
    {
      invariantKind: "departure",
      statement: "A shell variable is a `$` before a name, with or without braces around it.",
    },
    {
      invariantKind: "departure",
      statement: "A `$` a path character sits before opens nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A `$` before no name is no shell variable.",
    },
    {
      invariantKind: "departure",
      statement: "A line is numbered from one.",
    },
    {
      invariantKind: "absence",
      statement: "A run reaches over no line break.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the language a body is written in.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a run names a real path is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
