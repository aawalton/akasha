import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type {
  DrawingKey,
  DrawingUpdateFunc,
  SpaceOptions,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

let lastKey: DrawingKey | undefined
Draw.TestCircle = (radius, x, y, z) => {
  if (lastKey !== undefined) {
    Draw.RemoveWorldTexture(lastKey)
  }
  lastKey = Draw.CreateGroundCircle(x, y, z, radius)
}

const KEYS: DrawingKey[] = []

function clearPoop(this: void): undefined {
  for (const key of KEYS) {
    Draw.RemoveWorldTexture(key)
  }
  ZO_ClearTable(KEYS)
}
Draw.ClearPoop = clearPoop

Draw.TestPoop = (radiusArg) => {
  clearPoop()

  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const radius = radiusArg ?? 3

  const circleFunc: DrawingUpdateFunc = (icon) => {
    const [, pX, pY, pZ] = GetUnitRawWorldPosition("player")
    icon.SetPosition(icon, pX, pY + 5, pZ)

    const time = (GetGameTimeMilliseconds() % 2000) / 2000
    const [r, g, b] = CRUTCH.ConvertHSLToRGB(time, 1, 0.5)
    Draw.SetColor(icon, r, g, b)
  }
  KEYS.push(Draw.CreateGroundCircle(x, y, z, radius, undefined, undefined, circleFunc))

  const numPoops = 20
  const cycleTime = 3000
  for (let i = 1; i <= numPoops; i++) {
    const forward: number[] = []
    const right: number[] = []
    const up: number[] = []
    const poopFunc: DrawingUpdateFunc = (icon) => {
      const [, pX, pY, pZ] = GetUnitRawWorldPosition("player")
      const time =
        ((GetGameTimeMilliseconds() + (i / numPoops) * cycleTime) % cycleTime) / cycleTime

      const angle = time * 2 * math.pi
      const poopX = pX + radius * 100 * math.cos(angle)
      const poopZ = pZ + radius * 100 * math.sin(angle)
      icon.SetPosition(icon, poopX, pY + 150, poopZ)

      const [r, g, b] = CRUTCH.ConvertHSLToRGB(time, 1, 0.5)
      Draw.SetColor(icon, r, g, b)

      forward[0] = pX - poopX
      forward[1] = 0
      forward[2] = pZ - poopZ
      right[0] = pZ - poopZ
      right[1] = 0
      right[2] = poopX - pX
      up[0] = 0
      up[1] = 1
      up[2] = 0
      icon.SetOrientation(icon, forward, right, up)
    }

    KEYS.push(
      Draw.CreateOrientedTexture(
        "TemperCombat/assets/poop.dds",
        x,
        y,
        z,
        0.3,
        undefined,
        undefined,
        poopFunc
      )
    )
  }
}

Draw.TestSpacePoop = () => {
  const [, x, y, z] = GetUnitRawWorldPosition("player")
  Draw.CreateSpaceTexture(
    "TemperCombat/assets/poop.dds",
    x,
    y,
    z,
    1,
    1,
    C.WHITE,
    C.ZERO_ORIENTATION
  )
}

Draw.TestPoopText = () => {
  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const options: SpaceOptions = {
    label: {
      text: "my armory has a mind of its own",
      size: 80,
      color: [1, 1, 1, 1],
    },
    texture: {
      path: "TemperCombat/assets/poop.dds",
      size: 1,
      color: [1, 1, 1, 1],
    },
  }

  Draw.CreateSpaceControl(x, y, z, true, undefined, options, (icon) => {
    const time = (GetGameTimeMilliseconds() % 3000) / 3000
    const [r, g, b] = CRUTCH.ConvertHSLToRGB(time, 1, 0.5)
    icon.SetFontColor?.(icon, r, g, b)
    icon.SetText?.(icon, tostring(math.floor(GetGameTimeSeconds())))

    const time2 = ((GetGameTimeMilliseconds() + 1500) % 3000) / 3000
    const [r2, g2, b2] = CRUTCH.ConvertHSLToRGB(time2, 1, 0.5)
    icon.SetColor?.(icon, r2, g2, b2)
  })
}

Draw.TestMarker = () => {
  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const options: SpaceOptions = {
    label: {
      text: "8",
      size: 80,
      color: [1, 1, 1, 1],
    },
    backdrop: {
      width: 100,
      height: 100,
      centerColor: [0, 0, 1, 1],
      edgeColor: [0, 0, 0.2, 1],
    },
  }

  Draw.CreateSpaceControl(x, y, z, true, undefined, options, (icon) => {
    const time = (GetGameTimeMilliseconds() % 3000) / 3000
    const [r, g, b] = CRUTCH.ConvertHSLToRGB(time, 1, 0.5)
    icon.SetFontColor?.(icon, r, g, b)
    icon.SetText?.(icon, tostring(math.floor(GetGameTimeSeconds() % 10)))

    const time3 = ((GetGameTimeMilliseconds() + 2000) % 3000) / 3000
    const [centerR, centerG, centerB] = CRUTCH.ConvertHSLToRGB(time3, 1, 0.5)
    const [edgeR, edgeG, edgeB] = CRUTCH.ConvertHSLToRGB(time3, 1, 0.06)
    icon.SetBackdropColors?.(icon, centerR, centerG, centerB, 1, edgeR, edgeG, edgeB, 1)
    icon.SetBackdropRoll?.(icon, time3 * math.pi * 2 * 2)
  })
}
