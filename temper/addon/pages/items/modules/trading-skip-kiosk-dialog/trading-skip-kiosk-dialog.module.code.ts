import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/trading-constants/trading-constants.module.code.ts"

interface SkipKioskDialog {
  register: (this: void) => undefined
}

export function createSkipKioskDialog(this: void): SkipKioskDialog {
  return {
    register(): undefined {
      EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}_SkipKiosk`, EVENT_CHATTER_BEGIN, onChatterBegin)
    },
  }
}

export function kioskPick(
  this: void,
  optionTypes: readonly number[],
  tradingHouse: number,
  otherServices: readonly number[]
): number | undefined {
  let pick: number | undefined
  for (let i = 0; i < optionTypes.length; i++) {
    const optionType = optionTypes[i]
    if (optionType === undefined) continue
    if (otherServices.indexOf(optionType) !== -1) return undefined
    if (pick === undefined && optionType === tradingHouse) pick = i + 1
  }
  return pick
}

function onChatterBegin(this: void, _eventCode: number, chatterOptionCount: number): undefined {
  const optionTypes: number[] = []
  for (let i = 1; i <= chatterOptionCount; i++) {
    const [, optionType] = GetChatterOption(i)
    optionTypes.push(optionType)
  }
  const pick = kioskPick(optionTypes, CHATTER_START_TRADINGHOUSE, [
    CHATTER_START_BANK,
    CHATTER_START_GUILDBANK,
  ])
  if (pick !== undefined) SelectChatterOption(pick)
}
