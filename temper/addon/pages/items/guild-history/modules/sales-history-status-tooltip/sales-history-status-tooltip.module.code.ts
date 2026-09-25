import {
  GREEN,
  RED,
  YELLOW,
} from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import { internal } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-state/sales-history-state.module.code.ts"
import {
  formatCount,
  formatPercent,
} from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"
import {
  hidePopover,
  type PopoverLine,
  showPopover,
} from "akasha/temper/window/modules/window-popover/window-popover.module.code.ts"
import "akasha/temper/addon/pages/items/guild-history/sales-history-controls/sales-history-controls.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const logger = internal.logger
void logger

const TOOLTIP_UPDATE_INTERVAL = 500

function asControl(value: unknown): Control {
  return value as Control
}

export interface StatusTooltipCacheRef {
  IsAggregated: (this: StatusTooltipCacheRef) => boolean
  IsAutoRequesting: (this: StatusTooltipCacheRef) => boolean
  IsProcessing: (this: StatusTooltipCacheRef) => boolean
  HasLinked: (this: StatusTooltipCacheRef) => boolean
  HasCachedEvents: (this: StatusTooltipCacheRef) => boolean
  HasPendingRequest: (this: StatusTooltipCacheRef) => boolean
  GetNumLoadedManagedEvents: (this: StatusTooltipCacheRef) => number
  GetNumUnlinkedEvents: (this: StatusTooltipCacheRef) => number
  GetOldestManagedEventInfo: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[unknown, number | undefined]>
  GetNewestManagedEventInfo: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[unknown, number | undefined]>
  GetOldestUnlinkedEventTime: (this: StatusTooltipCacheRef) => number | undefined
  GetPendingEventMetrics: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[count: number, speed: number, timeLeft: number]>
  GetProgress: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[progress: number, missingTime: number]>
  GetProcessorInfo: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[names: string[], count: number, lastSeenTime: number | undefined]>
}

export interface GuildHistoryStatusTooltipInstance {
  lines: PopoverLine[]
  target?: Control
  cache?: StatusTooltipCacheRef
  updateHandle?: string
  Initialize: (this: GuildHistoryStatusTooltipInstance) => void
  Show: (
    this: GuildHistoryStatusTooltipInstance,
    target: Control,
    cache: StatusTooltipCacheRef | undefined
  ) => void
  SetupForCategory: (this: GuildHistoryStatusTooltipInstance, cache: StatusTooltipCacheRef) => void
  SetupForGuild: (this: GuildHistoryStatusTooltipInstance, cache: StatusTooltipCacheRef) => void
  RegisterForUpdate: (this: GuildHistoryStatusTooltipInstance) => void
  UnregisterForUpdate: (this: GuildHistoryStatusTooltipInstance) => void
  ShowText: (this: GuildHistoryStatusTooltipInstance, target: Control, text: string) => void
  Hide: (this: GuildHistoryStatusTooltipInstance) => void
  GetTarget: (this: GuildHistoryStatusTooltipInstance) => Control | undefined
}

interface GuildHistoryStatusTooltipClass extends GuildHistoryStatusTooltipInstance {
  New: (this: GuildHistoryStatusTooltipClass) => GuildHistoryStatusTooltipInstance
}

const GuildHistoryStatusTooltip = ZO_InitializingObject.Subclass<GuildHistoryStatusTooltipClass>()
internal.class.GuildHistoryStatusTooltip = GuildHistoryStatusTooltip

GuildHistoryStatusTooltip.Initialize = function (this) {
  this.lines = []
  this.target = undefined
}

function inOwnWindow(this: void, target: Control): boolean {
  return target.GetOwningWindow() === TemperItemsSalesHistoryStatusWindow
}

function showLines(this: void, target: Control, lines: readonly PopoverLine[]): undefined {
  if (inOwnWindow(target)) {
    showPopover(target, lines, RIGHT)
    return undefined
  }
  InitializeTooltip(InformationTooltip, target, RIGHT, 0, 0)
  for (const line of lines) {
    if (line.color === undefined) {
      SetTooltipText(InformationTooltip, line.text)
    } else {
      const [red, green, blue] = line.color
      SetTooltipText(InformationTooltip, line.text, red, green, blue)
    }
  }
  return undefined
}

function eventTimeOf(this: void, time: number): string {
  const [date, clock] = FormatAchievementLinkTimestamp(time)
  return `${date} ${clock}`
}

function managedLines(this: void, cache: StatusTooltipCacheRef): PopoverLine[] {
  const lines: PopoverLine[] = [
    { text: `Loaded managed events: ${formatCount(cache.GetNumLoadedManagedEvents())}` },
  ]
  const [, oldest] = cache.GetOldestManagedEventInfo()
  if (oldest != null) lines.push({ text: `Oldest managed event: ${eventTimeOf(oldest)}` })
  const [, newest] = cache.GetNewestManagedEventInfo()
  if (newest != null) lines.push({ text: `Newest managed event: ${eventTimeOf(newest)}` })
  return lines
}

