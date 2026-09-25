import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/trading-constants/trading-constants.module.code.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"

const LABEL_NAME = "TemperItemsListingsTraderInfo"
const TITLE_ACTIONS_NAME = "TemperItemsListingsBrowseFrameActions"

interface TraderKioskInfo {
  register: (this: void) => undefined
}

export function createTraderKioskInfo(this: void): TraderKioskInfo {
  return {
    register(): undefined {
      mountTraderInfo()
    },
  }
}

function mountTraderInfo(this: void): undefined {
  const ns = `${ADDON_NAME}_TraderInfo`
  const actions = WINDOW_MANAGER.GetControlByName<Control>(TITLE_ACTIONS_NAME)
  if (actions === undefined) return undefined
  const label = buildInfoLabel(actions)

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Open`,
    EVENT_OPEN_TRADING_HOUSE,
    function (this: void): undefined {
      const [, guildName] = GetCurrentTradingHouseGuildDetails()
      if (guildName === undefined || guildName === "") {
        label.SetHidden(true)
        return
      }
      label.SetText(`Trader owned by ${zo_strformat("<<1>>", guildName)}`)
      label.SetHidden(false)
    }
  )
  return undefined
}

function buildInfoLabel(this: void, actions: Control): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(LABEL_NAME, actions, CT_LABEL)
  label.SetAnchor(TOPRIGHT, actions, TOPRIGHT, 0, 0)
  label.SetAnchor(BOTTOMRIGHT, actions, BOTTOMRIGHT, 0, 0)
  label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  label.SetHidden(true)
  styleText(label, "muted")
  return label
}
