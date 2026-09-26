import { isAchievementComplete } from "akasha/temper/addon/pages/characters/modules/pithka-achievement-actions/pithka-achievement-actions.module.code.ts"
import {
  DEFAULT_FONT,
  HEX_GOLD,
  ICON_SIZE,
  RGB_BLUE,
  RGB_GRAY,
  RGB_WHITE,
  type Rgba,
  SMALL_FONT,
  TEXTURES,
} from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import {
  newLabel,
  toggleTracker,
  tooltipCloseFn,
  tooltipOpenFn,
} from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import { basicIcon } from "akasha/temper/addon/pages/characters/modules/pithka-icons/pithka-icons.module.code.ts"
import {
  highestScore,
  registerScoresCallback,
  sortedScores,
} from "akasha/temper/addon/pages/characters/modules/pithka-scores/pithka-scores.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-5/eso-interface-extra-5.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"

export type LabelSettings = {
  readonly text?: string
  readonly width?: number
  readonly height?: number
  readonly font?: string
  readonly color?: Rgba
  readonly align?: number
  readonly vAlign?: number
  readonly tooltipText?: string
  readonly clickFn?: (this: void) => undefined
  readonly parent?: Control
  readonly hidden?: boolean
}

export function basicLabel(this: void, settings: LabelSettings = {}): LabelControl {
  const control = newLabel()
  control.SetDimensions(settings.width ?? ICON_SIZE, settings.height ?? ICON_SIZE)
  control.SetColor(...(settings.color ?? RGB_WHITE))
  control.SetHorizontalAlignment(settings.align ?? TEXT_ALIGN_LEFT)
  control.SetVerticalAlignment(settings.vAlign ?? TEXT_ALIGN_CENTER)
  control.SetText(settings.text ?? "")
  control.SetFont(settings.font ?? SMALL_FONT)
  control.SetParent(settings.parent ?? TemperCharactersPithka_GUI)
  control.SetHidden(settings.hidden ?? false)
  if (settings.tooltipText !== undefined) {
    control.SetMouseEnabled(true)
    control.SetHandler("OnMouseEnter", tooltipOpenFn(settings.tooltipText, BOTTOM))
    control.SetHandler("OnMouseExit", tooltipCloseFn())
  }
  if (settings.clickFn !== undefined) {
    control.SetMouseEnabled(true)
    control.SetHandler("OnMouseUp", settings.clickFn)
  }
  return control
}

export type AchievementLabelSettings = LabelSettings & { readonly AID?: number }

export function achievementLabel(this: void, settings: AchievementLabelSettings): LabelControl {
  const id = settings.AID
  if (id === undefined) return basicLabel({ ...settings, font: settings.font ?? DEFAULT_FONT })
  let complete = isAchievementComplete(id)
  const control = basicLabel({
    ...settings,
    color: complete ? RGB_WHITE : RGB_GRAY,
    font: settings.font ?? DEFAULT_FONT,
  })
  control.SetHandler("OnEffectivelyShown", () => {
    const now = isAchievementComplete(id)
    if (now !== complete) {
      complete = now
      control.SetColor(...(now ? RGB_WHITE : RGB_GRAY))
    }
  })
  return control
}

function portFn(this: void, id: number, name: string): (this: void) => undefined {
  return () => {
    toggleTracker()
    d(`Porting ${name}`)
    FastTravelToNode(id)
  }
}

function queueFn(this: void, id: number, name: string): (this: void) => undefined {
  return () => {
    toggleTracker()
    d(`Queueing ${name}`)
    AddActivityFinderSpecificSearchEntry(id)
    StartActivityFinderSearch()
  }
}

function difficultyPortFn(
  this: void,
  id: number,
  name: string,
  veteran: boolean
): (this: void) => undefined {
  const port = portFn(id, name)
  return () => {
    const [canChange] = CanPlayerChangeGroupDifficulty()
    if (IsUnitUsingVeteranDifficulty("player") === veteran) {
      port()
    } else if (canChange) {
      SetVeteranDifficulty(veteran)
      port()
    } else {
      d(`Teleport Error: Difficulty set to ${veteran ? "Normal" : "Vet"} and cannot change`)
    }
  }
}

export type TeleportSettings = LabelSettings & {
  readonly text: string
  readonly vQueue?: number
  readonly nQueue?: number
  readonly portId?: number
}

