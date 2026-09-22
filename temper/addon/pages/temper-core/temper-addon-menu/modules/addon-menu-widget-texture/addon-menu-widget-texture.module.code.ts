import { asLamFactory } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  registerWidget,
  TEMPER_ADDON_MENU_CREATE_CONTROL,
  wm,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-state/addon-menu-state.module.code.ts"
import type {
  LamControl,
  TextureData,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import {
  createBaseControl,
  setUpTooltip,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-util/addon-menu-util.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const MIN_HEIGHT = 26

function createTexture(
  this: void,
  parent: LamControl,
  textureData: TextureData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, textureData, controlName)
  const width = control.GetWidth()
  control.SetResizeToFitDescendents(true)

  if (control.isHalfWidth) {
    control.SetDimensionConstraints(width / 2, MIN_HEIGHT, width / 2, MIN_HEIGHT * 4)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  } else {
    control.SetDimensionConstraints(width, MIN_HEIGHT, width, MIN_HEIGHT * 4)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  }

  const texture = wm.CreateControl(undefined, control, CT_TEXTURE)
  control.texture = texture
  texture.SetAnchor(CENTER)
  texture.SetDimensions(textureData.imageWidth, textureData.imageHeight)
  texture.SetTexture(textureData.image)
  setUpTooltip(texture, textureData)

  return control
}

if (registerWidget("texture", WIDGET_VERSION.texture)) {
  TEMPER_ADDON_MENU_CREATE_CONTROL.texture = asLamFactory(createTexture)
}
