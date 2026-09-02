import { internal } from "../histoire-state/histoire-state.module.code.ts"

const ROLLING_AVERAGE_INTERVAL = 10
const MIN_DATA_COUNT = 2
const CURRENT_SPEED_WEIGHT = 0.1

export interface PerformanceTrackerInstance {
  processingSpeed: number
  lastEventCountSlot: number
  processedEventCount: Record<number, number>
  slotStartTime: Record<number, number>
  slotEndTime: Record<number, number>
  Initialize: (this: PerformanceTrackerInstance) => void
  Reset: (this: PerformanceTrackerInstance) => void
  Increment: (this: PerformanceTrackerInstance) => void
  PrepareNextSlot: (this: PerformanceTrackerInstance, slot: number, now: number) => void
  GetProcessingSpeedAndEstimatedTimeLeft: (
    this: PerformanceTrackerInstance,
    count: number
  ) => LuaMultiReturn<[number, number]>
}

export interface PerformanceTrackerClass extends PerformanceTrackerInstance {
  New: (this: PerformanceTrackerClass) => PerformanceTrackerInstance
}

const PerformanceTracker = ZO_InitializingObject.Subclass<PerformanceTrackerClass>()
internal.class.PerformanceTracker = PerformanceTracker

PerformanceTracker.Initialize = function (this) {
  this.Reset()
}

PerformanceTracker.Reset = function (this) {
  this.processingSpeed = -1
  this.lastEventCountSlot = -1
  this.processedEventCount = {}
  this.slotStartTime = {}
  this.slotEndTime = {}
}

PerformanceTracker.Increment = function (this) {
  const slot = GetTimeStamp() % ROLLING_AVERAGE_INTERVAL
  const now = GetGameTimeMilliseconds()
  this.slotEndTime[slot] = now
  if (slot !== this.lastEventCountSlot) {
    this.PrepareNextSlot(slot, now)
  }
  this.processedEventCount[slot] = (this.processedEventCount[slot] ?? 0) + 1
}

PerformanceTracker.PrepareNextSlot = function (this, slot, now) {
  this.processedEventCount[slot] = 0
  this.slotStartTime[slot] = now
  this.lastEventCountSlot = slot

  let currentSpeed = 0
  let count = 0
  for (const i of $range(0, ROLLING_AVERAGE_INTERVAL - 1)) {
    const processed = this.processedEventCount[i]
    if (processed != null) {
      const deltaMs = (this.slotEndTime[i] ?? 0) - (this.slotStartTime[i] ?? 0)
      if (deltaMs > 0) {
        currentSpeed = currentSpeed + processed / deltaMs
        count = count + 1
      }
    }
  }

  if (count > MIN_DATA_COUNT) {
    currentSpeed = (currentSpeed * 1000) / count

    if (this.processingSpeed < 0) {
      this.processingSpeed = currentSpeed
    } else {
      this.processingSpeed =
        this.processingSpeed * (1 - CURRENT_SPEED_WEIGHT) + currentSpeed * CURRENT_SPEED_WEIGHT
    }
  } else {
    this.processingSpeed = -1
  }
}

PerformanceTracker.GetProcessingSpeedAndEstimatedTimeLeft = function (this, count) {
  const speed = this.processingSpeed

  let time = 0
  if (speed > 0) {
    time = count / speed
  } else if (count > 0) {
    time = -1
  }

  return $multi(speed, time)
}
