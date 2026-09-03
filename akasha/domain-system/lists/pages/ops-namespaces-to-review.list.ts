import type { List } from "../list.page-type.ts"

export const opsNamespacesToReview = {
  id: "01a06869-a968-77ce-b7d5-7efdceac7ed7",
  pageTypeSlug: "list",
  slug: "ops-namespaces-to-review",
  definition: "the ops namespaces holding a command nobody has ruled on",
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
  members: [
    { memberName: "service", definition: "3 commands" },
    { memberName: "tower", definition: "8 commands" },
    { memberName: "pipeline", definition: "18 commands" },
    { memberName: "seat", definition: "30 commands" },
    { memberName: "persona", definition: "38 commands" },
    { memberName: "instructions", definition: "42 commands" },
    { memberName: "temper", definition: "74 commands" },
  ],
} as const satisfies List
