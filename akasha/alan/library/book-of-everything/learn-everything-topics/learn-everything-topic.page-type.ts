import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Bites } from "./properties/bites.file-property.ts"
import type { Frontier } from "./properties/frontier.file-property.ts"
import type { Integration } from "./properties/integration.file-property.ts"
import type { Misconceptions } from "./properties/misconceptions.file-property.ts"
import type { TopicCalibration } from "./properties/topic-calibration.number-property.ts"
import type { TopicCalibrationRead } from "./properties/topic-calibration-read.text-property.ts"
import type { TopicCapture } from "./properties/topic-capture.record-property.ts"
import type { TopicCoverage } from "./properties/topic-coverage.number-property.ts"
import type { TopicDepth } from "./properties/topic-depth.number-property.ts"
import type { TopicEvidence } from "./properties/topic-evidence.file-property.ts"
import type { TopicNode } from "./properties/topic-node.text-property.ts"
import type { TopicPartOfSlugs } from "./properties/topic-part-of-slugs.relation-property.ts"
import type { TopicScoredOn } from "./properties/topic-scored-on.calendar-date-property.ts"
import type { TopicStatus } from "./properties/topic-status.select-property.ts"

export type LearnEverythingTopic = Page & {
  node: TopicNode
  depth: TopicDepth
  coverage: TopicCoverage
  scoredOn: TopicScoredOn
  status: TopicStatus
  partOfSlugs?: TopicPartOfSlugs
  calibration?: TopicCalibration
  calibrationRead?: TopicCalibrationRead
  capture?: TopicCapture
  frontier?: Frontier
  integration?: Integration
  misconceptions?: Misconceptions
  bites?: Bites
  topicEvidence?: TopicEvidence
}

export const learnEverythingTopic = {
  id: "01a0659f-93da-7011-b26e-605cb6f32b8f",
  pageTypeSlug: "page-type",
  slug: "learn-everything-topic",
  definition: "one subject in the map of all there is to know",
  pluralSlug: "learn-everything-topics",
  extendsSlug: "page-type/page",
  partSlugs: [
    "calendar-date-property/topic-scored-on",
    "file-property/bites",
    "file-property/frontier",
    "file-property/integration",
    "file-property/misconceptions",
    "file-property/topic-evidence",
    "instant-property/capture-through-at",
    "number-property/capture-through-line",
    "number-property/topic-calibration",
    "number-property/topic-coverage",
    "number-property/topic-depth",
    "record-property/topic-capture",
    "relation-property/topic-part-of-slugs",
    "select-property/topic-status",
    "text-property/capture-source",
    "text-property/topic-calibration-read",
    "text-property/topic-node",
    "domain/learn-everything-topic-mastery",
  ],
  properties: [
    { pagePropertySlug: "topic-node", required: true, many: false },
    { pagePropertySlug: "topic-depth", required: true, many: false },
    { pagePropertySlug: "topic-coverage", required: true, many: false },
    { pagePropertySlug: "topic-scored-on", required: true, many: false },
    { pagePropertySlug: "topic-status", required: true, many: false },
    { pagePropertySlug: "topic-part-of-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "topic-calibration", required: false, many: false },
    { pagePropertySlug: "topic-calibration-read", required: false, many: false },
    { pagePropertySlug: "topic-capture", required: false, many: false },
    { pagePropertySlug: "frontier", required: false, many: false },
    { pagePropertySlug: "integration", required: false, many: false },
    { pagePropertySlug: "misconceptions", required: false, many: false },
    { pagePropertySlug: "bites", required: false, many: false },
    { pagePropertySlug: "topic-evidence", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every level of the map is a topic, the whole of it included.",
    },
    {
      invariantKind: "departure",
      statement: "A topic's depth is judged by hand and its coverage worked out from beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "A topic names the topic it sits under and sits in that topic's folder.",
    },
    {
      invariantKind: "departure",
      statement: "Each of a topic's five readings is a file beside the topic's page.",
    },
    {
      invariantKind: "absence",
      statement: "A reading nothing has been written into stands as no file.",
    },
    {
      invariantKind: "departure",
      statement: "A topic named for the number it opens with is slugged for its page type first.",
    },
  ],
} as const satisfies PageType
