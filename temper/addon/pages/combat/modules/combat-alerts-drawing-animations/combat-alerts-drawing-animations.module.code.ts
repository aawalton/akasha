import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-drawing-declarations/combat-alerts-drawing-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import type { DrawingColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const Anim = Draw.Animation
const C = CRUTCH.Constants

function pulseUpdate(
  this: void,
  composite: TextureCompositeControl,
  t: number,
  color?: DrawingColor
): undefined {
  const inset = ((1 - t) / 2) * composite.GetHeight()
  const surface1 = 1
  composite.SetInsets(surface1, inset, -inset, inset, -inset)
  composite.SetSurfaceAlpha(surface1, zo_clamp(zo_lerp(2, 0, t), 0, 1))

  let t2 = t - 0.3
  if (t2 < 0) {
    t2 = t2 + 1
  }
  const inset2 = ((1 - t2) / 2) * composite.GetHeight()
  const surface2 = 2
  composite.SetInsets(surface2, inset2, -inset2, inset2, -inset2)
  composite.SetSurfaceAlpha(surface2, zo_clamp(zo_lerp(2, 0, t2), 0, 1))

  if (color !== undefined) {
    for (let i = 1; i <= composite.GetNumSurfaces(); i++) {
      const a = composite.GetSurfaceAlpha(i)
      composite.SetColor(i, color[0] as number, color[1] as number, color[2] as number, a)
    }
  }
}
Anim.PulseUpdate = pulseUpdate

function pulseInitial(
  this: void,
  composite: TextureCompositeControl,
  texturePath: string,
  initialSize: number,
  color: DrawingColor
): undefined {
  const r = color[0] as number
  const g = color[1] as number
  const b = color[2] as number
  composite.SetTexture(texturePath)

  const surface1 = composite.AddSurface(0, 1, 0, 1)
  composite.SetInsets(surface1, 0, 0, 0, 0)
  composite.SetColor(surface1, r, g, b, 0)

  const surface2 = composite.AddSurface(0, 1, 0, 1)
  composite.SetInsets(surface2, 0, 0, 0, 0)
  composite.SetSurfaceAlpha(surface2, 0)
  composite.SetColor(surface2, r, g, b, 0)

  const inset = ((1 - initialSize) / 2) * composite.GetHeight()
  const surfaceOrig = composite.AddSurface(0, 1, 0, 1)
  composite.SetInsets(surfaceOrig, inset, -inset, inset, -inset)
  composite.SetColor(surfaceOrig, r, g, b, color[3])
}
Anim.PulseInitial = pulseInitial

Draw.TestPulse = () => {
  const cycleTime = 700
  CRUTCH.SetAttachedIconForUnit(
    "player",
    "CrutchAlertsTestPulse",
    500,
    undefined,
    120,
    undefined,
    false,
    (icon) => {
      const time = GetGameTimeMilliseconds() % cycleTime
      const t = time / cycleTime
      const getComposite = icon.GetCompositeTexture
      if (getComposite !== undefined) {
        pulseUpdate(getComposite(icon), t)
      }
    },
    {
      label: {
        text: "9",
        size: 60,
        color: [1, 1, 1, 0.8],
      },
      composite: {
        size: 1.7,
        init: (composite) => {
          pulseInitial(composite, "TemperCombat/assets/shape/diamond.dds", 0.5, [1, 1, 1, 0.8])
        },
      },
    }
  )
}

Draw.TestPulse2D = () => {
  const cycleTime = 700

  const composite = CreateControl<TextureCompositeControl>(
    "TemperCombatAlertsTestPulse2D",
    TemperCombatAlertsDrawing,
    CT_TEXTURECOMPOSITE
  )
  composite.SetAnchor(CENTER, GuiRoot, CENTER)
  composite.SetDimensions(100, 100)

  pulseInitial(composite, "TemperCombat/assets/shape/diamond.dds", 0.5, [1, 1, 1, 0.8])

  EVENT_MANAGER.RegisterForUpdate("TemperCombatAlertsTestPulse2D", 10, () => {
    const time = GetGameTimeMilliseconds() % cycleTime
    const t = time / cycleTime
    pulseUpdate(composite, t)
  })
}

const BOOST_STATES: boolean[][] = [
  [true, false, false, false],
  [true, true, false, false],
  [true, true, true, false],
  [true, true, true, true],
  [false, true, true, true],
  [false, false, true, true],
  [false, false, false, true],
]

function boostUpdate(this: void, composite: TextureCompositeControl, t: number): undefined {
  const frame = zo_clamp(math.floor(t * 7) + 1, 1, 7)
  const states = BOOST_STATES[frame - 1] as boolean[]
  for (let i = 1; i <= 4; i++) {
    composite.SetSurfaceHidden(i, states[4 - i] !== true)
  }
}
Anim.BoostUpdate = boostUpdate

const CHEVRON_HEIGHT = 0.35
function boostInitial(
  this: void,
  composite: TextureCompositeControl,
  colorFromArg?: DrawingColor,
  colorToArg?: DrawingColor
): undefined {
  composite.SetTexture("TemperCombat/assets/shape/chevronthin.dds")

  const colorFrom = colorFromArg ?? C.WHITE
  const colorTo = colorToArg ?? C.WHITE
  const from = ZO_ColorDef.New(
    colorFrom[0] as number,
    colorFrom[1] as number,
    colorFrom[2] as number
  )
  const to = ZO_ColorDef.New(colorTo[0] as number, colorTo[1] as number, colorTo[2] as number)

  for (let i = 1; i <= 4; i++) {
    composite.AddSurface(0, 1, 0, 1)

    const offset = i * CHEVRON_HEIGHT * composite.GetHeight()
    composite.SetInsets(i, 0, 0, -offset, -offset)

    const [r, g, b, a] = ZO_ColorDef.LerpRGB(from, to, (i - 1) / 3)
    composite.SetColor(i, r, g, b, a)
  }
}
Anim.BoostInitial = boostInitial

Draw.TestBoost = () => {
  const cycleTime = 700
  CRUTCH.SetAttachedIconForUnit(
    "player",
    "CrutchAlertsTestBoost",
    500,
    undefined,
    120,
    undefined,
    false,
    (icon) => {
      const time = GetGameTimeMilliseconds() % cycleTime
      const t = time / cycleTime
      const getComposite = icon.GetCompositeTexture
      if (getComposite !== undefined) {
        boostUpdate(getComposite(icon), t)
      }
    },
    {
      composite: {
        size: 1,
        init: (composite) => {
          boostInitial(composite, C.RED, C.YELLOW)
        },
      },
    }
  )
}
