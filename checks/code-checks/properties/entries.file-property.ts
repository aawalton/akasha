import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const entries = {
  id: "01a06dc1-5cd2-7bc0-b943-c68e1d872c39",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "entries",
  propertySlug: "entries",
  definition: "what one run cost, one line appended as that run ends",
  extensions: ["jsonl"],
  generated: true,
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
      statement: "A line has the cost of the child processes a check waited on.",
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
      statement: "Nothing here judges a run's cost.",
    },
    {
      invariantKind: "absence",
      statement: "A run that cannot be recorded is not a run that is refused.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
