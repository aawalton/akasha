import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

function unlockUI(this: void, value: boolean): undefined {
  CRUTCH.unlock = value
  TemperCombatAlertsContainer.SetMovable(value)
  TemperCombatAlertsContainer.SetMouseEnabled(value)
  TemperCombatAlertsContainerBackdrop.SetHidden(!value)
  if (value) {
    CRUTCH.DisplayNotification(47898, "Example Alert", 5000, 0, 0, 0, 0, 0, 0, 0, false)
  }

  TemperCombatAlertsDamageable.SetMovable(value)
  TemperCombatAlertsDamageable.SetMouseEnabled(value)
  TemperCombatAlertsDamageableBackdrop.SetHidden(!value)
  TemperCombatAlertsDamageableLabel.SetHidden(!value)
  if (value) {
    CRUTCH.DisplayDamageable(10)
  }

  TemperCombatAlertsCloudrest.SetMovable(value)
  TemperCombatAlertsCloudrest.SetMouseEnabled(value)
  TemperCombatAlertsCloudrestBackdrop.SetHidden(!value)
  if (value) {
    CRUTCH.UpdateSpearsDisplay(3, 2, 1)
  } else {
    CRUTCH.UpdateSpearsDisplay(0, 0, 0)
  }

  TemperCombatAlertsBossHealthBarContainer.SetMovable(value)
  TemperCombatAlertsBossHealthBarContainer.SetMouseEnabled(value)
  if (value && CRUTCH.savedOptions.bossHealthBar.enabled) {
    CRUTCH.BossHealthBar.ShowOrHideBars(true, false)
    TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
  } else {
    CRUTCH.BossHealthBar.ShowOrHideBars()
  }

  TemperCombatAlertsCausticCarrion.SetMovable(value)
  TemperCombatAlertsCausticCarrion.SetMouseEnabled(value)
  TemperCombatAlertsCausticCarrion.SetHidden(!value)

  TemperCombatAlertsMawOfLorkhaj.SetMovable(value)
  TemperCombatAlertsMawOfLorkhaj.SetMouseEnabled(value)
  TemperCombatAlertsMawOfLorkhaj.SetHidden(!value)

  TemperCombatAlertsInfoPanel.SetMovable(value)
  TemperCombatAlertsInfoPanel.SetMouseEnabled(value)
  if (value) {
    TemperCombatAlertsInfoPanel.SetHidden(false)
    CRUTCH.InfoPanel.SetLine(998, "Info Panel Line 1")
    CRUTCH.InfoPanel.CountDownDuration(999, "Portal 1: ", 10000)
  } else {
    CRUTCH.InfoPanel.RemoveLine(998)
    CRUTCH.InfoPanel.StopCount(999)
  }

  const showMin = value && CRUTCH.savedOptions.cc.showVisual
  TemperCombatAlertsCCUIMin.SetMouseEnabled(showMin)
  TemperCombatAlertsCCUIMin.SetHidden(!showMin)
  const showObnoxious = value && CRUTCH.savedOptions.cc.showObnoxious
  TemperCombatAlertsCCUIObnoxious.SetMouseEnabled(showObnoxious)
  TemperCombatAlertsCCUIObnoxious.SetHidden(!showObnoxious)
  if (showMin || showObnoxious) {
    CRUTCH.ShowCCProgressAll(85214, ACTION_RESULT_STUNNED, 10000, "Kimbrudhil the Songbird")
  }
}

CRUTCH.UnlockUI = unlockUI
