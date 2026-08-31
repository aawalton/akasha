import {
  type Placed,
  spelledIn,
} from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import { indexNamed } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { judgingEachFile, overEachText } from "../../change-walking/change-walking.module.code.ts"

const INDEXES = "akasha/pages-system/indexes/"

const AT = indexNamed()

const SEGMENTS = 3

const MOST = 60

const SAID = "where the index stands is said by `index-reading`, and asked of it rather than spelt"

function shortened(said: string): string {
  return said.length > MOST ? `${said.slice(0, MOST)}…` : said
}

function whole(held: readonly Placed[], at: number): string | null {
  for (let took = 1; took < SEGMENTS && at + took < held.length; took++) {
    const joined = held
      .slice(at, at + took + 1)
      .map((one) => one.text)
      .join("/")
    if (joined.startsWith(AT)) return joined
  }
  return null
}

function found(path: string, text: string): readonly string[] {
  if (path.startsWith(INDEXES)) return []
  const held = spelledIn(path, text)
  const said: string[] = []
  for (let at = 0; at < held.length; at++) {
    const one = held[at]
    if (one === undefined) continue
    if (one.text.includes(AT)) {
      said.push(`\`${shortened(one.text)}\` spells a path into the index — ${SAID}`)
      continue
    }
    const built = whole(held, at)
    if (built === null) continue
    said.push(`\`${shortened(built)}\` builds a path into the index segment by segment — ${SAID}`)
  }
  return said
}

export const reasonsIn = overEachText(found)

export const noIndexPathSpelled = judgingEachFile(reasonsIn)
