import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const entries = {
  id: "01a06dc1-5cd2-7bc0-b943-c68e1d872c39",
  type: "file-property",
  slug: "entries",
  propertySlug: "entries",
  definition: "what one run cost, one line appended as that run ends",
  extensions: ["jsonl"],
  generated: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line names the phase its run was judged at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has the cost of the child processes a check waited on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Memory is read as the high-water mark the run moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file's fill is read from its size rather than from its text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Entries are kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page states its own entries.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a run's cost.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run that cannot be recorded is not a run that is refused.",
    },
  ],
  types: "ts",
  keptForHours: 24,
} as const satisfies FileProperty
