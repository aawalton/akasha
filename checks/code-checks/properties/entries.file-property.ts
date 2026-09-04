import type { FileProperty } from "@akasha/pages-system/file-property"

export type Entries = "jsonl"

export const entries = {
  id: "01a06dc1-5cd2-7bc0-b943-c68e1d872c39",
  pageTypeSlug: "file-property",
  slug: "entries",
  propertySlug: "entries",
  definition: "what each run of a check cost, one line appended as that run ends",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A line names the phase its run was judged at.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the cost of the child processes a check waited on.",
    },
    {
      invariantKind: "departure",
      statement: "Memory is read as the high-water mark the run moved.",
    },
    {
      invariantKind: "departure",
      statement: "A file's fill is read from its size rather than from its text.",
    },
    {
      invariantKind: "departure",
      statement: "Entries are kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "No page states its own entries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a run cost.",
    },
    {
      invariantKind: "absence",
      statement: "A run that cannot be recorded is not a run that is refused.",
    },
  ],
} as const satisfies FileProperty
