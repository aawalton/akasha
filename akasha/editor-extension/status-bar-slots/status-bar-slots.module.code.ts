import type { SlotDef } from "../status-bar-slot-types/status-bar-slot-types.module.code.ts"
import { BLUE_HEX, PURPLE_HEX } from "../status-bar-theme/status-bar-theme.module.code.ts"

function formatUsagePct(v: number | null): string {
  return v === null ? "—" : `${Math.floor(v)}%`
}

const RAW_SLOTS: readonly SlotDef[] = [
  {
    kind: "usage",
    id: "opsStatusBar.usage.session",
    priority: 0,
    label: "session usage",
    hex: BLUE_HEX,
    read: (u) => formatUsagePct(u.sessionPct),
  },
  {
    kind: "usage",
    id: "opsStatusBar.usage.weekly",
    priority: 0,
    label: "weekly usage",
    hex: PURPLE_HEX,
    read: (u) => formatUsagePct(u.weeklyPct),
  },

  { kind: "separator", id: "opsStatusBar.sep.usageUpkeep", priority: 0 },

  {
    kind: "stoplights",
    id: "opsStatusBar.upkeepStoplights",
    priority: 0,
    section: "upkeep",
  },

  { kind: "separator", id: "opsStatusBar.sep.upkeepAttributes", priority: 0 },

  {
    kind: "stoplights",
    id: "opsStatusBar.attributesStoplights",
    priority: 0,
    section: "attributes",
  },

  { kind: "separator", id: "opsStatusBar.sep.attributesInbox", priority: 0 },

  {
    kind: "stoplights",
    id: "opsStatusBar.inboxStoplights",
    priority: 0,
    section: "inbox",
  },
]

export const SLOTS: readonly SlotDef[] = RAW_SLOTS.map((slot, i) => ({
  ...slot,
  priority: (RAW_SLOTS.length - i) * 10,
}))
