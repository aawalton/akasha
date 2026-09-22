import type { CacheStatusBarClass } from "akasha/temper/addon/pages/capture-sales/modules/histoire-cache-status-bar/histoire-cache-status-bar.module.code.ts"
import { internal } from "akasha/temper/addon/pages/capture-sales/modules/histoire-state/histoire-state.module.code.ts"
import type { GuildHistoryStatusTooltipInstance } from "akasha/temper/addon/pages/capture-sales/modules/histoire-status-tooltip/histoire-status-tooltip.module.code.ts"
import {
  asBoolean,
  asNumber,
  asStatusTooltipCacheRef,
  DEFAULT_COLOR,
  type GuildHistoryStatusWindowInstance,
  REQUEST_MODE_FORCE_OFF_ICON,
  REQUEST_MODE_FORCE_ON_ICON,
  REQUEST_MODE_ICON_SIZE,
  type RowEntry,
  requireChild,
  SELECTED_COLOR,
} from "akasha/temper/addon/pages/capture-sales/modules/histoire-status-window-shared/histoire-status-window-shared.module.code.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-scroll-list-extra/eso-scroll-list-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type ResetControlFn = (this: void, control: Control) => void
interface StatusWindowZoomRef {
  GetZoomMode: (this: StatusWindowZoomRef) => string | undefined
}

function asCacheStatusBarClass(value: unknown): CacheStatusBarClass {
  return value as CacheStatusBarClass
}
function asStatusWindowZoomRef(value: unknown): StatusWindowZoomRef {
  return value as StatusWindowZoomRef
}
function asZoTimeline(value: unknown): ZoTimeline {
  return value as ZoTimeline
}
function asResetControlFn(value: unknown): ResetControlFn {
  return value as ResetControlFn
}

export function initializeProgress(
  rowControl: Control,
  window: GuildHistoryStatusWindowInstance
): undefined {
  const control = requireChild<Control>(rowControl, "StatusBar")
  rowControl.statusBar = asCacheStatusBarClass(internal.class.CacheStatusBar).New(
    control,
    asStatusWindowZoomRef(window)
  )
}

export function initializeHighlight(rowControl: Control): undefined {
  const highlight = requireChild<Control>(rowControl, "Highlight")
  highlight.SetAlpha(0)
  const animation = asZoTimeline(
    ANIMATION_MANAGER.CreateTimelineFromVirtual("ShowOnMouseOverLabelAnimation", highlight)
  )
  highlight.animation = animation
  animation.GetFirstAnimation().SetAlphaValues(0, 1)

  rowControl.SetHandler(
    "OnMouseEnter",
    () => {
      animation.PlayForward()
    },
    "TemperSalesHistory_Highlight"
  )

  rowControl.SetHandler(
    "OnMouseExit",
    () => {
      animation.PlayBackward()
    },
    "TemperSalesHistory_Highlight"
  )
}

export function initializeRowTooltip(
  rowControl: Control,
  tooltip: GuildHistoryStatusTooltipInstance
): undefined {
  rowControl.SetHandler(
    "OnMouseEnter",
    () => {
      const entry = ZO_ScrollList_GetData<RowEntry>(rowControl)
      tooltip.Show(rowControl, asStatusTooltipCacheRef(entry.cache))
    },
    "TemperSalesHistory_Tooltip"
  )

  rowControl.SetHandler(
    "OnMouseExit",
    () => {
      tooltip.Hide()
    },
    "TemperSalesHistory_Tooltip"
  )
}

export function initializeClickHandler(
  rowControl: Control,
  onSelect: (this: void, entry: RowEntry) => void
): undefined {
  rowControl.SetHandler(
    "OnMouseUp",
    (...args: unknown[]) => {
      const button = asNumber(args[1])
      const isInside = asBoolean(args[2])
      if (isInside && button === MOUSE_BUTTON_INDEX_LEFT) {
        const entry = ZO_ScrollList_GetData<RowEntry>(rowControl)
        onSelect(entry)
        PlaySound("Click")
      }
    },
    "TemperSalesHistory_Select"
  )
}

export function setLabel(rowControl: Control, entry: RowEntry): undefined {
  let label = entry.label
  const cache = entry.cache
  if (cache.GetRequestMode != null) {
    const mode = cache.GetRequestMode()
    if (mode === internal.REQUEST_MODE_ON) {
      label =
        label +
        zo_iconFormat(REQUEST_MODE_FORCE_ON_ICON, REQUEST_MODE_ICON_SIZE, REQUEST_MODE_ICON_SIZE)
    } else if (mode === internal.REQUEST_MODE_OFF) {
      label =
        label +
        zo_iconFormat(REQUEST_MODE_FORCE_OFF_ICON, REQUEST_MODE_ICON_SIZE, REQUEST_MODE_ICON_SIZE)
    }
  }

  const labelControl = requireChild<LabelControl>(rowControl, "Label")
  labelControl.SetText(label)
  const color = entry.selected ? SELECTED_COLOR : DEFAULT_COLOR
  const [r, g, b, a] = color.UnpackRGBA()
  labelControl.SetColor(r, g, b, a)
}

export function setProgress(rowControl: Control, entry: RowEntry): undefined {
  entry.cache.UpdateProgressBar(rowControl.statusBar)
}

export function setSelected(rowControl: Control, entry: RowEntry): undefined {
  const minAlpha = entry.selected ? 0.5 : 0
  const highlight = requireChild<Control>(rowControl, "Highlight")
  highlight.SetAlpha(minAlpha)
  asZoTimeline(highlight.animation).GetFirstAnimation().SetAlphaValues(minAlpha, 1)
}

export function destroyRow(rowControl: Control): undefined {
  const highlight = requireChild<Control>(rowControl, "Highlight")
  const animation = asZoTimeline(highlight.animation)
  animation.PlayFromEnd(animation.GetDuration())
  asResetControlFn(ZO_ObjectPool_DefaultResetControl)(rowControl)
}
