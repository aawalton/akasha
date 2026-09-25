import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagePlacing = {
  id: "01a0c60d-0443-74a8-99db-bdbc64cbee8e",
  type: "page-type/module",
  slug: "page-placing",
  definition: "bytes put beside a page under a file property the page keeps outside the commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes are placed beside a page that is there and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type has no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming a property that keeps no file is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key naming a committed file is refused, because a committed file lands through a write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placing names the ending the bytes are held under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ending the property does not name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ending placed is remembered among the page's uncommitted values under the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer names the path the bytes landed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bytes that will not land, or a page at more than one path, are refused as the service's fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other placing refused is refused as the caller's fault.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
