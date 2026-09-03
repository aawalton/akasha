import type { FileProperty } from "@akasha/pages-system/file-property"

export type TopicEvidence = "md"

export const topicEvidence = {
  id: "01a0659f-93da-700d-ae61-1d400bcdb7ff",
  pageTypeSlug: "file-property",
  slug: "topic-evidence",
  propertySlug: "topic-evidence",
  definition: "the probes of a topic Alan cleared and the ones he did not",
} as const satisfies FileProperty
