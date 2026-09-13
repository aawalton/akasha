import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentBody = {
  id: "01a095a9-3597-76ca-9721-8a3f5de0de1f",
  type: "module",
  slug: "subagent-body",
  definition: "the body a subagent's page is composed of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is laid out by the page body module rather than by a composer of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a body states are named here, in the order the body states them.",
    },
    {
      invariantKind: "departure",
      statement: "A body composed states no id where the call names none.",
    },
    {
      invariantKind: "departure",
      statement: "A body names its type from the root rather than by a relative path.",
    },
    {
      invariantKind: "departure",
      statement: "The file a body imports its type from is the file the page type states.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A slug no `export const` may be declared under lays out a body that will not parse.",
    },
  ],
} as const satisfies Module
