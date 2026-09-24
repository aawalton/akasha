import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const hashIndexedEntryKeepsItsPlace = {
  id: "01a0d5c5-e951-72c9-8279-6d809d75ffc3",
  type: "page-type/check-code",
  slug: "hash-indexed-entry-keeps-its-place",
  definition:
    "the check refusing a change that moves or removes an entry of a table a build hash reads by place",
  parts: ["module/hash-table-entries"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A table is marked by `hashIndexed` on its page rather than listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each entry the base holds keeps the index the base gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry added after the last entry the base holds moves nothing and lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the table, each entry moved, and its index before and after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry taken out is named as gone, and the entries after it as moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry of a record is its key, read in the order the language gives keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An entry of an array is the literal `id` it states, and else the element as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element written twice is told apart by how many times it came before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry among a page type's pages is a page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's pages are read in order of the field the mark names, then of slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A table spread in from another constant or module is read in the place it is spread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A table is read through `.data`, `.ids` and `.list` and through a factory's call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A table is judged at change only where the change writes a file it is read through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark the change takes off a page still holds the table in that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table the base could not read is held to nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table the base read and the change leaves unreadable is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit has no base, so an audit refuses a marked table it cannot read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs the code a table is written in.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
