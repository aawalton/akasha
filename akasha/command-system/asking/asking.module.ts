import type { Module } from "@akasha/code-system/module"

export const asking = {
  id: "01a04df0-ecce-7c46-bec3-1461348a7d55",
  pageTypeSlug: "module",
  slug: "asking",
  definition: "the change a command asks for, gated and landed and answered for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every command asks for its change through this module.",
    },
    {
      invariantKind: "departure",
      statement: "A change that landed is answered as landed whether or not the report was built.",
    },
    {
      invariantKind: "departure",
      statement: "Why a report could not be built is said in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that threw is answered as operational rather than as unclassified.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run gates without the hold and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dry run judges what is there as the dry run runs rather than what a later landing will judge.",
    },
    {
      invariantKind: "departure",
      statement: "Every body is formatted before the gate sees the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body that landed other than as it was handed in is named in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A removal is never formatted.",
    },
    {
      invariantKind: "departure",
      statement: "A body that lands is recorded as read by whoever landed the body.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching a body tells a path standing at nothing from one that will not open.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not open is answered with why it would not.",
    },
    {
      invariantKind: "departure",
      statement: "A program landing a change is handed the caller a program lands through.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a check runs is the change kind's answer rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "A landing carrying no change kind runs every check.",
    },
    {
      invariantKind: "departure",
      statement: "The kind that ran no check is named in the commit as the reason none ran.",
    },
    {
      invariantKind: "gap",
      statement: "A caller is never told nothing happened when something did.",
    },
  ],
} as const satisfies Module
