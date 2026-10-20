import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const FOLLOW_UP_MS = 1_500

const SETTLE_MS = 1_000

const RUN_MS = 120_000

const SETTLE_UPDATE = ADDON_NAME + "_ReportedStatsSettle"

export type Bar = "frontBar" | "backBar"

type Unsettled = {
  readonly bar: Bar
  readonly buildHash: string
  readonly said: string
  readonly since: number
  readonly runSince: number
}

let unsettled: Unsettled | undefined

const ELDER_DRAGON_RANKS: ReadonlySet<number> = new Set([29460, 44951])

let healthLast: number | undefined

let healthAtCaptureBefore: number | undefined

export function healthSaid(passives: readonly { abilityId: number }[], health: number): string {
  healthAtCaptureBefore = healthLast
  healthLast = health
  const held = passives.some((passive) => ELDER_DRAGON_RANKS.has(passive.abilityId))
  return held ? `|health:${health}` : ""
}

export function healthBefore(): number | undefined {
  return healthAtCaptureBefore
}

function settleLater(retake: (this: void) => undefined): undefined {
  EVENT_MANAGER.UnregisterForUpdate(SETTLE_UPDATE)
  EVENT_MANAGER.RegisterForUpdate(SETTLE_UPDATE, FOLLOW_UP_MS, function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(SETTLE_UPDATE)
    retake()
  })
}

export function settled(
  bar: Bar,
  buildHash: string,
  said: string,
  followUp: boolean,
  retake: (this: void) => undefined
): boolean {
  const now = GetGameTimeMilliseconds()
  const before = unsettled
  if (before?.bar === bar && before.buildHash === buildHash && before.said === said) {
    if (now - before.since >= SETTLE_MS) {
      EVENT_MANAGER.UnregisterForUpdate(SETTLE_UPDATE)
      unsettled = undefined
      return true
    }
    settleLater(retake)
    return false
  }
  const runSince = followUp && before !== undefined ? before.runSince : now
  if (now - runSince >= RUN_MS) {
    unsettled = undefined
    return false
  }
  unsettled = { bar, buildHash, said, since: now, runSince }
  settleLater(retake)
  return false
}
