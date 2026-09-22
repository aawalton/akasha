import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

import {
  GREEN,
  RED,
} from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import { recordNetWorthScanMs } from "akasha/temper/addon/pages/items/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import { getInventoryConfig } from "akasha/temper/addon/pages/items/modules/inventory-config/inventory-config.module.code.ts"
import { computeLiveNetWorth } from "akasha/temper/addon/pages/items/modules/inventory-live-net-worth/inventory-live-net-worth.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  applyBurstChange,
  type BurstState,
  burstAlpha,
  EMPTY_BURST,
  formatBagSlots,
  formatSignedGold,
  isBurstVisible,
} from "akasha/temper/addon/pages/items/modules/inventory-session-tracking/inventory-session-tracking.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

interface HudCell {
  text: string
  color?: readonly [number, number, number]
  alpha?: number
}

const GAIN_COLOR = GREEN
const LOSS_COLOR = RED

let lastKnownNetWorth = 0
let burst: BurstState = EMPTY_BURST

function currentNetWorth(): number {
  const cfg = getInventoryConfig()
  return computeLiveNetWorth(getSavedVariables().db, cfg.currencyRates, cfg.crownReplacementCosts)
}

export function resetSession(): undefined {
  const sv = getSavedVariables()
  sv.session = {
    startTime: GetTimeStamp(),
    startNetWorth: currentNetWorth(),
    startCharId: tostring(GetCurrentCharacterId()),
  }
  lastKnownNetWorth = sv.session.startNetWorth
  burst = EMPTY_BURST
  globalThis.Temper?.refresh()
}

export function reseedNetWorthBaseline(): undefined {
  lastKnownNetWorth = currentNetWorth()
}

export function recomputeNetWorthAndUpdateHud(): undefined {
  const scanStart = GetGameTimeMilliseconds()
  const current = currentNetWorth()
  recordNetWorthScanMs(GetGameTimeMilliseconds() - scanStart)
  const change = current - lastKnownNetWorth
  lastKnownNetWorth = current
  if (change !== 0) burst = applyBurstChange(burst, change, GetTimeStamp())
  globalThis.Temper?.refresh()
}

function bagCell(): HudCell {
  return { text: formatBagSlots(GetNumBagUsedSlots(BAG_BACKPACK), GetBagSize(BAG_BACKPACK)) }
}

function netWorthDeltaCell(): HudCell {
  const sv = getSavedVariables()
  const delta = lastKnownNetWorth - sv.session.startNetWorth
  const color = delta < 0 ? LOSS_COLOR : GAIN_COLOR
  return { text: formatSignedGold(delta), color }
}

function burstCell(): HudCell {
  const now = GetTimeStamp()
  if (!isBurstVisible(burst, now)) return { text: "" }
  const color = burst.amount < 0 ? LOSS_COLOR : GAIN_COLOR
  return { text: formatSignedGold(burst.amount), color, alpha: burstAlpha(burst, now) }
}

export function registerHudFields(): undefined {
  if (getSavedVariables().session.startTime === 0) resetSession()
  lastKnownNetWorth = currentNetWorth()
  globalThis.Temper?.registerField({
    id: "inventory:bag",
    order: 40,
    compute: bagCell,
  })
  globalThis.Temper?.registerField({
    id: "inventory:networth",
    order: 50,
    compute: netWorthDeltaCell,
  })
  globalThis.Temper?.registerField({
    id: "inventory:burst",
    order: 60,
    compute: burstCell,
  })
}
