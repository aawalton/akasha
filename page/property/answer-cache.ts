import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, utimesSync } from "node:fs"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"

const GIT_DIR = ".git"

const ANSWERS_DIR = "pages-answers"

const VERSION = 3

const SUFFIX = ".json"

// What the kept answers are allowed to stand in on disk. Answers worked out from different states
// stand beside one another rather than replacing each other, so nothing in the writing path takes
// an old state away and the set is bounded from outside it. akasha/pages-system/page-answer-sweeping bounds
// it in time, hourly, by taking away what has gone unused for a day. This bounds it in bytes,
// because time alone is no bound when the churn is unbounded: a whole state's answers measured
// 1.24MB in this checkout and a busy hour laid down 20.9MB of them, which is around 500MB in the
// day the sweep waits. 128MB holds about a hundred states, an order of magnitude past the handful
// the agents reading this tree stand on at once, so this only ever acts on a burst.
const BUDGET = 128 * 1024 * 1024

interface Answer {
  readonly version: number
  readonly mark: string
  readonly data: unknown
}

function answersDirIn(root: string): string | null {
  try {
    return statSync(`${root}/${GIT_DIR}`).isDirectory() ? `${root}/${GIT_DIR}/${ANSWERS_DIR}` : null
  } catch {
    return null
  }
}

function heldAt(path: string, mark: string): { readonly data: unknown } | null {
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return null
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null
  const held = parsed as Partial<Answer>
  if (held.version !== VERSION || held.mark !== mark) return null
  return { data: held.data }
}

// An answer is served without being written, so how long it has stood since it was written says
// when it was worked out and not whether anybody still wants it. The two run opposite: the answer
// every read hits is the one that goes longest without being rewritten, so an age read off the
// write is at its oldest exactly where the cache is working. Marking it used on the way out is
// what makes an age mean time since use, for the sweep as much as for here.
function usedAt(path: string): void {
  try {
    const now = new Date()
    utimesSync(path, now, now)
  } catch {
    return
  }
}

interface Standing {
  readonly at: string
  readonly bytes: number
  readonly used: number
}

function standingAt(dir: string, name: string): Standing | null {
  try {
    const one = statSync(`${dir}/${name}`)
    return one.isFile() ? { at: `${dir}/${name}`, bytes: one.size, used: one.mtimeMs } : null
  } catch {
    return null
  }
}

// Only a finished answer is ever weighed or taken away. `writeFileAtomicSync` renames from
// `<path>.tmp-<pid>-<random>`, and another checkout's write may be standing at one of those while
// this runs, so a name that is not an answer is left alone rather than pulled out from under it.
function looseIn(
  dir: string,
  held: string
): { readonly total: number; readonly loose: Standing[] } {
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return { total: 0, loose: [] }
  }
  const loose: Standing[] = []
  let total = 0
  for (const name of names) {
    if (!name.endsWith(SUFFIX)) continue
    const one = standingAt(dir, name)
    if (one === null) continue
    total += one.bytes
    if (name.endsWith(`-${held}${SUFFIX}`)) continue
    loose.push(one)
  }
  return { total, loose }
}

// The state being read is never taken away, whatever it costs, and what is taken is taken in the
// order it was last used, because a state can be returned to and only use says which ones are.
//
// Taking an answer away costs the read that wanted it one working out and costs correctness
// nothing: an answer served from here and an answer worked out from the files are the same answer.
// That is what makes this safe beside the other checkouts reading the same folder. A reader
// holding one of these open keeps reading it through the unlink, and a reader that opens after it
// finds nothing, which `heldAt` already answers as no answer and works out instead.
function prune(dir: string, held: string): void {
  const { total, loose } = looseIn(dir, held)
  if (total <= BUDGET) return
  let left = total
  for (const one of loose.sort((a, b) => a.used - b.used)) {
    if (left <= BUDGET) return
    try {
      rmSync(one.at)
    } catch {
      continue
    }
    left -= one.bytes
  }
}

export function answeredWhole<T, D>(
  root: string,
  mark: string,
  key: string,
  make: () => T,
  put: (made: T) => D,
  take: (data: D) => T,
  keep?: (made: T) => boolean
): T {
  const dir = answersDirIn(root)
  const path =
    dir === null ? null : `${dir}/${key.replace(/[^A-Za-z0-9._-]+/g, "_")}-${mark}${SUFFIX}`
  if (path !== null) {
    const held = heldAt(path, mark)
    if (held !== null) {
      const was = take(held.data as D)
      if (keep === undefined || keep(was)) {
        usedAt(path)
        return was
      }
    }
  }
  const made = make()
  if (dir === null || path === null) return made
  if (keep !== undefined && !keep(made)) return made
  try {
    mkdirSync(dir, { recursive: true })
    writeFileAtomicSync(path, `${JSON.stringify({ version: VERSION, mark, data: put(made) })}\n`)
    prune(dir, mark)
  } catch {
    return made
  }
  return made
}
