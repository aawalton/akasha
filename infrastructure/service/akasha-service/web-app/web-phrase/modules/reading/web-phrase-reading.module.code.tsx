"use client"

import {
  type Phrase,
  phrasingOf,
  type SeededPhrase,
} from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
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

function titlesFrom(rows: readonly Value[]): ReadonlyMap<string, string> {
  const read = new Map<string, string>()
  for (const row of rows) {
    const slug = textAt(row, "slug")
    const title = textAt(row, "title")
    if (slug !== null && title !== null) read.set(slug, title)
  }
  return read
}

function seededTitles(seed: readonly SeededPhrase[]): ReadonlyMap<string, string> {
  return new Map(seed.map((one) => [one.slug, one.title]))
}

export function useSeededPhrase(): Phrase {
  const seed = useContext(Seeded)
  return useMemo(() => phrasingOf(seededTitles(seed)), [seed])
}

export function usePhrase(): Phrase {
  const pages = usePages({ pageTypeSlug: webPhrase.slug, limit: EVERY })
  const seed = useContext(Seeded)
  const unread = pages.isLoading || pages.error !== null
  const phrase = useMemo<Phrase>(
    () => phrasingOf(unread ? seededTitles(seed) : titlesFrom(pages.rows)),
    [unread, pages.rows, seed]
  )
  if (pages.error !== null && seed.length === 0) throw pages.error
  return phrase
}
