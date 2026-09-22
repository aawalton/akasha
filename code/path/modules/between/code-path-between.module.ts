import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codePathBetween = {
  id: "01a06558-3a62-7fa9-90c6-0d6dc35875f0",
  type: "page-type/module",
  slug: "code-path-between",
  definition: "the folder a path sits in, and the way from a folder to a path",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A way from one folder to a path keeps the last segment of that path whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder is answered as the path up to its last separator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no separator sits in no folder rather than in a clipped one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
