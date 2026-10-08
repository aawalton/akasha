import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const yamlLines = {
  id: "01a07c5c-680a-740f-a3f1-a715427bd81a",
  type: "page-type/module",
  slug: "yaml-lines",
  definition: "the lines a YAML body holds, with the blank lines at the end dropped",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is parted at each newline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line at the end of a body is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line inside a body is kept.",
    },
  ],
  createdAt: "2026-09-07T14:53:45.866Z",
  updatedAt: "2026-09-15T18:33:51.000Z",
} as const satisfies Module
