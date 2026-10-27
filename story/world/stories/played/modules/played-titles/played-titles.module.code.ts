import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { characterTitle } from "akasha/story/world/mechanics/titles/character-title/character-title.page-type.ts"
import {
  type BeatOverlay,
  overlaidRows,
} from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
import {
  askedLoudly,
  titlesOf,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import {
  namedIn,
  revealedRows,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const CHARACTER_KEY = "character"

const WORLD_TITLE_KEY = "world-title"

const UNREVEALED_KEY = "unrevealed"

const PARTED = "/"

export function titlesHeldIn(
  rows: readonly QueryRow[],
  titles: ReadonlyMap<string, string>
): readonly string[] {
  const named: string[] = []
  for (const row of rows) {
    const address = textIn(row.values[WORLD_TITLE_KEY])
    if (address === null || address === "") continue
    const name = titles.get(address) ?? address.slice(address.lastIndexOf(PARTED) + 1)
    if (!named.includes(name)) named.push(name)
  }
  return named
}

export async function titlesHeldOf(
  character: string,
  overlay: BeatOverlay
): Promise<readonly string[]> {
  const asked = await askedLoudly({
    "page-type": characterTitle.slug,
    where: { character: { is: character } },
    keys: [TYPE_KEY, SLUG_KEY, CHARACTER_KEY, WORLD_TITLE_KEY, UNREVEALED_KEY],
  })
  const held = asked.ok ? revealedRows(asked.answer.rows) : []
  const rows = overlaidRows(held, characterTitle.slug, overlay)
  if (rows.length === 0) return []
  const { titles } = await titlesOf(namedIn(rows, [WORLD_TITLE_KEY]))
  return titlesHeldIn(rows, titles)
}
