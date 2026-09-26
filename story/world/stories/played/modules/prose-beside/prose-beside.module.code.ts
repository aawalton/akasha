"use client"

import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useEffect, useState } from "react"

const ID_KEY = "id"

const PROSE_KEY = "prose"

const PROSE_ENDING = "txt"

const ROWS_PARTED_BY = " "

const NO_PROSE: ReadonlyMap<string, string> = new Map()

async function readPlayedProse(
  pageTypeSlug: string,
  ids: readonly string[]
): Promise<ReadonlyMap<string, string> | null> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { id: { in: [...ids] } },
    keys: [ID_KEY, PROSE_KEY],
    files: [PROSE_KEY],
  })
  if (!asked.ok) return null
  const held = new Map<string, string>()
  for (const row of asked.answer.rows) {
    const id = row.values[ID_KEY]
    const prose = row.values[PROSE_KEY]
    if (typeof id !== "string" || typeof prose !== "string") continue
    if (prose === "" || prose === PROSE_ENDING) continue
    held.set(id, prose)
  }
  return held
}

export interface PlayedProse {
  readonly prose: ReadonlyMap<string, string>
  readonly read: ReadonlySet<string>
}

const NOTHING_READ: PlayedProse = { prose: NO_PROSE, read: new Set() }

export function proseOver(
  held: PlayedProse,
  said: ReadonlyMap<string, string> | null,
  named: readonly string[]
): PlayedProse {
  if (said !== null) return { prose: said, read: new Set(named) }
  if (named.every((id) => held.read.has(id))) return held
  return { prose: NO_PROSE, read: new Set(named) }
}

export function usePlayedProse(pageTypeSlug: string, ids: readonly string[]): PlayedProse {
  const asked = ids.join(ROWS_PARTED_BY)
  const [played, setPlayed] = useState<PlayedProse>(NOTHING_READ)

  useEffect(() => {
    if (asked === "") {
      setPlayed(NOTHING_READ)
      return
    }
    let alive = true
    let asking = false
    let owed = false
    const named = asked.split(ROWS_PARTED_BY)
    const ask = (): undefined => {
      if (asking) {
        owed = true
        return undefined
      }
      asking = true
      void readPlayedProse(pageTypeSlug, named)
        .catch(() => null)
        .then((said) => {
          asking = false
          if (!alive) return
          setPlayed((held) => proseOver(held, said, named))
          if (owed) {
            owed = false
            ask()
          }
        })
      return undefined
    }
    ask()
    let watches: readonly PageWatch[] = []
    void getPagesStore().then((store) => {
      if (alive) watches = named.map((id) => store.watchPage(pageTypeSlug, id, ask))
    })
    const timer = setInterval(() => {
      if (!watches.every((one) => one.live())) ask()
    }, FILE_BACKING_POLL_MS)
    return () => {
      alive = false
      clearInterval(timer)
      for (const one of watches) one.release()
    }
  }, [pageTypeSlug, asked])

  return played
}
