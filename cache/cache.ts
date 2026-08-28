import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const ANSWERS = "answers"

const SUFFIX = ".json"

export type Key = {
  readonly kind: string
  readonly name: string
  readonly mark: string
  readonly subject: string
}

function pathOf(key: Key): string {
  return `${key.kind}/${key.name}/${key.mark}/${key.subject}${SUFFIX}`
}

export function answersAt(root: string): string {
  const dir = execFileSync("git", ["-C", root, "rev-parse", "--absolute-git-dir"], {
    encoding: "utf8",
  }).trim()
  return join(dir, ANSWERS)
}

export function answerAt(at: string, key: Key): unknown {
  const file = join(at, pathOf(key))
  if (!existsSync(file)) return null
  return JSON.parse(readFileSync(file, "utf8"))
}

export function cacheAnswer(at: string, key: Key, answer: unknown): void {
  const file = join(at, pathOf(key))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(answer))
}

/**
 * Every answer filed under one name at one mark, keyed by the subject each was filed against.
 *
 * A MARK NOTHING WAS FILED UNDER ANSWERS `null` rather than an empty map, so a reader can tell a
 * cache that holds nothing from one that holds nothing for this question.
 */
export function answersUnder(
  at: string,
  kind: string,
  name: string,
  mark: string
): ReadonlyMap<string, unknown> | null {
  const under = join(at, kind, name, mark)
  if (!existsSync(under)) return null
  const found = new Map<string, unknown>()
  for (const file of readdirSync(under)) {
    if (!file.endsWith(SUFFIX)) continue
    found.set(file.slice(0, -SUFFIX.length), JSON.parse(readFileSync(join(under, file), "utf8")))
  }
  return found
}

/**
 * Every name under one kind that nothing claims any more, removed.
 *
 * `sweep` REACHES THE MARKS UNDER ONE NAME AND NOTHING REACHED A NAME ITSELF, so renaming a held
 * answer left every answer filed under the old one on disk with nothing that would ever remove it:
 * 44MB under `said/typescript/` survived that producer becoming `import`.
 *
 * KNOWING NO NAMES REMOVES NOTHING, because a caller that cannot say what is live must not be read
 * as saying nothing is.
 */
export function forget(at: string, kind: string, live: readonly string[]): void {
  if (live.length === 0) return
  const under = join(at, kind)
  if (!existsSync(under)) return
  const keeping = new Set(live)
  for (const name of readdirSync(under)) {
    if (keeping.has(name)) continue
    rmSync(join(under, name), { recursive: true, force: true })
  }
}

export function sweep(at: string, kind: string, name: string, keeping: string): void {
  const under = join(at, kind, name)
  if (!existsSync(under)) return
  for (const mark of readdirSync(under)) {
    if (mark === keeping) continue
    rmSync(join(under, mark), { recursive: true, force: true })
  }
}
