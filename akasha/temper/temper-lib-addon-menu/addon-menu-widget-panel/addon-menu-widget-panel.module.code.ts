import {
  asEsoHandler,
  asLamControl,
  asLamFactory,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  cm,
  LAMCC,
  lam,
  registerWidget,
  wm,
} from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  LamControl,
  PanelData,
  Valued,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import { L } from "../addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts"
import {
  getStringFromValue,
  getTopPanel,
  requestRefreshIfNeeded,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

const SEPARATOR = " - "
const COLORED_SEPARATOR = ZO_WHITE.Colorize(SEPARATOR)
const LINK_COLOR = ZO_ColorDef.New("5959D5")
const LINK_MOUSE_OVER_COLOR = ZO_ColorDef.New("B8B8D3")
const LINK_COLOR_DONATE = ZO_ColorDef.New("FFD700")
const LINK_MOUSE_OVER_COLOR_DONATE = ZO_ColorDef.New("FFF6CC")

function refreshPanel(this: void, control: LamControl): undefined {
  const panel = getTopPanel(control)
  if (lam.currentAddonPanel !== panel || lam.currentPanelOpened !== true) {
    return
  }

  const panelControls = panel.controlsToRefresh ?? []

  for (const updateControl of panelControls) {
    if (updateControl !== control && updateControl.UpdateValue !== undefined) {
      updateControl.UpdateValue()
    }
    if (updateControl.UpdateDisabled !== undefined) {
      updateControl.UpdateDisabled()
    }
    if (updateControl.UpdateWarning !== undefined) {
      updateControl.UpdateWarning()
    }
  }
}

function forceDefaults(this: LamControl): undefined {
  const panelControls = this.controlsToRefresh ?? []

  for (const updateControl of panelControls) {
    const updateControlData = updateControl.data
    if (updateControl.UpdateValue !== undefined && updateControlData.default !== undefined) {
      updateControl.UpdateValue(true)
    }
    if (updateControlData.resetFunc !== undefined) {
      updateControlData.resetFunc(updateControl)
    }
  }

  if (this.data.resetFunc !== undefined) {
    this.data.resetFunc(this)
  }

  cm.FireCallbacks("LAM-RefreshPanel", this)
}

let callbackRegistered = false

function createButtonControl(
  this: void,
  control: LamControl,
  label: string,
  clickAction: Valued<string>,
  relativeTo?: Control
): ButtonControl {
  const button = wm.CreateControl(undefined, control, CT_BUTTON)
  button.SetClickSound("Click")
  button.SetFont(L.PANEL_INFO_FONT)
  const [normalR, normalG, normalB, normalA] = LINK_COLOR.UnpackRGBA()
  button.SetNormalFontColor(normalR, normalG, normalB, normalA)
  const [overR, overG, overB, overA] = LINK_MOUSE_OVER_COLOR.UnpackRGBA()
  button.SetMouseOverFontColor(overR, overG, overB, overA)

  if (typeof clickAction === "string") {
    const url = clickAction
    button.SetHandler("OnClicked", (): undefined => {
      RequestOpenUnsafeURL(url)
    })
  } else {
    button.SetHandler("OnClicked", asEsoHandler(clickAction))
  }

  if (relativeTo !== undefined) {
    button.SetAnchor(TOPLEFT, relativeTo, TOPRIGHT, 0, 0)
    button.SetText(COLORED_SEPARATOR + label)
  } else {
    button.SetAnchor(TOPLEFT, control.label, BOTTOMLEFT, 0, -2)
    button.SetText(label)
  }
  const [textWidth, textHeight] = button.GetLabelControl().GetTextDimensions()
  button.SetDimensions(textWidth, textHeight)

  return button
}

function createPanel(
  this: void,
  parent: LamControl,
  panelData: PanelData,
  controlName?: string
): LamControl {
  const control = asLamControl(wm.CreateControl(controlName, parent, CT_CONTROL))

  const label = wm.CreateControlFromVirtual<LabelControl>(
    undefined,
    control,
    "ZO_Options_SectionTitleLabel"
  )
  control.label = label
  label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 4)
  label.SetText(getStringFromValue(panelData.displayName ?? panelData.name))

  let previousInfoControl: Control | undefined
  if (panelData.author !== undefined || panelData.version !== undefined) {
    const info = wm.CreateControl(undefined, control, CT_LABEL)
    control.info = info
    info.SetFont(L.PANEL_INFO_FONT)
    info.SetAnchor(TOPLEFT, label, BOTTOMLEFT, 0, -2)

    const output: (string | number)[] = []
    if (panelData.author !== undefined) {
      output.push(zo_strformat(L.AUTHOR, getStringFromValue(panelData.author)))
    }
    if (panelData.version !== undefined) {
      output.push(zo_strformat(L.VERSION, getStringFromValue(panelData.version)))
    }
    info.SetText(output.join(SEPARATOR))
    previousInfoControl = info
  }

  if (panelData.website !== undefined) {
    control.website = createButtonControl(
      control,
      L.WEBSITE,
      panelData.website,
      previousInfoControl
    )
    previousInfoControl = control.website
  }

  if (panelData.feedback !== undefined) {
    control.feedback = createButtonControl(
      control,
      L.FEEDBACK,
      panelData.feedback,
      previousInfoControl
    )
    previousInfoControl = control.feedback
  }

  if (panelData.translation !== undefined) {
    control.translation = createButtonControl(
      control,
      L.TRANSLATION,
      panelData.translation,
      previousInfoControl
    )
    previousInfoControl = control.translation
  }

  if (panelData.donation !== undefined) {
    const donation = createButtonControl(
      control,
      L.DONATION,
      panelData.donation,
      previousInfoControl
    )
    control.donation = donation
    previousInfoControl = donation
    const [donateR, donateG, donateB, donateA] = LINK_COLOR_DONATE.UnpackRGBA()
    donation.SetNormalFontColor(donateR, donateG, donateB, donateA)
    const [donateOverR, donateOverG, donateOverB, donateOverA] =
      LINK_MOUSE_OVER_COLOR_DONATE.UnpackRGBA()
    donation.SetMouseOverFontColor(donateOverR, donateOverG, donateOverB, donateOverA)
  }

  const container = wm.CreateControlFromVirtual(
    `LAMAddonPanelContainer${LAMCC.scrollCount}`,
    control,
    "ZO_ScrollContainer"
  )
  control.container = container
  LAMCC.scrollCount = LAMCC.scrollCount + 1
  container.SetAnchor(TOPLEFT, control.info ?? label, BOTTOMLEFT, 0, 20)
  container.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, -3, -3)
  const scroll = GetControl(container, "ScrollChild")
  control.scroll = scroll
  if (scroll !== undefined) {
    scroll.SetResizeToFitPadding(0, 20)
  }

  if (panelData.registerForRefresh === true && !callbackRegistered) {
    cm.RegisterCallback("LAM-RefreshPanel", refreshPanel)
    callbackRegistered = true
  }

  control.ForceDefaults = forceDefaults
  control.RefreshPanel = function (this: LamControl): undefined {
    requestRefreshIfNeeded(this)
  }
  control.data = panelData
  control.controlsToRefresh = []

  return control
}

if (registerWidget("panel", WIDGET_VERSION.panel)) {
  LAMCC.panel = asLamFactory(createPanel)
}
