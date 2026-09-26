import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export type DecorateMillisecondsFunc = (this: void, ms: number) => string

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchInfoPanel {
    CountDownToTargetTime: (
      this: void,
      index: number,
      prefix: string,
      targetTime: number,
      scale?: number
    ) => void
    CountDownDuration: (
      this: void,
      index: number,
      prefix: string,
      durationMs: number,
      scale?: number
    ) => void
    StopCount: (this: void, index: number) => void
    CountDownHardStop: (
      this: void,
      index: number,
      prefix: string,
      durationMs: number,
      showTimer?: boolean
    ) => void
    CountDownDamageable: (this: void, durationSeconds: number, prefix?: string) => void
    StopDamageable: (this: void) => void
    CountUp: (
      this: void,
      index: number,
      prefix: string,
      scale?: number,
      decorateElapsedFunc?: DecorateMillisecondsFunc
    ) => void
  }
}

const IP = CRUTCH.InfoPanel

const PANEL_DAMAGEABLE_INDEX = 1

function decorateTimer(this: void, timer: number): string {
  if (timer > 60000) {
    const [formatted] = FormatTimeSeconds(timer / 1000, TIME_FORMAT_STYLE_COLONS)
    return formatted
  } else if (timer > 5000) {
    return string.format("%.0fs", timer / 1000)
  } else if (timer > 3000) {
    return string.format("|cffee00%.1fs|r", timer / 1000)
  } else {
    return string.format("|cff8c00%.1fs|r", timer / 1000)
  }
}

function decorateTimerDamageable(this: void, timer: number): string {
  if (timer > 60000) {
    const [formatted] = FormatTimeSeconds(timer / 1000, TIME_FORMAT_STYLE_COLONS)
    return formatted
  } else if (timer > 5000) {
    return string.format("|cffee00%.1fs|r", timer / 1000)
  } else if (timer > 3000) {
    return string.format("|cff8c00%.1fs|r", timer / 1000)
  } else {
    return string.format("|cff0000%.1fs|r", timer / 1000)
  }
}

function countDownTarget(
  this: void,
  index: number,
  prefix: string,
  doneText: string,
  targetTime: number,
  doneMs: number | undefined,
  scale: number | undefined,
  showTimer: boolean | undefined,
  decorateTimerFunc?: DecorateMillisecondsFunc
): undefined {
  const decorate = decorateTimerFunc ?? decorateTimer

  CRUTCH.RegisterUpdateListener("Panel" + index, function (this: void) {
    const timer = targetTime - GetGameTimeMilliseconds()
    if (timer > 0) {
      let text = prefix
      if (showTimer === true) {
        text = text + decorate(timer)
      }
      IP.SetLine(index, text, scale)
    } else if (doneMs === undefined) {
      IP.SetLine(index, doneText, scale)
    } else if (timer < -doneMs) {
      IP.StopCount(index)
    } else {
      IP.SetLine(index, doneText, scale)
    }
  })
}

function countDown(
  this: void,
  index: number,
  prefix: string,
  doneText: string,
  durationMs: number,
  doneMs: number | undefined,
  scale: number | undefined,
  showTimer: boolean | undefined,
  decorateTimerFunc?: DecorateMillisecondsFunc
): undefined {
  const targetTime = GetGameTimeMilliseconds() + durationMs
  countDownTarget(index, prefix, doneText, targetTime, doneMs, scale, showTimer, decorateTimerFunc)
}

IP.CountDownToTargetTime = function (this: void, index, prefix, targetTime, scale) {
  countDownTarget(index, prefix, prefix + "|cff8c00Soon™️|r", targetTime, undefined, scale, true)
}

IP.CountDownDuration = function (this: void, index, prefix, durationMs, scale) {
  countDown(index, prefix, prefix + "|cff8c00Soon™️|r", durationMs, undefined, scale, true)
}

IP.StopCount = function (this: void, index) {
  CRUTCH.UnregisterUpdateListener("Panel" + index)
  IP.RemoveLine(index)
}

IP.CountDownHardStop = function (this: void, index, prefix, durationMs, showTimer) {
  countDown(index, prefix, "", durationMs, 0, undefined, showTimer)
}

IP.CountDownDamageable = function (this: void, durationSeconds, prefix) {
  countDown(
    PANEL_DAMAGEABLE_INDEX,
    prefix ?? "Boss in ",
    "|c0fff43Fire the nailguns!|r",
    durationSeconds * 1000,
    1000,
    undefined,
    true,
    decorateTimerDamageable
  )
}

IP.StopDamageable = function (this: void) {
  IP.StopCount(PANEL_DAMAGEABLE_INDEX)
}

function decorateElapsed(this: void, ms: number): string {
  const [formatted] = FormatTimeSeconds(ms / 1000, TIME_FORMAT_STYLE_COLONS)
  return formatted
}

IP.CountUp = function (this: void, index, prefix, scale, decorateElapsedFunc) {
  const startTime = GetGameTimeMilliseconds()
  const decorate = decorateElapsedFunc ?? decorateElapsed

  CRUTCH.RegisterUpdateListener("Panel" + index, function (this: void) {
    const elapsed = GetGameTimeMilliseconds() - startTime
    IP.SetLine(index, prefix + decorate(elapsed), scale)
  })
}
