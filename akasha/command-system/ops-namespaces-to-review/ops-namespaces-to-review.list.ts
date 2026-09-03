import type { List } from "../../domain-system/lists/list.page-type.ts"

export const opsNamespacesToReview = {
  id: "01a06862-a02e-7d77-87c9-7087ceac7ed7",
  pageTypeSlug: "list",
  slug: "ops-namespaces-to-review",
  definition: "the ops namespaces holding a command nobody has ruled on",
  members: [
    { memberName: "service", definition: "a namespace holding 3 commands" },
    { memberName: "tower", definition: "a namespace holding 8 commands" },
    { memberName: "pipeline", definition: "a namespace holding 18 commands" },
    { memberName: "seat", definition: "a namespace holding 30 commands" },
    { memberName: "persona", definition: "a namespace holding 38 commands" },
    { memberName: "instructions", definition: "a namespace holding 42 commands" },
    { memberName: "temper", definition: "a namespace holding 74 commands" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The order is by how many commands a namespace holds, fewest first.",
    },
    {
      invariantKind: "departure",
      statement: "A command standing under no namespace is not on this list.",
    },
  ],
} as const satisfies List
