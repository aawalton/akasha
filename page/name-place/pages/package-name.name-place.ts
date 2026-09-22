import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const packageName = {
  id: "01a04fed-2fc1-7a67-b2fe-8402f52dd5c8",
  type: "page-type/name-place",
  slug: "package-name",
  definition: "a package's name",
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A package name with no scope is one slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A package name with a scope is that scope and a slug parted by a slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope opens with an at sign.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The at sign is the registry's mark rather than a part of either name.",
    },
  ],
} as const satisfies NamePlace
