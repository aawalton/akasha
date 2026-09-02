import {
  BUCKET_SIZE,
  COMBAT_MODIFIER,
  DEFAULT_MODIFIER,
  FILL_RATE,
  RESOLUTION,
  SAFETY_THRESHOLD,
  TIME_FRAME,
} from "../map-ping-constants/map-ping-constants.module.code.ts"
import type {
  LeakyBucketClass,
  LeakyBucketInstance,
} from "../map-ping-types/map-ping-types.module.code.ts"
import { RollingAverage } from "../ping-rolling-average/ping-rolling-average.module.code.ts"

const LeakyBucket = ZO_Object.Subclass<LeakyBucketClass>()

LeakyBucket.New = function (this: LeakyBucketClass) {
  const obj = ZO_Object.New<LeakyBucketInstance>(this)
  obj.Initialize()
  return obj
}

LeakyBucket.Initialize = function (this: LeakyBucketInstance): undefined {
  this.average = RollingAverage.New(TIME_FRAME, RESOLUTION)
  this.size = BUCKET_SIZE
  this.generatedTokens = 1 / FILL_RATE
  this.safetyThreshold = SAFETY_THRESHOLD

  this.left = this.size
  this.lastCheck = GetGameTimeMilliseconds()
}

LeakyBucket.GetTokensLeft = function (this: LeakyBucketInstance): number {
  const now = GetGameTimeMilliseconds()
  const average = this.average.GetAverage()
  const modifier = IsUnitInCombat("player") ? COMBAT_MODIFIER : DEFAULT_MODIFIER
  const burstRate = average * modifier
  void burstRate

  const delta = (now - this.lastCheck) / 1000
  this.left = math.min(this.left + delta * this.generatedTokens, this.size)
  this.lastCheck = now
  return this.left
}

LeakyBucket.HasTokensLeft = function (this: LeakyBucketInstance): boolean {
  return this.GetTokensLeft() > this.safetyThreshold
}

LeakyBucket.Take = function (this: LeakyBucketInstance): boolean {
  if (this.HasTokensLeft()) {
    this.left = this.left - 1
    this.average.Increment()
    return true
  }
  return false
}

export { LeakyBucket }
