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

function onChatterBegin(this: void, _eventCode: number, chatterOptionCount: number): undefined {
  for (let i = 1; i <= chatterOptionCount; i++) {
    const [, optionType] = GetChatterOption(i)
    if (optionType === CHATTER_START_TRADINGHOUSE) {
      SelectChatterOption(i)
      return
    }
  }
}
