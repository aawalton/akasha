"use client"

import type { PageTypeIdBySlug } from "@akasha/pages-ui/supabase/view-data-of-page"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { useEffect, useState } from "react"

export const PAGE_TYPE_DIRECTORY_PATH = "/api/pages/page-type"

export function readPageTypeDirectory(body: unknown): ReadonlyMap<string, string> | null {
  if (!isRecord(body)) return null
  const rows = body.rows
  if (!Array.isArray(rows)) return null
  const bySlug = new Map<string, string>()
  for (const row of rows) {
    if (!isRecord(row)) continue
    const { id, slug } = row
    if (typeof id !== "string" || id === "") continue
    if (typeof slug !== "string" || slug === "") continue
    bySlug.set(slug, id)
  }
  return bySlug
}

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>

let known: ReadonlyMap<string, string> | null = null
let asking: Promise<ReadonlyMap<string, string> | null> | null = null

export function forgetPageTypeDirectory(): undefined {
  known = null
  asking = null
  return undefined
}

export async function askPageTypeDirectory(
  fetchImpl: Fetcher = fetch
): Promise<ReadonlyMap<string, string> | null> {
  if (known !== null) return known
  asking ??= (async () => {
    try {
      const response = await fetchImpl(PAGE_TYPE_DIRECTORY_PATH, {
        headers: { accept: "application/json" },
      })
      if (!response.ok) {
        console.warn(
          `pages-ui: the page type directory answered ${response.status} at ${PAGE_TYPE_DIRECTORY_PATH}, so a page type held only as a file stays unresolvable`
        )
        return null
      }
      const read = readPageTypeDirectory(await response.json())
      if (read === null) {
        console.warn(
          `pages-ui: the page type directory came in a shape this reader cannot read at ${PAGE_TYPE_DIRECTORY_PATH}`
        )
        return null
      }
      known = read
      return read
    } catch (err: unknown) {
      console.warn(
        `pages-ui: the page type directory went unasked at ${PAGE_TYPE_DIRECTORY_PATH}`,
        err
      )
      return null
    } finally {
      asking = null
    }
  })()
  return asking
}

export function usePageTypeDirectory(): PageTypeIdBySlug {
  const [bySlug, setBySlug] = useState<ReadonlyMap<string, string> | null>(known)

  useEffect(() => {
    if (bySlug !== null) return
    let live = true
    void askPageTypeDirectory().then((read) => {
      if (live && read !== null) setBySlug(read)
    })
    return () => {
      live = false
    }
  }, [bySlug])

  return (pageTypeSlug: string): string | undefined => bySlug?.get(pageTypeSlug)
}
