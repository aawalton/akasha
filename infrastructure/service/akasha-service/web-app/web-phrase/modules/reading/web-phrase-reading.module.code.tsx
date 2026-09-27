"use client"

import type { SeededPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { webPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { createContext, type ReactNode, useContext, useMemo } from "react"

const NO_SEED: readonly SeededPhrase[] = []

const Seeded = createContext<readonly SeededPhrase[]>(NO_SEED)

export function PhrasesSeeded({
  phrases,
  children,
}: {
  phrases: readonly SeededPhrase[]
  children: ReactNode
}) {
  return <Seeded.Provider value={phrases}>{children}</Seeded.Provider>
}

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
  const seed = useContext(Seeded)
  const phrase = useMemo<Phrase>(() => {
    const titles = pages.isLoading
      ? new Map(seed.map((one) => [one.slug, one.title]))
      : titlesFrom(pages.rows)
    return (slug, fills = {}) => filled(titles.get(slug) ?? "", fills)
  }, [pages.isLoading, pages.rows, seed])
  if (pages.error !== null) throw pages.error
  return phrase
}
