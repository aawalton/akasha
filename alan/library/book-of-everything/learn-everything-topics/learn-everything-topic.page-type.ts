import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Bites } from "./properties/bites.file-property.ts"
import type { Frontier } from "./properties/frontier.file-property.ts"
import type { Integration } from "./properties/integration.file-property.ts"
import type { Misconceptions } from "./properties/misconceptions.file-property.ts"
import type { TopicCalibration } from "./properties/topic-calibration.number-property.ts"
import type { TopicCalibrationRead } from "./properties/topic-calibration-read.text-property.ts"
import type { TopicCapture } from "./properties/topic-capture.record-property.ts"
import type { TopicEvidence } from "./properties/topic-evidence.file-property.ts"
import type { TopicMasteryLevel } from "./properties/topic-mastery-level.relation-property.ts"
import type { TopicNode } from "./properties/topic-node.text-property.ts"
import type { TopicPartOf } from "./properties/topic-part-of.relation-property.ts"
import type { TopicScoredOn } from "./properties/topic-scored-on.calendar-date-property.ts"
import type { TopicStatus } from "./properties/topic-status.select-property.ts"

export type LearnEverythingTopic = Page & {
  node: TopicNode
  masteryLevel: TopicMasteryLevel
  scoredOn: TopicScoredOn
  status: TopicStatus
  partOf?: TopicPartOf
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
  type: "page-type",
  slug: "learn-everything-topic",
  definition: "one subject in the map of all there is to know",
  pluralSlug: "learn-everything-topics",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/topic-scored-on",
    "computed-property/topic-coverage",
    "file-property/bites",
    "file-property/frontier",
    "file-property/integration",
    "file-property/misconceptions",
    "file-property/topic-evidence",
    "instant-property/capture-through-at",
    "number-property/capture-through-line",
    "number-property/topic-calibration",
    "record-property/topic-capture",
    "relation-property/topic-mastery-level",
    "relation-property/topic-part-of",
    "select-property/topic-status",
    "text-property/capture-source",
    "text-property/topic-calibration-read",
    "text-property/topic-node",
    "domain/learn-everything-topic-mastery",
  ],
  properties: [
    { pageProperty: "text-property/topic-node", required: true, many: false },
    {
      pageProperty: "relation-property/topic-mastery-level",
      required: true,
      many: false,
    },
    { pageProperty: "computed-property/topic-coverage", required: false, many: false },
    { pageProperty: "calendar-date-property/topic-scored-on", required: true, many: false },
    { pageProperty: "select-property/topic-status", required: true, many: false },
    {
      pageProperty: "relation-property/topic-part-of",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/topic-calibration", required: false, many: false },
    { pageProperty: "text-property/topic-calibration-read", required: false, many: false },
    { pageProperty: "record-property/topic-capture", required: false, many: false },
    { pageProperty: "file-property/frontier", required: false, many: false },
    { pageProperty: "file-property/integration", required: false, many: false },
    { pageProperty: "file-property/misconceptions", required: false, many: false },
    { pageProperty: "file-property/bites", required: false, many: false },
    { pageProperty: "file-property/topic-evidence", required: false, many: false },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every level of the map is a topic.",
    },
    {
      invariantKind: "departure",
      statement: "The whole of the map is a topic.",
    },
    {
      invariantKind: "departure",
      statement:
        "A topic's mastery level is judged by hand and its coverage worked out from beneath that topic.",
    },
    {
      invariantKind: "absence",
      statement: "A topic states no coverage of its own.",
    },

    {
      invariantKind: "departure",
      statement: "Each of a topic's five readings is a file beside the topic's page.",
    },
    {
      invariantKind: "absence",
      statement: "A reading nothing has been written into is no file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A topic named for the number that topic opens with is slugged for its page type first.",
    },
  ],
} as const satisfies PageType
