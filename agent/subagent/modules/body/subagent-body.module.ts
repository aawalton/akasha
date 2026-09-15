import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentBody = {
  id: "01a095a9-3597-76ca-9721-8a3f5de0de1f",
  type: "page-type/module",
  slug: "subagent-body",
  definition: "the body a subagent's page is composed of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is laid out by the page body module rather than by a composer of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys a body states are named here, in the order the body states them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body composed states no id where the call names none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body names its principal seat by page type and slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body names its type from the root rather than by a relative path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a body imports its type from is the file the page type states.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A slug no `export const` may be declared under lays out a body that will not parse.",
    },
  ],
} as const satisfies Module
