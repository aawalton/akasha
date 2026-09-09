import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const subagentHanded = {
  id: "01a080c8-f2a7-7f65-bd12-7fb53d580426",
  pageTypeSlug: "module",
  type: "module",
  slug: "subagent-handed",
  definition: "the edits a subagent left for the seat that dispatched it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent hands its edits over by leaving them where the subagent kept them.",
    },
    {
      invariantKind: "departure",
      statement:
        "The edits a subagent left are the seat's to take once the subagent's page is gone.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent still with a page has handed nothing over.",
    },
    {
      invariantKind: "departure",
      statement: "A seat reaches the subagents whose slug its own name opens.",
    },
    {
      invariantKind: "departure",
      statement: "A file the edits are not named by is passed over rather than read.",
    },
    {
      invariantKind: "departure",
      statement: "The subagents are named in one order rather than the order the folder answers.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is not there answers no subagent.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an edit or writes one.",
    },
    {
      invariantKind: "gap",
      statement: "The folder a subagent's page sits in is spelled here as well as by the seats.",
    },
  ],
} as const satisfies Module
