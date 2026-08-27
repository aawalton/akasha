import type { AutomationRow } from "../pure/types"

export interface AutomationIndex {
  rebuild: (rows: readonly AutomationRow[]) => void
  forPageType: (triggerPageTypeSlug: string) => readonly AutomationRow[]
  size: () => number
}

export function makeAutomationIndex(): AutomationIndex {
  let byPageTypeSlug: Map<string, AutomationRow[]> = new Map()

  return {
    rebuild(rows) {
      const next = new Map<string, AutomationRow[]>()
      for (const row of rows) {
        if (row.triggerPageTypeSlug === null) continue
        const bucket = next.get(row.triggerPageTypeSlug) ?? []
        bucket.push(row)
        next.set(row.triggerPageTypeSlug, bucket)
      }
      byPageTypeSlug = next
    },
    forPageType(triggerPageTypeSlug) {
      return byPageTypeSlug.get(triggerPageTypeSlug) ?? []
    },
    size() {
      let n = 0
      for (const bucket of byPageTypeSlug.values()) n += bucket.length
      return n
    },
  }
}
