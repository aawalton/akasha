import type { Module } from "@akasha/code/module"

export const yamlLines = {
  id: "01a07c5c-680a-740f-a3f1-a715427bd81a",
  pageTypeSlug: "module",
  type: "module",
  slug: "yaml-lines",
  definition: "the lines a YAML body holds, with the blank lines at the end dropped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is parted at each newline.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line at the end of a body is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line inside a body is kept.",
    },
  ],
} as const satisfies Module
