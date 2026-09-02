import {
  asEsoHandler,
  asLamFactory,
  asTooltipHostControl,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  HALF_WIDTH_LINE_SPACING,
  MIN_HEIGHT,
  WIDGET_VERSION,
} from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { ButtonData, LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createBaseControl,
  createFAQTexture,
  getStringFromValue,
  registerForRefreshIfNeeded,
  requestRefreshIfNeeded,
  showConfirmationDialog,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

function createButton(
  this: void,
  parent: LamControl,
  buttonData: ButtonData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, buttonData, controlName)
  control.SetMouseEnabled(true)

  const width = control.GetWidth()
  if (control.isHalfWidth === true) {
    control.SetDimensions(width / 2, MIN_HEIGHT * 2 + HALF_WIDTH_LINE_SPACING)
  } else {
    control.SetDimensions(width, MIN_HEIGHT)
  }

  let button: ButtonControl
  if (buttonData.icon !== undefined) {
    button = wm.CreateControl(undefined, control, CT_BUTTON)
    button.SetDimensions(26, 26)
    button.SetNormalTexture(buttonData.icon)
    button.SetPressedOffset(2, 2)
  } else {
    button = wm.CreateControlFromVirtual<ButtonControl>(undefined, control, "ZO_DefaultButton")
    button.SetWidth(width / 3)
    button.SetText(tostring(getStringFromValue(buttonData.name)))
    if (buttonData.isDangerous === true) {
      const [r, g, b, a] = ZO_ERROR_COLOR.UnpackRGBA()
      button.SetNormalFontColor(r, g, b, a)
    }
  }
  control.button = button
  button.SetAnchor(control.isHalfWidth === true ? CENTER : RIGHT)
  button.SetClickSound("Click")
  asTooltipHostControl(button).data = { tooltipText: getStringFromValue(buttonData.tooltip ?? "") }
  button.SetHandler("OnMouseEnter", asEsoHandler(ZO_Options_OnMouseEnter))
  button.SetHandler("OnMouseExit", asEsoHandler(ZO_Options_OnMouseExit))
  button.SetHandler("OnClicked", (...args: unknown[]): undefined => {
    const callback = (): undefined => {
      buttonData.func(...args)
      requestRefreshIfNeeded(control)
    }

    if (buttonData.isDangerous === true) {
      const title = getStringFromValue(buttonData.name)
      const body = getStringFromValue(buttonData.warning ?? "")
      showConfirmationDialog(`${title}`, `${body}`, callback)
    } else {
      callback()
    }
  })

  if (buttonData.warning !== undefined) {
    const warning = wm.CreateControlFromVirtual<TextureControl>(
      undefined,
      control,
      "ZO_Options_WarningIcon"
    )
    warning.SetAnchor(RIGHT, button, LEFT, -5, 0)
    control.warning = warning
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning()
  }

  if (buttonData.disabled !== undefined) {
    control.UpdateDisabled = function (this: LamControl): undefined {
      let disable = this.data.disabled
      if (typeof disable === "function") {
        disable = disable()
      }
      button.SetEnabled(disable !== true)
    }
    control.UpdateDisabled()
  }

  const faqTexture = createFAQTexture(control)
  if (faqTexture) {
    faqTexture.ClearAnchors()
    faqTexture.SetAnchor(LEFT, button, RIGHT, 0, 0)
  }

  registerForRefreshIfNeeded(control)

  return control
}

if (registerWidget("button", WIDGET_VERSION.button)) {
  LAMCC.button = asLamFactory(createButton)
}
