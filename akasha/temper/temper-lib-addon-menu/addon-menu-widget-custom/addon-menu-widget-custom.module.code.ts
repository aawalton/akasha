import { asLamFactory } from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { CustomData, LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createBaseControl,
  getDefaultValue,
  registerForRefreshIfNeeded,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

const MIN_HEIGHT = 26

function createCustom(
  this: void,
  parent: LamControl,
  customData: CustomData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, customData, controlName)
  const width = control.GetWidth()
  control.SetResizeToFitDescendents(true)

  const minHeight =
    customData.minHeight !== undefined ? getDefaultValue(customData.minHeight) : MIN_HEIGHT
  const maxHeight =
    customData.maxHeight !== undefined ? getDefaultValue(customData.maxHeight) : minHeight * 4

  if (control.isHalfWidth) {
    control.SetDimensionConstraints(width / 2, minHeight, width / 2, maxHeight)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  } else {
    control.SetDimensionConstraints(width, minHeight, width, maxHeight)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  }

  control.UpdateValue = (): undefined => {
    const refreshFunc = customData.refreshFunc
    if (refreshFunc !== undefined) {
      refreshFunc(control)
    }
  }

  registerForRefreshIfNeeded(control)

  if (customData.createFunc !== undefined) {
    customData.createFunc(control)
  }
  return control
}

if (registerWidget("custom", WIDGET_VERSION.custom)) {
  LAMCC.custom = asLamFactory(createCustom)
}
