import { mkdirSync, readFileSync, statSync } from "node:fs"
import { writeWhole } from "../../write-whole/write-whole.ts"

const GIT_DIR = ".git"

const ANSWERS_DIR = "pages-answers"

const VERSION = 3

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

export function answeredWhole<T, D>(
  root: string,
  mark: string,
  key: string,
  make: () => T,
  put: (made: T) => D,
  take: (data: D) => T
): T {
  const dir = answersDirIn(root)
  const path = dir === null ? null : `${dir}/${key.replace(/[^A-Za-z0-9._-]+/g, "_")}-${mark}.json`
  if (path !== null) {
    const held = heldAt(path, mark)
    if (held !== null) return take(held.data as D)
  }
  const made = make()
  if (dir === null || path === null) return made
  try {
    mkdirSync(dir, { recursive: true })
    writeWhole(path, `${JSON.stringify({ version: VERSION, mark, data: put(made) })}\n`)
  } catch {
    return made
  }
  return made
}
