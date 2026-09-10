import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { Bites } from "./properties/bites.file-property.ts"
import type { Frontier } from "./properties/frontier.file-property.ts"
import type { Integration } from "./properties/integration.file-property.ts"
import type { Misconceptions } from "./properties/misconceptions.file-property.ts"
import type { TopicCalibration } from "./properties/topic-calibration.number-property.ts"
import type { TopicCalibrationRead } from "./properties/topic-calibration-read.text-property.ts"
import type { TopicCapture } from "./properties/topic-capture.record-property.ts"
import type { TopicCoverage } from "./properties/topic-coverage.computed-property.ts"
import type { TopicEvidence } from "./properties/topic-evidence.file-property.ts"
import type { TopicMasteryLevel } from "./properties/topic-mastery-level.relation-property.ts"
import type { TopicNode } from "./properties/topic-node.text-property.ts"
import type { TopicPartOf } from "./properties/topic-part-of.relation-property.ts"
import type { TopicScoredOn } from "./properties/topic-scored-on.calendar-date-property.ts"
import type { TopicStatus } from "./properties/topic-status.select-property.ts"

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
