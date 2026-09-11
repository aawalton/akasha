import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const swap = {
  id: "01a09115-ab97-7288-8379-c76147c45138",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "swap",
  definition: "disk a host holds a process's memory in while that process is not reaching it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Swapped memory is counted against the process holding it.",
    },
    {
      invariantKind: "constraint",
      statement: "Reaching swapped memory costs thousands of times what reaching RAM costs.",
    },
    {
      invariantKind: "departure",
      statement: "A host is unusable from swapping long before that host's swap is gone.",
    },
    {
      invariantKind: "departure",
      statement: "Swap left is no sign a host has memory to spare.",
    },
    {
      invariantKind: "departure",
      statement: "Swap of more than one kind is taken in the order the priorities state.",
    },
    {
      invariantKind: "departure",
      statement: "A host with no swap at all is a host whose swap is drained.",
    },
  ],
} as const satisfies Domain
