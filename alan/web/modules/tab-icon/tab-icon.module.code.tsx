import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { useMatches } from "react-router"

const SITE_ICON = "/favicon.svg"

type Matched = { readonly data: unknown } | undefined

export function tabIconHref(matches: readonly Matched[]): string {
  for (const match of [...matches].reverse()) {
    const data = match?.data
    const icon = isRecord(data) ? textIn(data.tabIcon) : null
    if (icon !== null) return `/api/icon/${encodeURIComponent(icon)}`
  }
  return SITE_ICON
}

export function TabIcon() {
  return <link rel="icon" href={tabIconHref(useMatches())} type="image/svg+xml" sizes="any" />
}
