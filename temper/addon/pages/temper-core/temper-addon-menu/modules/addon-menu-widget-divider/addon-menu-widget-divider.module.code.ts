import { asLamFactory } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  registerWidget,
  TEMPER_ADDON_MENU_CREATE_CONTROL,
  wm,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-state/addon-menu-state.module.code.ts"
import type {
  DividerData,
  LamControl,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import { createBaseControl } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-util/addon-menu-util.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const MIN_HEIGHT = 10
const MAX_HEIGHT = 50
const MIN_ALPHA = 0
const MAX_ALPHA = 1
const DEFAULT_ALPHA = 0.25

function getValueInRange(
  this: void,
  value: number | undefined,
  min: number,
  max: number,
  fallback: number
): number {
  if (value === undefined || typeof value !== "number") {
    return fallback
  }
  return math.min(math.max(min, value), max)
}

function createDivider(
  this: void,
  parent: LamControl,
  dividerData: DividerData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, dividerData, controlName)
  const isHalfWidth = control.isHalfWidth === true
  const width = control.GetWidth()
  const height = getValueInRange(dividerData.height, MIN_HEIGHT, MAX_HEIGHT, MIN_HEIGHT)
  const alpha = getValueInRange(dividerData.alpha, MIN_ALPHA, MAX_ALPHA, DEFAULT_ALPHA)

  control.SetDimensions(isHalfWidth ? width / 2 : width, height)

  const divider = wm.CreateControlFromVirtual<TextureControl>(
    undefined,
    control,
    "ZO_Options_Divider"
  )
  control.divider = divider
  divider.SetWidth(isHalfWidth ? width / 2 : width)
  divider.SetAnchor(TOPLEFT)
  divider.SetAlpha(alpha)

  return control
}

if (registerWidget("divider", WIDGET_VERSION.divider)) {
  TEMPER_ADDON_MENU_CREATE_CONTROL.divider = asLamFactory(createDivider)
}
