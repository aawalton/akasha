"use client"

import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { useEffect, useState } from "react"

const ID_KEY = "id"

const PROSE_KEY = "prose"

const PROSE_ENDING = "txt"

const ROWS_PARTED_BY = " "

const NO_PROSE: ReadonlyMap<string, string> = new Map()

async function readPlayedProse(
  pageTypeSlug: string,
  ids: readonly string[]
): Promise<ReadonlyMap<string, string>> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { id: { in: [...ids] } },
    keys: [ID_KEY, PROSE_KEY],
    files: [PROSE_KEY],
  })
  if (!asked.ok) return NO_PROSE
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

export function usePlayedProse(pageTypeSlug: string, ids: readonly string[]): PlayedProse {
  const asked = ids.join(ROWS_PARTED_BY)
  const [played, setPlayed] = useState<PlayedProse>(NOTHING_READ)

  useEffect(() => {
    if (asked === "") {
      setPlayed(NOTHING_READ)
      return
    }
    let alive = true
    const named = asked.split(ROWS_PARTED_BY)
    void (async () => {
      const held = await readPlayedProse(pageTypeSlug, named).catch(() => NO_PROSE)
      if (alive) setPlayed({ prose: held, read: new Set(named) })
    })()
    return () => {
      alive = false
    }
  }, [pageTypeSlug, asked])

  return played
}
