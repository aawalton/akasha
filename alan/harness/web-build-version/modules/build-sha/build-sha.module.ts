import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildSha = {
  id: "01a05c48-deeb-700e-a808-4f4784f43278",
  type: "page-type/module",
  slug: "build-sha",
  definition: "the forty hexadecimal characters a commit is named by, read out of a string",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything that is not forty lower hexadecimal characters is read as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name the commit is read from is written out in full rather than reached by a key.",
    },
  ],
} as const satisfies Module
