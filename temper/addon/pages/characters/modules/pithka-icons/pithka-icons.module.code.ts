import {
  achievementContextMenuFn,
  achievementTooltipFn,
  isAchievementComplete,
  isAchievementReleased,
} from "akasha/temper/addon/pages/characters/modules/pithka-achievement-actions/pithka-achievement-actions.module.code.ts"
import {
  ICON_SIZE,
  ICON_TEXTURE,
  RGB_GRAY,
  RGB_GREEN,
  RGB_WHITE,
  type Rgba,
  TEXTURES,
} from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import {
  newIcon,
  tooltipCloseFn,
  tooltipOpenFn,
} from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"

export type IconSettings = {
  readonly texture?: string
  readonly size?: number
  readonly color?: Rgba
  readonly tooltipText?: string
  readonly tooltipAnchor?: number
  readonly clickFn?: (this: void, control: Control, button: number) => undefined
}

export function basicIcon(this: void, settings: IconSettings = {}): TextureControl {
  const size = settings.size ?? ICON_SIZE
  const control = newIcon()
  control.SetTexture(settings.texture ?? ICON_TEXTURE)
  control.SetDimensions(size, size)
  control.SetColor(...(settings.color ?? RGB_WHITE))
  if (settings.tooltipText !== undefined) {
    control.SetMouseEnabled(true)
    control.SetHandler(
      "OnMouseEnter",
      tooltipOpenFn(settings.tooltipText, settings.tooltipAnchor ?? BOTTOM)
    )
    control.SetHandler("OnMouseExit", tooltipCloseFn())
  }
  if (settings.clickFn !== undefined) control.SetHandler("OnMouseUp", settings.clickFn)
  return control
}

export function achievementIcon(this: void, id: number | undefined): TextureControl {
  if (id === undefined) {
    return basicIcon({ texture: TEXTURES.X, color: RGB_GRAY, tooltipText: "does not exist" })
  }
  if (!isAchievementReleased(id)) {
    return basicIcon({ tooltipText: "Coming Soon", texture: TEXTURES.LOCK, tooltipAnchor: BOTTOM })
  }
  const control = basicIcon()
  control.SetMouseEnabled(true)
  control.SetHandler("OnMouseEnter", achievementTooltipFn(id))
  control.SetHandler("OnMouseExit", tooltipCloseFn())
  control.SetHandler("OnMouseUp", achievementContextMenuFn(id))
  const update = (target: TextureControl): undefined => {
    const complete = isAchievementComplete(id)
    target.SetTexture(complete ? TEXTURES.CHECK : TEXTURES.BOX)
    target.SetColor(...(complete ? RGB_GREEN : RGB_GRAY))
  }
  control.SetHandler("OnEffectivelyShown", update)
  update(control)
  return control
}
