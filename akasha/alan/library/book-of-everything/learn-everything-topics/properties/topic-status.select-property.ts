import type { SelectProperty } from "@akasha/pages-system/select-property"

export const topicStatus = {
  id: "01a0659f-93da-700e-8f73-3b64e5c806d5",
  pageTypeSlug: "select-property",
  slug: "topic-status",
  propertySlug: "status",
  definition: "whether a topic is unopened, live or resting",
  values: ["unopened", "live", "resting"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic nobody has yet sat down with is `unopened`.",
    },
    {
      invariantKind: "departure",
      statement: "A topic worked and left warm is `resting`.",
    },
  ],
} as const satisfies SelectProperty

export type TopicStatus = (typeof topicStatus.values)[number]
