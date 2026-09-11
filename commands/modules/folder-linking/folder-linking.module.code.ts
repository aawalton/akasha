import { lstatSync, mkdirSync, readFileSync, rmSync, symlinkSync } from "node:fs"
import { dirname, join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { FileMove } from "akasha/commands/modules/path-moving/path-moving.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { textAt, valueIn } from "akasha/pages/value/page-value.module.code.ts"

const LINKED_AT = "linkedAt"

const UNDER_HOME = "~/"

const TS = "ts"

export type Linking = {
  readonly said: readonly string[]
  readonly wrong: readonly string[]
}

export const NOTHING_LINKED: Linking = { said: [], wrong: [] }

export type Asked = {
  readonly folder: string
  readonly at: string
}

export function atHome(said: string, home: string): string {
  return said.startsWith(UNDER_HOME) ? join(home, said.slice(UNDER_HOME.length)) : said
}

function pageNamed(path: string): boolean {
  const said = partedIn(path)
  return said !== null && said.sections.length === 0 && said.held === TS
}

export function askedAt(root: string, path: string, home: string): Asked | null {
  if (!pageNamed(path)) return null
  const body = readFileSync(join(root, path), "utf8")
  if (!body.includes(LINKED_AT)) return null
  const value = valueIn(body)
  if (value === null) return null
  const said = textAt(value, LINKED_AT)
  if (said === null || said === "") return null
  return { folder: dirname(path), at: atHome(said, home) }
}

export function placedAt(root: string, asked: Asked): string {
  const held = lstatSync(asked.at, { throwIfNoEntry: false })
  if (held !== undefined && !held.isSymbolicLink()) {
    throw new Error(`${asked.at} is no link, so what is there is left as it is`)
  }
  if (held !== undefined) rmSync(asked.at)
  mkdirSync(dirname(asked.at), { recursive: true })
  symlinkSync(join(root, asked.folder), asked.at, "dir")
  return `linked ${asked.at} to ${asked.folder}`
}

export function linkedOver(root: string, moves: readonly FileMove[], home: string): Linking {
  const said: string[] = []
  const wrong: string[] = []
  const seen = new Set<string>()
  for (const one of moves) {
    try {
      const asked = askedAt(root, one.to, home)
      if (asked === null || seen.has(asked.at)) continue
      seen.add(asked.at)
      said.push(placedAt(root, asked))
    } catch (thrown) {
      wrong.push(`${one.to} moved and the link to its folder was not placed — ${whyOf(thrown)}`)
    }
  }
  return { said, wrong }
}
