import type { Bites } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/bites.file-property.types.ts"
import type { Frontier } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/frontier.file-property.types.ts"
import type { Integration } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/integration.file-property.types.ts"
import type { Misconceptions } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/misconceptions.file-property.types.ts"
import type { TopicCalibration } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-calibration.number-property.types.ts"
import type { TopicCalibrationRead } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-calibration-read.text-property.types.ts"
import type { TopicCapture } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-capture.record-property.types.ts"
import type { TopicCoverage } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-coverage.computed-property.types.ts"
import type { TopicEvidence } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-evidence.file-property.types.ts"
import type { TopicMasteryLevel } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-mastery-level.relation-property.types.ts"
import type { TopicNode } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-node.text-property.types.ts"
import type { TopicPartOf } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-part-of.relation-property.types.ts"
import type { TopicScoredOn } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-scored-on.calendar-date-property.types.ts"
import type { TopicStatus } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-status.select-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

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
