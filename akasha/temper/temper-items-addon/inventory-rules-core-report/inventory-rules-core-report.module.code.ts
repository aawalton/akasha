import { requireAt } from "@akasha/utils-narrow/require-at"
import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
export const VALID_REPORT_LEVELS = ["none", "minimal", "verbose"]

const MAX_DISPLAYED_GROUPS = 10

export function getActionReportLevel(): "none" | "minimal" | "verbose" {
  const level = getInventoryConfig().logging?.actionReports
  if (level == null || VALID_REPORT_LEVELS.indexOf(level) === -1) return "verbose"
  return level
}

export function reportAction(prefix: string, links: string[]): undefined {
  const level = getActionReportLevel()
  if (level === "none") return
  const n = links.length
  const noun = n !== 1 ? "items" : "item"
  if (level === "minimal") {
    d(`[${ADDON_NAME}] ${prefix} ${n} ${noun}`)
    return
  }
  d(`[${ADDON_NAME}] ${prefix} ${n} ${noun}: ${formatItemList(links)}`)
}

export function formatItemList(links: string[]): string {
  const entries: { link: string; quality: number; name: string }[] = []
  for (const link of links) {
    const quality = GetItemLinkDisplayQuality(link)
    const rawName = GetItemLinkName(link)
    const name = zo_strformat("<<1>>", rawName)
    entries.push({ link, quality, name })
  }

  table.sort(entries, function (this: void, a, b): boolean {
    if (a.quality !== b.quality) return a.quality > b.quality
    return a.name < b.name
  })

  const parts: string[] = []
  let i = 0
  while (i < entries.length) {
    const current = requireAt(entries, i)
    let count = 1
    while (i + count < entries.length && requireAt(entries, i + count).link === current.link) {
      count++
    }
    parts.push(count > 1 ? `${current.link} x${count}` : current.link)
    i += count
  }

  if (parts.length > MAX_DISPLAYED_GROUPS) {
    const extra = parts.length - MAX_DISPLAYED_GROUPS
    parts.splice(MAX_DISPLAYED_GROUPS)
    parts.push(`+ ${extra} more`)
  }

  return parts.join(", ")
}

export function reportPendingAction(prefix: string, links: string[]): undefined {
  const level = getActionReportLevel()
  if (level === "none") return
  const n = links.length
  const noun = n !== 1 ? "items" : "item"
  if (level === "minimal") {
    d(`[${ADDON_NAME}] Pending: ${prefix} ${n} ${noun}`)
    return
  }
  d(`[${ADDON_NAME}] Pending: ${prefix} ${n} ${noun}: ${formatItemList(links)}`)
}
