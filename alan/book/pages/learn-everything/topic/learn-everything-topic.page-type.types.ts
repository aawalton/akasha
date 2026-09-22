import type { Bites } from "akasha/alan/book/pages/learn-everything/topic/properties/bites.file-property.types.ts"
import type { Frontier } from "akasha/alan/book/pages/learn-everything/topic/properties/frontier.file-property.types.ts"
import type { Integration } from "akasha/alan/book/pages/learn-everything/topic/properties/integration.file-property.types.ts"
import type { Misconceptions } from "akasha/alan/book/pages/learn-everything/topic/properties/misconceptions.file-property.types.ts"
import type { TopicCalibration } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-calibration.number-property.types.ts"
import type { TopicCalibrationRead } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-calibration-read.text-property.types.ts"
import type { TopicCapture } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-capture.record-property.types.ts"
import type { TopicCoverage } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-coverage.computed-property.types.ts"
import type { TopicEvidence } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-evidence.file-property.types.ts"
import type { TopicMasteryLevel } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-mastery-level.relation-property.types.ts"
import type { TopicNode } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-node.text-property.types.ts"
import type { TopicPartOf } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-part-of.multi-relation-property.types.ts"
import type { TopicScoredOn } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-scored-on.calendar-date-property.types.ts"
import type { TopicStatus } from "akasha/alan/book/pages/learn-everything/topic/properties/topic-status.select-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type LearnEverythingTopic = Page & {
  node: TopicNode
  masteryLevel: TopicMasteryLevel
  coverage?: TopicCoverage
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
