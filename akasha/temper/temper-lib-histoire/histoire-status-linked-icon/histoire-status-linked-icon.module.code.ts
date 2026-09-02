import { internal } from "../histoire-state/histoire-state.module.code.ts"
import type {
  GuildHistoryStatusTooltipInstance,
  StatusTooltipCacheRef,
} from "../histoire-status-tooltip/histoire-status-tooltip.module.code.ts"

const logger = internal.logger
void logger

const LINKED_ICON = "LibHistoire/image/linked_down.dds"
const UNLINKED_ICON = "LibHistoire/image/unlinked_down.dds"
const REQUEST_MODE_FORCE_OFF_ICON = "EsoUI/Art/Miscellaneous/Keyboard/hidden_down.dds"

interface HistoryAdapterRef {
  GetSelectedCategoryCache: (this: HistoryAdapterRef) => StatusTooltipCacheRef | undefined
}

export interface GuildHistoryStatusLinkedIconInstance {
  history: { control: Control }
  adapter: HistoryAdapterRef
  statusTooltip: GuildHistoryStatusTooltipInstance
  control: TextureControl
  Initialize: (
    this: GuildHistoryStatusLinkedIconInstance,
    history: { control: Control },
    adapter: HistoryAdapterRef,
    statusTooltip: GuildHistoryStatusTooltipInstance
  ) => void
  Update: (this: GuildHistoryStatusLinkedIconInstance) => void
}

export interface GuildHistoryStatusLinkedIconClass extends GuildHistoryStatusLinkedIconInstance {
  New: (
    this: GuildHistoryStatusLinkedIconClass,
    history: { control: Control },
    adapter: HistoryAdapterRef,
    statusTooltip: GuildHistoryStatusTooltipInstance
  ) => GuildHistoryStatusLinkedIconInstance
}

const GuildHistoryStatusLinkedIcon =
  ZO_InitializingObject.Subclass<GuildHistoryStatusLinkedIconClass>()
internal.class.GuildHistoryStatusLinkedIcon = GuildHistoryStatusLinkedIcon

GuildHistoryStatusLinkedIcon.Initialize = function (this, history, adapter, statusTooltip) {
  this.history = history
  this.adapter = adapter
  this.statusTooltip = statusTooltip
  this.control = WINDOW_MANAGER.CreateControlFromVirtual<TextureControl>(
    "LibHistoireLinkedIcon",
    history.control,
    "LibHistoireLinkedIconTemplate"
  )
  const control = this.control

  control.SetHandler("OnMouseEnter", () => {
    const cache = this.adapter.GetSelectedCategoryCache()
    if (cache != null) {
      statusTooltip.Show(control, cache)
    }
  })
  control.SetHandler("OnMouseExit", () => {
    statusTooltip.Hide()
  })

  const refreshLinkInformation = (): undefined => {
    this.Update()
  }

  internal.RegisterCallback(
    internal.callback.SELECTED_CATEGORY_CACHE_CHANGED,
    refreshLinkInformation
  )
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENTS_STARTED, refreshLinkInformation)
  internal.RegisterCallback(
    internal.callback.PROCESS_LINKED_EVENTS_FINISHED,
    refreshLinkInformation
  )
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENTS_STARTED, refreshLinkInformation)
  internal.RegisterCallback(
    internal.callback.PROCESS_MISSED_EVENTS_FINISHED,
    refreshLinkInformation
  )
  internal.RegisterCallback(internal.callback.REQUEST_MODE_CHANGED, refreshLinkInformation)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_LOST, refreshLinkInformation)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_FOUND, refreshLinkInformation)

  this.Update()
}

GuildHistoryStatusLinkedIcon.Update = function (this) {
  const control = this.control
  const statusTooltip = this.statusTooltip

  const cache = this.adapter.GetSelectedCategoryCache()
  if (cache != null) {
    let texture = UNLINKED_ICON
    if (!cache.IsAutoRequesting()) {
      texture = REQUEST_MODE_FORCE_OFF_ICON
    } else if (cache.HasLinked()) {
      texture = LINKED_ICON
    }
    this.control.SetTexture(texture)
    this.control.SetHidden(false)
  } else {
    this.control.SetHidden(true)
  }

  if (statusTooltip.GetTarget() === control) {
    statusTooltip.Show(control, cache)
  }
}