export function teleportLabel(this: void, settings: TeleportSettings): LabelControl {
  const name = settings.text
  const control = basicLabel({
    ...settings,
    color: settings.color ?? RGB_BLUE,
    font: settings.font ?? DEFAULT_FONT,
  })
  control.SetMouseEnabled(true)
  control.SetHandler("OnMouseEnter", (target: LabelControl) => target.SetColor(...RGB_WHITE))
  control.SetHandler("OnMouseExit", (target: LabelControl) => target.SetColor(...RGB_BLUE))
  control.SetHandler("OnMouseUp", (target: LabelControl, button: number) => {
    if (button === 2) {
      ClearMenu()
    } else if (button === 1) {
      ClearMenu()
      if (settings.vQueue !== undefined) AddMenuItem("Queue Vet", queueFn(settings.vQueue, name))
      if (settings.nQueue !== undefined) AddMenuItem("Queue Normal", queueFn(settings.nQueue, name))
      if (settings.portId !== undefined) {
        AddMenuItem("Port to Vet", difficultyPortFn(settings.portId, name, true))
        AddMenuItem("Port to Normal", difficultyPortFn(settings.portId, name, false))
      }
      ShowMenu(target)
    }
  })
  return control
}

function allScoresText(this: void, abbv: string): string {
  const sorted = sortedScores(abbv)
  if (sorted === undefined) return "NO SCORES RECORDED"
  let text = "SCORES BY CHARACTER\n"
  for (const [toon, value] of sorted) {
    const score = ZO_LocalizeDecimalNumber(value)
    text = `${text}\n${string.rep(" ", 10 - score.length)}${score}    ${toon}`
  }
  return text
}

export type ScoreSettings = { readonly ABBV: string; readonly SCORED?: boolean }

export function scoreLabel(this: void, row: ScoreSettings): LabelControl {
  const control = basicLabel({
    font: DEFAULT_FONT,
    align: TEXT_ALIGN_RIGHT,
    width: 75,
    tooltipText: "Test Tooltip",
  })
  if (row.SCORED === false) {
    const cross = basicIcon({ texture: TEXTURES.X, tooltipText: "does not exist", color: RGB_GRAY })
    cross.SetAnchor(TOPRIGHT, control, TOPRIGHT, 0, 0)
    cross.SetParent(control)
    control.SetMouseEnabled(false)
    return control
  }
  const update = (): undefined => {
    control.SetText(ZO_LocalizeDecimalNumber(highestScore(row.ABBV)))
    control.SetHandler("OnMouseEnter", () => {
      ZO_Tooltips_ShowTextTooltip(
        control,
        TEXT_ALIGN_LEFT,
        `|${HEX_GOLD}${allScoresText(row.ABBV)}|r`
      )
    })
    control.SetHandler("OnMouseExit", tooltipCloseFn())
  }
  update()
  registerScoresCallback(update)
  return control
}

export function pulseLabel(this: void, settings: LabelSettings): LabelControlWithPulse {
  const control = basicLabel(settings) as LabelControlWithPulse
  const timeline = ANIMATION_MANAGER.CreateTimelineFromVirtual(
    "TemperCharactersPithka_LabelPulseAnimation",
    control
  ) as AnimationTimeline
  control.SetPulse = (shouldPulse: boolean) => {
    if (shouldPulse) {
      timeline.PlayFromStart()
    } else {
      timeline.Stop()
    }
  }
  timeline.Stop()
  return control
}

export type PulseLabel = { SetPulse: (this: void, shouldPulse: boolean) => undefined }

export type LabelControlWithPulse = LabelControl & PulseLabel

export function watermarkLabel(
  this: void,
  settings: { readonly text: string; readonly vOffset: number; readonly hidden: boolean }
): LabelControl {
  const control = basicLabel({
    text: settings.text,
    hidden: settings.hidden,
    color: [197 / 225, 194 / 225, 158 / 225, 0.15],
    font: "ZoFontCenterScreenAnnounceLarge",
    align: TEXT_ALIGN_CENTER,
    width: 1000,
  })
  control.SetScale(3)
  control.SetAnchor(CENTER, TemperCharactersPithka_GUI, CENTER, 0, settings.vOffset)
  return control
}
