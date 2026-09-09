import { dirname } from "node:path"
import { type Placed, spelledIn } from "@akasha/code/code-specifier"
import { indexNamed } from "@akasha/indexes"
import { pageNamed } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import {
  type Body,
  judgingEach,
  overEachText,
  pageTypesFor,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const PACKAGE = "workspace-package"

const INDEX = "index"

const AT = indexNamed()

const SEGMENTS = 3

const MOST = 60

const SAID = "where the index sits is said by `index-reading`, and asked of it rather than spelt"

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

function found(
  under: string,
  pageTypes: ReadonlySet<string>,
  path: string,
  text: string
): readonly string[] {
  if (path.startsWith(under)) return []
  if (pageNamed(path, pageTypes)) return []
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

export function reasonsOver(
  at: string,
  pageTypes: ReadonlySet<string>
): (given: Body) => readonly string[] {
  return overEachText((path, text) => found(at, pageTypes, path, text))
}

const INDEXES = new WeakMap<Shadow, string>()

function indexesAt(shadow: Shadow): string {
  const held = INDEXES.get(shadow)
  if (held !== undefined) return held
  const one = shadow.index.listedAt(PACKAGE, INDEX)[0]
  if (one === undefined) {
    throw new Error(`the index files no \`${PACKAGE}/${INDEX}\`, so where it sits is unknown`)
  }
  const made = `${dirname(one.path)}/`
  INDEXES.set(shadow, made)
  return made
}

export const noIndexPathSpelled = judgingEach(TEXTS, (given, shadow) =>
  found(indexesAt(shadow), pageTypesFor(shadow), given.path, given.text)
)
