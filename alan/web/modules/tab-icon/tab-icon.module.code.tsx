import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { useSyncExternalStore } from "react"
import { useMatches } from "react-router"

const SITE_ICON = "/favicon.svg"

type Matched = { readonly data: unknown } | undefined

type Shown = { readonly icon: string | null }

let shown: Shown | null = null

const hearing = new Set<() => void>()

export function showTabIcon(one: Shown | null): undefined {
  shown = one
  for (const heard of hearing) heard()
  return undefined
}

function heardBy(heard: () => void): () => void {
  hearing.add(heard)
  return () => {
    hearing.delete(heard)
  }
}

function iconHref(icon: string | null): string {
  return icon === null ? SITE_ICON : `/api/icon/${encodeURIComponent(icon)}`
}

export function tabIconHref(matches: readonly Matched[], live: Shown | null = null): string {
  if (live !== null) return iconHref(textIn(live.icon))
  for (const match of [...matches].reverse()) {
    const data = match?.data
    const icon = isRecord(data) ? textIn(data.tabIcon) : null
    if (icon !== null) return iconHref(icon)
  }
  return SITE_ICON
}

export function TabIcon() {
  const matches = useMatches()
  const live = useSyncExternalStore(
    heardBy,
    () => shown,
    () => null
  )
  return <link rel="icon" href={tabIconHref(matches, live)} type="image/svg+xml" sizes="any" />
}
