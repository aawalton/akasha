import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugAt, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "reminder"

export type Found = {
  readonly path: string
  readonly slug: string
  readonly to: string
  readonly from: string
  readonly schedule: string
  readonly text: string
}

export function everyReminder(root: string): readonly Found[] {
  const found: Found[] = []
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const slug = textAt(one.value, "slug")
    const to = slugAt(one.value, "to")
    const from = slugAt(one.value, "from")
    const schedule = textAt(one.value, "schedule")
    const text = textAt(one.value, "text")
    if (slug === null || to === null || schedule === null || text === null) continue
    found.push({ path: one.path, slug, to, from: from ?? to, schedule, text })
  }
  return found
}
