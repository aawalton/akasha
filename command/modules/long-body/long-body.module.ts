import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const longBody = {
  id: "01a0614f-24db-74bb-83ae-6e7c5477cf42",
  type: "module",
  slug: "long-body",
  definition: "a body longer than one answer handed back a run of whole numbered lines at a time",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many bytes one answer has is stated here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Three other files state that count of their own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run has whole lines.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run begins after the line the caller names as already reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line already reached past the last line begins the run at the first line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run has every further line the answer has room left for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run names the line the run begins at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run names the line the run ends at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run names how many lines the body has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run ending at the last line says the whole body reached the reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run ending short of the last line says nothing past that line reached the reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call for the next run is handed back only where a line is left over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The call for the next run is priced as the widest line number the body can hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal for a line too wide names that line and its bytes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line number is no part of the body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the record of the bodies an agent read.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A reader that dropped the lines an earlier run handed over is judged here.",
    },
  ],
} as const satisfies Module