GuildHistoryStatusTooltip.Show = function (this, target, cache) {
  this.lines = []
  if (cache != null) {
    if (cache.IsAggregated()) {
      this.SetupForGuild(cache)
    } else {
      this.SetupForCategory(cache)
    }
  }
  showLines(target, this.lines)

  this.target = target
  this.cache = cache
}

GuildHistoryStatusTooltip.SetupForCategory = function (this, cache) {
  const lines = this.lines

  if (cache.IsAutoRequesting()) {
    lines.push(...managedLines(cache))
  } else {
    lines.push({ text: "Missing events are not requested automatically", color: GREEN })
  }

  let shouldUnregisterForUpdate = true
  if (cache.IsProcessing()) {
    lines.push({ text: "Events are being processed...", color: YELLOW })
    const [count, speed, rawTimeLeft] = cache.GetPendingEventMetrics()
    lines.push({ text: `${formatCount(count)} events left`, color: YELLOW })
    if (rawTimeLeft >= 0) {
      const timeLeft = math.floor(rawTimeLeft / 60)
      let speedText: string
      if (speed < 100) {
        const tenths = math.floor(speed * 10 + 0.5)
        speedText = tostring(math.floor(tenths / 10)) + "." + tostring(tenths % 10)
      } else {
        speedText = tostring(math.floor(speed))
      }
      lines.push({
        text: zo_strformat(
          "<<1[less than a minute/one minute/$d minutes]>> remaining (<<2>> events per second)",
          timeLeft,
          speedText
        ),
        color: YELLOW,
      })
    } else {
      lines.push({ text: "Calculating time remaining...", color: YELLOW })
    }
    this.RegisterForUpdate()
    shouldUnregisterForUpdate = false
  } else if (cache.HasLinked()) {
    if (cache.HasCachedEvents()) {
      lines.push({ text: "History has been linked to present events", color: GREEN })
    }
  } else if (cache.HasPendingRequest()) {
    lines.push({ text: "Waiting for request to be sent", color: RED })
  } else {
    lines.push({ text: "History has not linked to present events yet", color: RED })
    lines.push({ text: `Unlinked events: ${formatCount(cache.GetNumUnlinkedEvents())}` })

    const oldestUnlinkedEventTime = cache.GetOldestUnlinkedEventTime()
    if (oldestUnlinkedEventTime != null) {
      lines.push({ text: `Oldest unlinked event: ${eventTimeOf(oldestUnlinkedEventTime)}` })
    }

    const [progress, missingTime] = cache.GetProgress()
    if (missingTime > 0) {
      const missingTimeText = ZO_FormatTime(missingTime, TIME_FORMAT_STYLE_DESCRIPTIVE_MINIMAL)
      lines.push({ text: `Missing time: ${missingTimeText} (${formatPercent(progress)})` })
    }
  }

  const [names, count, lastSeenTime] = cache.GetProcessorInfo()
  if (count > 0) {
    const suffix = count > 1 ? "s" : ""
    names[names.length] = zo_strformat("<<1>> legacy listener<<2>>", count, suffix)
  }
  if (names.length > 0) {
    lines.push({ text: "Active Processors", role: "label" })
    for (const name of names) lines.push({ text: name })
  } else {
    lines.push({ text: "No active processors", role: "muted" })
    if (lastSeenTime != null && lastSeenTime > 0) {
      lines.push({
        text: `Last processor seen: ${ZO_FormatDurationAgo(GetTimeStamp() - lastSeenTime)}`,
      })
    }
  }

  if (shouldUnregisterForUpdate) {
    this.UnregisterForUpdate()
  }
}

GuildHistoryStatusTooltip.SetupForGuild = function (this, cache) {
  this.lines.push(...managedLines(cache))
  this.lines.push({ text: "For progress details check each category", role: "muted" })
}

GuildHistoryStatusTooltip.RegisterForUpdate = function (this) {
  if (this.updateHandle == null) {
    this.updateHandle = internal.RegisterForUpdate(TOOLTIP_UPDATE_INTERVAL, () => {
      this.Show(asControl(this.target), this.cache)
    })
  }
}

GuildHistoryStatusTooltip.UnregisterForUpdate = function (this) {
  if (this.updateHandle != null) {
    internal.UnregisterForUpdate(this.updateHandle)
    this.updateHandle = undefined
  }
}

GuildHistoryStatusTooltip.ShowText = function (this, target, text) {
  showLines(target, [{ text }])
  this.target = target
  this.UnregisterForUpdate()
}

GuildHistoryStatusTooltip.Hide = function (this) {
  hidePopover()
  ClearTooltip(InformationTooltip)
  this.target = undefined
  this.cache = undefined
  this.UnregisterForUpdate()
}

GuildHistoryStatusTooltip.GetTarget = function (this) {
  return this.target
}
