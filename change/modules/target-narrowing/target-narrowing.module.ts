import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetNarrowing = {
  id: "01a0825b-c6ad-78e4-9391-698b96bafb0c",
  type: "page-type/module",
  slug: "target-narrowing",
  definition:
    "how code finds whether a change target subtype sits under another change target subtype",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subtype narrows itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subtype narrows every subtype its parent narrows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parent a subtype names is read off the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent is named as an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is the part of that address past the page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subtype naming no parent narrows nothing above itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subtype the index files no page for narrows nothing above itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain of parents coming back on itself is walked once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a path.",
    },
  ],
  createdAt: "2026-09-08T18:50:47.853Z",
  updatedAt: "2026-10-30T17:45:02.601Z",
} as const satisfies Module
