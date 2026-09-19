import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  lyricsFieldsOf,
  pickBestLyrics,
  type SongLyrics,
} from "akasha/alan/music/catalog/modules/lrclib-map/lrclib-map.module.code.ts"
import type { LrclibRecord } from "akasha/alan/music/catalog/modules/lrclib-schema/lrclib-schema.module.code.ts"
import { WRITE } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const TXT = "txt"

const LYRICS = "lyrics"

const SYNCED_LYRICS = "synced-lyrics"

export type Worded = { readonly words: SongLyrics | null; readonly unread: boolean }

export type Searching = (title: string, artistName: string) => Promise<readonly LrclibRecord[]>

export async function wordsFor(
  search: Searching,
  title: string,
  artistName: string
): Promise<Worded> {
  try {
    const best = pickBestLyrics(await search(title, artistName), title, artistName)
    return { words: best === null ? null : lyricsFieldsOf(best), unread: false }
  } catch {
    return { words: null, unread: true }
  }
}

function heldAt(root: string, at: string): string | null {
  const full = join(root, at)
  return existsSync(full) ? readFileSync(full, "utf8") : null
}

export function wordEdits(root: string, at: string, words: SongLyrics): readonly Asking[] {
  const edits: Asking[] = []
  for (const [propertySlug, text] of [
    [LYRICS, words.lyrics],
    [SYNCED_LYRICS, words.syncedLyrics],
  ] as const) {
    if (text === null) continue
    const beside = besideAt(at, propertySlug, TXT)
    if (beside === null) continue
    if (heldAt(root, beside) === text) continue
    edits.push({ at: WRITE, given: { at: beside, body: text } })
  }
  return edits
}
