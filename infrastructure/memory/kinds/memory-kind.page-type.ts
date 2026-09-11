import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const memoryKind = {
  id: "01a0912d-e1a4-76ac-8b44-8632c97fc053",
  type: "page-type",
  slug: "memory-kind",
  definition: "one measure a reading of memory is taken in",
  pluralSlug: "memory-kinds",
  extends: ["page-type/domain"],
  parts: [
    "memory-kind/resident",
    "memory-kind/virtual",
    "memory-kind/shared",
    "memory-kind/proportional",
    "memory-kind/available",
    "memory-kind/cached",
    "memory-kind/swap",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading of memory is in one kind.",
    },
    {
      invariantKind: "departure",
      statement: "A number in one kind answers no question asked in another.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling states the kind that ceiling is read in.",
    },
    {
      invariantKind: "departure",
      statement: "A total over more than one process is taken in proportional memory.",
    },
    {
      invariantKind: "departure",
      statement: "A kind the kernel has no file for is no kind.",
    },
  ],
  types: "ts",
} as const satisfies PageType
