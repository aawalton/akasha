import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { useMatches } from "react-router"

const SITE_ICON = "/favicon.svg"

type Matched = { readonly data: unknown } | undefined

export function tabIconHref(matches: readonly Matched[]): string {
  for (const match of [...matches].reverse()) {
    const data = match?.data
    if (!isRecord(data) || typeof data.faviconIdSuffix !== "string") continue
    const icon = typeof data.faviconIcon === "string" ? data.faviconIcon : ""
    return `/api/nav-icon/${data.faviconIdSuffix}?icon=${encodeURIComponent(icon)}`
  }
  return SITE_ICON
}

export function TabIcon() {
  return <link rel="icon" href={tabIconHref(useMatches())} type="image/svg+xml" sizes="any" />
}
