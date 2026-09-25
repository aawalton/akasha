import { RED } from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import { internal } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-state/sales-history-state.module.code.ts"
import type { GuildHistoryStatusTooltipInstance } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-status-tooltip/sales-history-status-tooltip.module.code.ts"
import {
  destroyRow,
  initializeHighlight,
  initializeProgress,
  initializeRowTooltip,
  setLabel,
  setProgress,
  setSelected,
} from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-status-window-row-helpers/sales-history-status-window-row-helpers.module.code.ts"
import {
  asControl,
  asStatusTooltipCacheRef,
  DATA_ENTRY,
  type GuildHistoryStatusWindowInstance,
  guildHistoryScene,
  ROW_HEIGHT,
  type RowEntry,
  requireChild,
  type SelectedCacheRef,
  type SelectionWidgetRef,
  type WindowHistoryAdapterRef,
  type WindowSaveData,
} from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-status-window-shared/sales-history-status-window-shared.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
  type WindowFrame,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import {
  hidePopover,
  type PopoverLine,
  showPopover,
} from "akasha/temper/window/modules/window-popover/window-popover.module.code.ts"
import { drawPanel } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/guild-history/sales-history-controls/sales-history-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-scroll-list-extra/eso-scroll-list-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const logger = internal.logger
void logger

type CallLaterFn = (cb: () => void, ms: number) => number

function asSelectionWidgetClassRef(value: unknown): SelectionWidgetClassRef {
  return value as SelectionWidgetClassRef
}
function asCallLaterFn(value: unknown): CallLaterFn {
  return value as CallLaterFn
}

interface SelectionWidgetClassRef {
  New: (this: SelectionWidgetClassRef, parent: Control, rowHeight: number) => SelectionWidgetRef
}

interface GuildHistoryStatusWindowClass extends GuildHistoryStatusWindowInstance {
  New: (
    this: GuildHistoryStatusWindowClass,
    historyAdapter: WindowHistoryAdapterRef,
    statusTooltip: GuildHistoryStatusTooltipInstance,
    saveData: WindowSaveData
  ) => GuildHistoryStatusWindowInstance
}

const STATUS_TITLE = "Guild History Status"

const LIST_WIDTH = 250

const LIST_GAP = spaceOf("1")

const LISTS_HEIGHT = 387

function statusLinesOf(this: void, linkedEverything: boolean): PopoverLine[] {
  if (linkedEverything) {
    return [
      { text: "History has been linked for all guilds and categories", role: "heading" },
      {
        text: "New events will be sent on the server's sole discretion and may arrive at any time, or sometimes even never",
      },
      { text: "If they do not show up after several hours, you may want to restart your game" },
    ]
  }
  if (internal.IsGuildHistorySystemDisabled()) {
    return [
      {
        text: "The guild history system is currently disabled by ZOS",
        role: "heading",
        color: RED,
      },
      { text: "Temper Sales will not be able to retrieve new data until it is enabled again" },
    ]
  }
  return [
    { text: "The history has not been linked to the stored events yet.", role: "heading" },
    { text: "Automatic requests are on cooldown and may take a while" },
    { text: "You can manually send requests to receive missing history faster" },
    { text: "You can also force history to link, but it will create a hole in the stored records" },
  ]
}

function frameStatusWindow(
  this: void,
  control: TopLevelWindow,
  frame: WindowFrame,
  guildList: Control
): undefined {
  guildList.ClearAnchors()
  guildList.SetAnchor(TOPLEFT, frame.body, TOPLEFT, 0, 0)
  guildList.SetAnchor(BOTTOMLEFT, frame.body, BOTTOMLEFT, 0, 0)
  const status = requireChild<Control>(control, "Status")
  status.ClearAnchors()
  status.SetAnchor(BOTTOMLEFT, frame.body, BOTTOMLEFT, 0, 0)
  status.SetAnchor(BOTTOMRIGHT, guildList, BOTTOMRIGHT, 0, 0)
  const options = requireChild<Control>(control, "Options")
  options.ClearAnchors()
  options.SetAnchor(RIGHT, frame.actions, RIGHT, 0, 0)
  control.SetDimensions(
    LIST_WIDTH * 2 + LIST_GAP + FRAME_PADDING * 2,
    LISTS_HEIGHT + FRAME_TOP + FRAME_PADDING
  )
  return undefined
}

export const GuildHistoryStatusWindow =
  ZO_InitializingObject.Subclass<GuildHistoryStatusWindowClass>()
internal.class.GuildHistoryStatusWindow = GuildHistoryStatusWindow

