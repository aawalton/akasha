import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const codeCachePath = {
  id: "01a0d968-4245-7a2e-ac67-d9510cb8df10",
  type: "page-type/text-property",
  slug: "code-cache-path",
  propertySlug: "cache-path",
  definition: "the directory on a node a pod keeps its checkout of the repository in",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The directory outlives the pod, so the next pod starts from the last checkout.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
