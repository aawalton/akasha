import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import {
  CRUTCH,
  type CrutchStyle,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const KEYBOARD_STYLE: CrutchStyle = {
  GetAlertFont: function (this: void, size) {
    return string.format("$(BOLD_FONT)|%d|soft-shadow-thick", math.floor(size))
  },
  GetDamageableFont: function (this: void, size) {
    return string.format("$(BOLD_FONT)|%d|soft-shadow-thick", math.floor(size))
  },
  prominentFont: "$(BOLD_FONT)|80|soft-shadow-thick",
  GetBHBFont: function (this: void, size) {
    return string.format("$(BOLD_FONT)|%d|shadow", math.floor(size))
  },
  GetMarkerFont: function (this: void, size) {
    return string.format("$(BOLD_FONT)|%d|thick-outline", math.floor(size))
  },
  GetInfoPanelFont: function (this: void, size) {
    return string.format("$(BOLD_FONT)|%d|soft-shadow-thick", math.floor(size))
  },
}

CRUTCH.GetStyles = function (this: void) {
  return KEYBOARD_STYLE
}

let initialized = false

CRUTCH.InitializeStyles = function (this: void) {
  if (initialized) {
    CRUTCH.dbgOther("|cFF0000InitializeStyle called twice?!|r")
    return
  }
  initialized = true

  CRUTCH.BossHealthBar.UpdateScale(false)
  CRUTCH.InfoPanel.ApplyStyle(KEYBOARD_STYLE)
}
