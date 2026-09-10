import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const subagentHanded = {
  id: "01a080c8-f2a7-7f65-bd12-7fb53d580426",
  pageTypeSlug: "module",
  type: "module",
  slug: "subagent-handed",
  definition: "the edits a subagent left for the seat that dispatched it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent hands its edits over by leaving them where the subagent kept them.",
    },
    {
      invariantKind: "departure",
      statement: "The edits a subagent left are the seat's once the subagent has returned.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent that has not returned has handed nothing over.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent whose edits are gone has handed nothing over.",
    },
    {
      invariantKind: "departure",
      statement: "A seat reaches the subagents whose slug its own name opens.",
    },
    {
      invariantKind: "departure",
      statement: "The subagents are asked of the index rather than listed off a folder.",
    },
    {
      invariantKind: "departure",
      statement: "The subagents are named in one order rather than the order the index answers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an edit or writes one.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page a subagent sits at is read from the index rather than composed from a name.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent the index files no page for is at no page.",
    },
  ],
} as const satisfies Module
