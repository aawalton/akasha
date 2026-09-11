import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const memoryKind = {
  id: "01a09115-4fce-70b7-b24c-46555b3d5729",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "memory-kind",
  definition: "the measure a reading of memory is in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Resident memory is what a process holds in RAM at the moment it is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "Virtual memory is what a process has asked for rather than what that process holds.",
    },
    {
      invariantKind: "departure",
      statement: "Proportional memory divides a shared page among the processes sharing that page.",
    },
    {
      invariantKind: "departure",
      statement: "Two processes sharing a page are each resident in the whole page.",
    },
    {
      invariantKind: "departure",
      statement: "A total over more than one process is taken in proportional memory.",
    },
    {
      invariantKind: "departure",
      statement:
        "Available memory is what a program could take without swapping rather than memory that is free.",
    },
    {
      invariantKind: "departure",
      statement: "Cached memory reads as used and is given up on demand.",
    },
    {
      invariantKind: "constraint",
      statement: "Memory a process has swapped out is held by that process and resident nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling states the kind that ceiling is read in.",
    },
  ],
} as const satisfies Domain
