import type { SlotDef } from "akasha/code/editor/extension/modules/status-bar-slot-types/status-bar-slot-types.module.code.ts"
import { SILVER_HEX } from "akasha/code/editor/extension/modules/status-bar-theme/status-bar-theme.module.code.ts"

function formatPct(v: number | null): string {
  return v === null ? "—" : `${Math.floor(v)}%`
}

function formatGb(v: number | null): string {
  return v === null ? "—" : `${v.toFixed(1)} GB`
}

const RAW_SLOTS: readonly SlotDef[] = [
  {
    kind: "workstation",
    id: "opsStatusBar.workstation.processor",
    priority: 0,
    label: "processor use",
    hex: SILVER_HEX,
    read: (w) => formatPct(w.processorPct),
  },
  {
    kind: "workstation",
    id: "opsStatusBar.workstation.memory",
    priority: 0,
    label: "memory available",
    hex: SILVER_HEX,
    read: (w) => formatGb(w.memoryGb),
  },

  { kind: "separator", id: "opsStatusBar.sep.workstationUsage", priority: 0 },

  {
    kind: "usage",
    id: "opsStatusBar.usage.session",
    priority: 0,
    label: "session usage",
    hex: SILVER_HEX,
    read: (u) => formatPct(u.sessionPct),
  },
  {
    kind: "usage",
    id: "opsStatusBar.usage.weekly",
    priority: 0,
    label: "weekly usage",
    hex: SILVER_HEX,
    read: (u) => formatPct(u.weeklyPct),
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

  { kind: "separator", id: "opsStatusBar.sep.attributesLuck", priority: 0 },

  {
    kind: "stoplights",
    id: "opsStatusBar.luckStoplights",
    priority: 0,
    section: "luck",
  },

  { kind: "separator", id: "opsStatusBar.sep.luckInbox", priority: 0 },

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
