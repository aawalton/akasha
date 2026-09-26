import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-panels/declarations/combat-alerts-panels-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    ShowCCProgressAll: (
      this: void,
      abilityId: number,
      result: number,
      duration: number,
      sourceName: string
    ) => void
    OnHardCCed: (
      this: void,
      abilityId: number,
      result: number,
      duration: number,
      sourceName: string
    ) => void
    OnStunned: (this: void) => void
    OnNotStunned: (this: void) => void
    InitializeCCUI: (this: void) => void
  }
}

const CC_DISPLAY: Record<number, string> = {
  [ACTION_RESULT_DISORIENTED]: "Disoriented",
  [ACTION_RESULT_LEVITATED]: "Levitated",
  [ACTION_RESULT_CHARMED]: "Charmed",
  [ACTION_RESULT_FEARED]: "Feared",
  [ACTION_RESULT_STUNNED]: "Stunned",
}

let jetsDisplaying = 0

function hideJets(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "HideJets")
  jetsDisplaying = 0
  TemperCombatAlertsCCJetRight.SetHidden(true)
  TemperCombatAlertsCCJetLeft.SetHidden(true)
}

const FLIGHT_DURATION = 6000

function leaveOnAJetPlane(
  this: void,
  abilityId: number,
  result: number,
  _duration: number,
  _sourceName: string
): undefined {
  if (jetsDisplaying !== 1) {
    const text = zo_strformat(
      "<<1>> by <<2>>!",
      string.upper(CC_DISPLAY[result] as string),
      GetAbilityName(abilityId)
    )

    const yOffset = GuiRoot.GetHeight() / 3

    const jetRight = TemperCombatAlertsCCJetRight
    jetRight.ClearAnchors()
    jetRight.SetTransformRotationZ(0)
    jetRight.SetAnchor(RIGHT, TemperCombatAlertsCC, LEFT, -100, -yOffset)
    TemperCombatAlertsCCJetRightLabel.SetText(text)
    jetRight.SetHidden(false)
    jetRight.slide.SetDuration(FLIGHT_DURATION)
    jetRight.slide.SetDeltaOffsetX(GuiRoot.GetWidth() + 800)
    jetRight.slide.SetDeltaOffsetY(0)
    jetRight.slideAnimation.PlayFromStart()

    const jetLeft = TemperCombatAlertsCCJetLeft
    jetLeft.ClearAnchors()
    jetLeft.SetTransformRotationZ(0)
    jetLeft.SetAnchor(LEFT, TemperCombatAlertsCC, RIGHT, 100, yOffset)
    TemperCombatAlertsCCJetLeftLabel.SetText(text)
    jetLeft.SetHidden(false)
    jetLeft.slide.SetDuration(FLIGHT_DURATION)
    jetLeft.slide.SetDeltaOffsetX(-GuiRoot.GetWidth() - 800)
    jetLeft.slide.SetDeltaOffsetY(0)
    jetLeft.slideAnimation.PlayFromStart()

    jetsDisplaying = 1
  }

  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "HideJets", FLIGHT_DURATION, hideJets)
}

const YEET_DURATION = 1000

function jettison(this: void): undefined {
  if (jetsDisplaying !== 1) return

  jetsDisplaying = 2

  const jetRight = TemperCombatAlertsCCJetRight
  jetRight.SetTransformRotationZ(math.rad(30))
  jetRight.slide.SetDuration(YEET_DURATION)
  jetRight.slide.SetDeltaOffsetX(GuiRoot.GetWidth() / 4)
  jetRight.slide.SetDeltaOffsetY(-GuiRoot.GetWidth() / 2)
  jetRight.slideAnimation.PlayFromStart()

  const jetLeft = TemperCombatAlertsCCJetLeft
  jetLeft.SetTransformRotationZ(math.rad(30))
  jetLeft.slide.SetDuration(YEET_DURATION)
  jetLeft.slide.SetDeltaOffsetX(-GuiRoot.GetWidth() / 4)
  jetLeft.slide.SetDeltaOffsetY(GuiRoot.GetWidth() / 2)
  jetLeft.slideAnimation.PlayFromStart()

  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "HideJets", YEET_DURATION, hideJets)
}

