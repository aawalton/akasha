import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const topicStatus = {
  id: "01a0659f-93da-700e-8f73-3b64e5c806d5",
  type: "page-type/select-property",
  slug: "topic-status",
  propertySlug: "status",
  definition: "whether a topic is new or open or idle",
  values: ["unopened", "live", "resting"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic nobody has yet sat down with is `unopened`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic worked and left warm is `resting`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:55:52.026Z",
  updatedAt: "2026-10-30T16:41:40.618Z",
} as const satisfies SelectProperty
