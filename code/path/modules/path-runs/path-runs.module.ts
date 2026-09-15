import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pathRuns = {
  id: "01a08dc8-f79a-7000-992b-06d5107912ec",
  type: "module",
  slug: "path-runs",
  definition: "the runs of path characters a body holds, each with the line that run sits on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read as the runs of path characters that body holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is read again from each separator in that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readings of one run are answered from the longest reading down.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run with no separator is no path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line with no separator holds no run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is answered with the line that run sits on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run states whether a shell variable opens the path that run is part of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shell variable is a `$` before a name, with or without braces around it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `$` a path character sits before opens nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `$` before no name is no shell variable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is numbered from one.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run reaches over no line break.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the language a body is written in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a run names a real path is not judged here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
