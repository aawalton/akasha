"use client"

import { webPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { useMemo } from "react"

const EVERY = 10000

type Fills = Readonly<Record<string, string | number>>

export type Phrase = (slug: string, fills?: Fills) => string

function titlesFrom(rows: readonly Value[]): ReadonlyMap<string, string> {
  const read = new Map<string, string>()
  for (const row of rows) {
    const slug = textAt(row, "slug")
    const title = textAt(row, "title")
    if (slug !== null && title !== null) read.set(slug, title)
  }
  return read
}

function filled(text: string, fills: Fills): string {
  return Object.entries(fills).reduce(
    (out, [name, fill]) => out.split(`{${name}}`).join(String(fill)),
    text
  )
}

export function usePhrase(): Phrase {
  const pages = usePages({ pageTypeSlug: webPhrase.slug, limit: EVERY })
  const phrase = useMemo<Phrase>(() => {
    const titles = titlesFrom(pages.rows)
    return (slug, fills = {}) => filled(titles.get(slug) ?? "", fills)
  }, [pages.rows])
  if (pages.error !== null) throw pages.error
  return phrase
}