GuildHistoryStatusWindow.Initialize = function (this, historyAdapter, statusTooltip, saveData) {
  this.historyAdapter = historyAdapter
  this.statusTooltip = statusTooltip
  this.saveData = saveData

  this.guildId = GetGuildId(1)
  this.category = GUILD_HISTORY_EVENT_CATEGORY_ROSTER

  const control = TemperItemsSalesHistoryStatusWindow
  this.fragment = ZO_SimpleSceneFragment.New(control)

  const frame = frameWindow(control, STATUS_TITLE)
  this.labelControl = frame.title
  this.guildListControl = requireChild<Control>(control, "GuildList")
  frameStatusWindow(control, frame, this.guildListControl)
  this.categoryListControl = requireChild<Control>(control, "CategoryList")
  drawPanel(control, "$(parent)GuildPanel", this.guildListControl, this.guildListControl)
  drawPanel(control, "$(parent)CategoryPanel", this.categoryListControl, this.categoryListControl)
  this.selectionWidget = asSelectionWidgetClassRef(
    internal.class.GuildHistoryStatusSelectionWidget
  ).New(control, ROW_HEIGHT)
  this.statusIcon = requireChild<TextureControl>(control, "StatusIcon")
  this.statusIcon.SetHandler("OnMouseEnter", (...args: unknown[]) => {
    showPopover(asControl(args[0]), statusLinesOf(this.hasLinkedEverything === true), RIGHT)
  })
  if (internal.IsGuildHistorySystemDisabled()) {
    const [r, g, b, a] = ZO_ERROR_COLOR.UnpackRGBA()
    this.statusIcon.SetColor(r, g, b, a)
  }
  this.statusIcon.SetHandler("OnMouseExit", () => hidePopover())
  control.SetHandler("OnMoveStop", () => {
    this.SavePosition()
  })
  this.control = control

  this.InitializeGuildList(this.guildListControl)
  this.InitializeCategoryList(this.categoryListControl)
  this.InitializeButtons()

  let updateHandle: number | undefined
  const clearUpdate = (): undefined => {
    if (updateHandle != null) {
      zo_removeCallLater(updateHandle)
      updateHandle = undefined
    }
  }

  const doUpdate = (): undefined => {
    this.Update()
    clearUpdate()
  }

  const callLater = asCallLaterFn(zo_callLater)

  const requestUpdate = (): undefined => {
    if (updateHandle != null) {
      return
    }
    updateHandle = callLater(doUpdate, 500)
  }

  const requestImmediateUpdate = (): undefined => {
    clearUpdate()
    updateHandle = callLater(doUpdate, 0)
  }

  internal.RegisterCallback(internal.callback.CATEGORY_DATA_UPDATED, requestUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENTS_STARTED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENT, requestUpdate)
  internal.RegisterCallback(
    internal.callback.PROCESS_LINKED_EVENTS_FINISHED,
    requestImmediateUpdate
  )
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENTS_STARTED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENT, requestUpdate)
  internal.RegisterCallback(
    internal.callback.PROCESS_MISSED_EVENTS_FINISHED,
    requestImmediateUpdate
  )
  internal.RegisterCallback(internal.callback.REQUEST_MODE_CHANGED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.ZOOM_MODE_CHANGED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.REQUEST_CREATED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.REQUEST_DESTROYED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_LOST, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_FOUND, requestImmediateUpdate)
  internal.RegisterCallback(
    internal.callback.SELECTED_CATEGORY_CACHE_CHANGED,
    (cache: SelectedCacheRef) => {
      this.SetGuildId(cache.GetGuildId())
      this.SetCategory(cache.GetCategory())
    }
  )
  guildHistoryScene.RegisterCallback("StateChange", requestImmediateUpdate)

  this.LoadPosition()

  const selectedCache = this.historyAdapter.GetSelectedCategoryCache()
  this.SetGuildId(selectedCache.GetGuildId())
  this.SetCategory(selectedCache.GetCategory())
}

GuildHistoryStatusWindow.InitializeBaseList = function (
  this,
  listControl,
  template,
  onInit,
  onUpdate
) {
  const initializeRow = (rowControl: Control, entry: RowEntry): undefined => {
    if (rowControl.initialized !== true) {
      initializeProgress(rowControl, this)
      initializeHighlight(rowControl)
      initializeRowTooltip(rowControl, this.statusTooltip)
      onInit(rowControl)
      rowControl.initialized = true
    }

    setLabel(rowControl, entry)
    setProgress(rowControl, entry)
    setSelected(rowControl, entry)

    if (this.statusTooltip.GetTarget() === rowControl) {
      this.statusTooltip.Show(rowControl, asStatusTooltipCacheRef(entry.cache))
    }

    if (onUpdate != null) {
      onUpdate(rowControl, entry)
    }
  }

  ZO_ScrollList_Initialize(listControl)
  ZO_ScrollList_AddDataType(
    listControl,
    DATA_ENTRY,
    template,
    ROW_HEIGHT,
    initializeRow,
    undefined,
    undefined,
    destroyRow
  )
  ZO_ScrollList_AddResizeOnScreenResize(listControl)
}
