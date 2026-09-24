import type { EndedAt } from "akasha/alan/track/daily/day/properties/health-samples/properties/ended-at.instant-property.types.ts"
import type { StartedAt } from "akasha/alan/track/daily/day/properties/health-samples/properties/started-at.instant-property.types.ts"
import type { SafetyLevel } from "akasha/alan/track/daily/day/properties/safety-level.text-property.types.ts"
import type { AssertedAt } from "akasha/alan/track/daily/day/properties/sessions/properties/asserted-at.instant-property.types.ts"
import type { BreathingSets } from "akasha/alan/track/daily/day/properties/sessions/properties/breathing-sets.number-property.types.ts"
import type { CapacityRate } from "akasha/alan/track/daily/day/properties/sessions/properties/capacity-rate.number-property.types.ts"
import type { DailyTracking } from "akasha/alan/track/daily/day/properties/sessions/properties/daily-tracking.relation-property.types.ts"
import type { DifficultyLevel } from "akasha/alan/track/daily/day/properties/sessions/properties/difficulty-level.text-property.types.ts"
import type { Relationships } from "akasha/alan/track/daily/day/properties/sessions/properties/relationships.multi-relation-property.types.ts"
import type { SessionOwner } from "akasha/alan/track/daily/day/properties/sessions/properties/session-owner.relation-property.types.ts"
import type { Version } from "akasha/alan/track/daily/day/properties/version.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Sessions = "jsonl"

export type SessionsRow = {
  id: Id
  title: Title
  startedAt: StartedAt
  endedAt?: EndedAt
  dailyTracking: DailyTracking
  safetyLevel?: SafetyLevel
  difficultyLevel?: DifficultyLevel
  version?: Version
  capacityRate?: CapacityRate
  relationships?: Relationships
  assertedAt?: AssertedAt
  owner?: SessionOwner
  breathingSets?: BreathingSets
}
