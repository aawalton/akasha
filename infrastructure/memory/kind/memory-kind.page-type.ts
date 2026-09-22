import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const memoryKind = {
  id: "01a0912d-e1a4-76ac-8b44-8632c97fc053",
  type: "page-type/page-type",
  slug: "memory-kind",
  definition: "a measure a reading of memory is taken in",
  extends: ["page-type/domain"],
  parts: [
    "memory-kind/available",
    "memory-kind/cached",
    "memory-kind/proportional",
    "memory-kind/resident",
    "memory-kind/shared",
    "memory-kind/swap",
    "memory-kind/virtual",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of memory is in one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number in one kind answers no question asked in another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling states the kind that ceiling is read in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A total over more than one process is taken in proportional memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind the kernel has no file for is no kind.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
