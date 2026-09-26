import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import type { DrawingUpdateFunc } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing

let hangar: ZoControlPool | undefined
let numJets = 0
const CIRCLING_JETS: Record<string, number> = {}

function findAvailableJetSlot(this: void): number {
  let i = 1
  while (true) {
    let taken = false
    for (const [, slot] of pairs(CIRCLING_JETS)) {
      if (i === slot) {
        taken = true
        i = i + 1
        break
      }
    }
    if (!taken) {
      return i
    }
  }
}

function removeJet(this: void, jetKey: string): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "CircleJet" + jetKey)
  delete Draw.activeIcons[jetKey]
  Draw.MaybeStopPolling()

  const realKey = tonumber(string.sub(jetKey, 4)) as number
  hangar?.ReleaseObject(realKey)

  delete CIRCLING_JETS[jetKey]
  numJets = numJets - 1
}

Draw.CircleJet = (textArg, duration, radiusArg, cycleTimeArg) => {
  if (hangar === undefined) {
    hangar = ZO_ControlPool.New("TemperCombatAlertsSpaceJet", TemperCombatAlertsSpace)
    hangar.SetResetFunction((jet) => {
      jet.SetHidden(true)
    })
  }

  const [control, key] = hangar.AcquireObject()
  control.SetTransformNormalizedOriginPoint(0.5, 0.5)
  control.SetHidden(false)
  control.SetTransformScale(0.01)
  control.SetAnchor(CENTER, GuiRoot, CENTER)

  const jetKey = "Jet" + key

  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const text = textArg ?? "YOUR AD HERE"
  const radius = radiusArg ?? 28
  const cycleTime = cycleTimeArg ?? 60000

  const label = control.GetNamedChild("Label") as LabelControl
  label.SetText(text)
  control.SetDimensions(2000, 2000)
  control.SetWidth(math.max(label.GetTextWidth() + 50, 300))
  const height = math.max(label.GetTextHeight() + 30, 60)
  control.SetHeight(height)
  ;(control.GetNamedChild("Rope") as Control).SetWidth(height - 28)

  CIRCLING_JETS[jetKey] = findAvailableJetSlot()
  numJets = numJets + 1

  const jetFunc: DrawingUpdateFunc = (icon) => {
    const [, pX, pY, pZ] = GetUnitRawWorldPosition("player")
    const time = ((GetGameTimeMilliseconds() + cycleTime) % cycleTime) / cycleTime

    const offset = ((CIRCLING_JETS[jetKey] as number) / numJets) * math.pi * 2
    const angle = time * 2 * -math.pi + offset
    const jetX = pX + radius * 100 * math.cos(angle)
    const jetZ = pZ + radius * 100 * math.sin(angle)
    icon.SetPosition(icon, jetX, pY + 800, jetZ)

    icon.SetOrientation(icon, 0, -angle - math.pi / 2, 0)
  }

  Draw.CreateControlCommon(
    true,
    control,
    jetKey,
    "TemperCombat/assets/jetplane.dds",
    x,
    y,
    z,
    false,
    undefined,
    undefined,
    undefined,
    jetFunc,
    Draw.SetPosition,
    Draw.SetOrientation
  )

  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "CircleJet" + jetKey)
  if (duration !== undefined) {
    EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "CircleJet" + jetKey, duration, () => {
      removeJet(jetKey)
    })
  }

  return jetKey
}

Draw.AttachControl = (control, unitTag, key) => {
  control.SetSpace(SPACE_WORLD)
  control.SetTransformNormalizedOriginPoint(0.5, 0.5)
  control.SetTransformScale(0.01)
  control.SetAnchor(CENTER, GuiRoot, CENTER)

  const [, x, y, z] = GetUnitRawWorldPosition(unitTag)

  const attachedFunc: DrawingUpdateFunc = (icon) => {
    const [, uX, uY, uZ] = GetUnitRawWorldPosition(unitTag)
    icon.SetPosition(icon, uX, uY + 450, uZ)
  }

  Draw.CreateControlCommon(
    true,
    control,
    key,
    "TemperCombat/assets/poop.dds",
    x,
    y,
    z,
    true,
    0,
    0,
    0,
    attachedFunc,
    Draw.SetPosition,
    Draw.SetOrientation
  )
}

Draw.UnattachControl = (control, key) => {
  control.SetTransformOffset(0, 0, 0)
  control.SetTransformRotation(0, 0, 0)
  control.SetTransformScale(1)
  control.SetSpace(SPACE_INTERFACE)
  delete Draw.activeIcons[key]
  Draw.MaybeStopPolling()
}
