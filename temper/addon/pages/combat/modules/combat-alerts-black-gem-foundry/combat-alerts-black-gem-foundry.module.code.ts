import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-placed/combat-alerts-drawing-placed.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const CENTER_X = 175064
const CENTER_Y = 32820
const CENTER_Z = 75194
const RADIUS = 3100

function getLineEndpoint(this: void): LuaMultiReturn<[number, number, number]> {
  const [, x, , z] = GetUnitRawWorldPosition("player")
  const theta = math.atan2(z - CENTER_Z, x - CENTER_X)
  return $multi(CENTER_X + math.cos(theta) * RADIUS, CENTER_Y, CENTER_Z + math.sin(theta) * RADIUS)
}

let key: ReturnType<typeof CRUTCH.Drawing.CreateLine> | undefined
function drawSlamLine(this: void): undefined {
  const [x1, y1, z1] = getLineEndpoint()
  key = CRUTCH.Drawing.CreateLine(
    x1,
    y1,
    z1,
    CENTER_X,
    CENTER_Y,
    CENTER_Z,
    0.3,
    CRUTCH.Constants.RED,
    undefined,
    undefined,
    function (this: void) {
      const [px1, py1, pz1] = getLineEndpoint()
      return $multi(px1, py1, pz1, CENTER_X, CENTER_Y, CENTER_Z)
    }
  )
}

function onRupture(this: void): undefined {
  if (key !== undefined) {
    CRUTCH.Drawing.RemoveLine(key)
    key = undefined
  }
}

function onRuptureHide(this: void): undefined {
  drawSlamLine()
  zo_callLater(onRupture, 20000)
}

function registerBlackGemFoundry(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Black Gem Foundry")

  if (CRUTCH.savedOptions.blackGemFoundry.showRuptureLine) {
    CRUTCH.RegisterForCombatEvent("BGFRuptureHide", onRuptureHide, undefined, 240244)
    CRUTCH.RegisterForCombatEvent("BGFRupture", onRupture, undefined, 240240)

    CRUTCH.RegisterExitedGroupCombatListener("BGFRupture", onRupture)
  }
}

function unregisterBlackGemFoundry(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("BGFRuptureHide")
  CRUTCH.UnregisterForCombatEvent("BGFRupture")

  CRUTCH.UnregisterExitedGroupCombatListener("BGFRupture")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Black Gem Foundry")
}

registerZone(1552, registerBlackGemFoundry, unregisterBlackGemFoundry)