function hideCCProgress(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "HideCC")
  TemperCombatAlertsCCUIMin.SetHidden(true)
  TemperCombatAlertsCCUIObnoxious.SetHidden(true)
  CRUTCH.UnregisterUpdateListener("CCDuration")
}

function showCCProgress(
  this: void,
  control: Control,
  abilityId: number,
  result: number,
  duration: number,
  sourceName: string
): undefined {
  ;(control.GetNamedChild<LabelControl>("Type") as LabelControl).SetText(
    string.upper(CC_DISPLAY[result] as string)
  )
  ;(control.GetNamedChild<LabelControl>("Ability") as LabelControl).SetText(
    zo_strformat("<<1>>", GetAbilityName(abilityId))
  )
  ;(control.GetNamedChild<TextureControl>("Icon") as TextureControl).SetTexture(
    GetAbilityIcon(abilityId)
  )
  const source = control.GetNamedChild<LabelControl>("Source")
  if (source !== undefined) {
    source.SetText(zo_strformat("<<1>>", sourceName))
  }

  control.SetHidden(false)
  ;(control.GetNamedChild<CooldownControl>("Radial") as CooldownControl).StartCooldown(
    duration,
    duration,
    CD_TYPE_RADIAL,
    CD_TIME_TYPE_TIME_UNTIL,
    false
  )
}

function showCCProgressAll(
  this: void,
  abilityId: number,
  result: number,
  duration: number,
  sourceName: string
): undefined {
  let enabled = false
  if (CRUTCH.savedOptions.cc.showVisual) {
    enabled = true
    showCCProgress(TemperCombatAlertsCCUIMin, abilityId, result, duration, sourceName)
  }
  if (CRUTCH.savedOptions.cc.showObnoxious) {
    enabled = true
    showCCProgress(TemperCombatAlertsCCUIObnoxious, abilityId, result, duration, sourceName)
  }

  if (!enabled) return

  const targetTime = GetGameTimeMilliseconds() + duration
  CRUTCH.RegisterUpdateListener("CCDuration", function (this: void) {
    let remaining = targetTime - GetGameTimeMilliseconds()
    if (remaining < 0) remaining = 0
    const timeString = string.format("%.1f", remaining / 1000)
    TemperCombatAlertsCCUIMinNumber.SetText(timeString)
    TemperCombatAlertsCCUIObnoxiousNumber.SetText(timeString)
  })

  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "HideCC", duration, hideCCProgress)
}

CRUTCH.ShowCCProgressAll = showCCProgressAll

CRUTCH.OnHardCCed = function (this: void, abilityId, result, duration, sourceName) {
  if (CRUTCH.savedOptions.cc.showChat) {
    CRUTCH.msg(
      zo_strformat(
        "|c00FFFF<<1>> |cAAAAAAby |c00FFFF<<2>>|r|cAAAAAA's |c00FFFF<<3>> |cAAAAAA(<<4>>) for <<5>>ms",
        CC_DISPLAY[result],
        sourceName,
        GetAbilityName(abilityId),
        abilityId,
        duration
      )
    )
  }

  if (CRUTCH.savedOptions.cc.jet) {
    leaveOnAJetPlane(abilityId, result, duration, sourceName)
  }

  showCCProgressAll(abilityId, result, duration, sourceName)
}

CRUTCH.OnStunned = function (this: void) {}

CRUTCH.OnNotStunned = function (this: void) {
  if (CRUTCH.savedOptions.cc.jet) {
    jettison()
  }

  hideCCProgress()
}

CRUTCH.InitializeCCUI = function (this: void) {
  TemperCombatAlertsCCUIMin.ClearAnchors()
  TemperCombatAlertsCCUIMin.SetAnchor(
    CENTER,
    GuiRoot,
    CENTER,
    CRUTCH.savedOptions.cc.visualPositionX,
    CRUTCH.savedOptions.cc.visualPositionY
  )

  TemperCombatAlertsCCUIObnoxious.ClearAnchors()
  TemperCombatAlertsCCUIObnoxious.SetAnchor(
    CENTER,
    GuiRoot,
    CENTER,
    CRUTCH.savedOptions.cc.obnoxiousPositionX,
    CRUTCH.savedOptions.cc.obnoxiousPositionY
  )
}
