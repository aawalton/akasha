import {
  asEsoHandler,
  asLamFactory,
  asTooltipHostControl,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  DescriptionData,
  LamControl,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createBaseControl,
  getColorForState,
  getDefaultValue,
  getStringFromValue,
  registerForRefreshIfNeeded,
  setUpTooltip,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

function onLinkClicked(
  this: void,
  _control: unknown,
  _linkData: unknown,
  linkText: unknown,
  button: unknown
): undefined {
  ZO_LinkHandler_OnLinkClicked(linkText, button)
}

function createDescription(
  this: void,
  parent: LamControl,
  descriptionData: DescriptionData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, descriptionData, controlName)
  const isHalfWidth = control.isHalfWidth === true
  const width = control.GetWidth()
  control.SetResizeToFitDescendents(true)

  if (isHalfWidth) {
    control.SetDimensionConstraints(width / 2, 0, width / 2, 0)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  } else {
    control.SetDimensionConstraints(width, 0, width, 0)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  }

  const desc = wm.CreateControl(undefined, control, CT_LABEL)
  control.desc = desc
  desc.SetVerticalAlignment(TEXT_ALIGN_TOP)
  desc.SetFont("ZoFontGame")
  desc.SetText(getStringFromValue(descriptionData.text))
  desc.SetWidth(isHalfWidth ? width / 2 : width)
  setUpTooltip(desc, descriptionData)

  let title: LabelControl | undefined
  if (descriptionData.title !== undefined) {
    title = wm.CreateControl(undefined, control, CT_LABEL)
    control.title = title
    title.SetWidth(isHalfWidth ? width / 2 : width)
    title.SetAnchor(TOPLEFT, control, TOPLEFT)
    title.SetFont("ZoFontWinH4")
    title.SetText(getStringFromValue(descriptionData.title))
    setUpTooltip(title, descriptionData, asTooltipHostControl(desc).data)
    desc.SetAnchor(TOPLEFT, title, BOTTOMLEFT)
  } else {
    desc.SetAnchor(TOPLEFT)
  }

  if (descriptionData.enableLinks !== undefined && descriptionData.enableLinks !== false) {
    desc.SetMouseEnabled(true)
    desc.SetLinkEnabled(true)
    if (typeof descriptionData.enableLinks === "function") {
      desc.SetHandler("OnLinkClicked", asEsoHandler(descriptionData.enableLinks))
    } else {
      desc.SetHandler("OnLinkClicked", asEsoHandler(onLinkClicked))
    }
  }

  control.UpdateValue = function (this: LamControl): undefined {
    if (title !== undefined) {
      title.SetText(getStringFromValue(descriptionData.title ?? ""))
    }
    desc.SetText(getStringFromValue(descriptionData.text))
  }
  if (descriptionData.disabled !== undefined) {
    control.UpdateDisabled = function (this: LamControl): undefined {
      const disable = getDefaultValue(descriptionData.disabled ?? false)
      if (disable !== this.disabled) {
        const color = getColorForState(disable)
        {
          const [r, g, b, a] = color.UnpackRGBA()
          desc.SetColor(r, g, b, a)
        }
        if (title !== undefined) {
          const [r, g, b, a] = color.UnpackRGBA()
          title.SetColor(r, g, b, a)
        }
        this.disabled = disable
      }
    }
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)

  return control
}

if (registerWidget("description", WIDGET_VERSION.description)) {
  LAMCC.description = asLamFactory(createDescription)
}
