import type { Module } from "@akasha/code-system/module"

export const longBody = {
  id: "01a0614f-24db-74bb-83ae-6e7c5477cf42",
  pageTypeSlug: "module",
  slug: "long-body",
  definition: "a body longer than one answer handed back a run of whole numbered lines at a time",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run holds whole lines.",
    },
    {
      invariantKind: "departure",
      statement: "A run begins after the line the caller names as already reached.",
    },
    {
      invariantKind: "departure",
      statement: "A line already reached past the last line begins the run at the first line.",
    },
    {
      invariantKind: "departure",
      statement: "A run holds every further line the answer has room left for.",
    },
    {
      invariantKind: "departure",
      statement: "A run names the line the run begins at.",
    },
    {
      invariantKind: "departure",
      statement: "A run names the line the run ends at.",
    },
    {
      invariantKind: "departure",
      statement: "A run names how many lines the body holds.",
    },
    {
      invariantKind: "departure",
      statement: "A run ending at the last line says the whole body reached the reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run ending short of the last line says nothing past that line reached the reader.",
    },
    {
      invariantKind: "departure",
      statement: "A call for the next run is handed back only where a line is left over.",
    },
    {
      invariantKind: "departure",
      statement: "The call for the next run is priced as the widest line number the body can hold.",
    },
    {
      invariantKind: "departure",
      statement: "A line the answer has no room for is refused rather than divided.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a line too wide names that line and its bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A line number is no part of the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the record of what an agent read.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here judges whether the reader kept what an earlier run handed over.",
    },
  ],
} as const satisfies Module
