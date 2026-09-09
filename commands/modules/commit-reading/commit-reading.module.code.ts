import { closeSync, fstatSync, mkdtempSync, openSync, readSync, rmSync } from "node:fs"
import { join } from "node:path"
import { ran } from "@akasha/utils/run/running"
import { SCRATCH_AT } from "../../../command-system/scratching/scratching.module.code.ts"
import { oneLine } from "../fault-saying/fault-saying.module.code.ts"

const CAT_FILE = "akasha-cat-file-"

const SAYING = "saying"

const TROUBLE = "trouble"

const TROUBLE_AT_MOST = 4096

const COMMIT = "^{commit}"

const TREE = "^{tree}"

const TREE_MODE = "40000"

const SPACE = 32

const NUL = 0

const MISSING = " missing"

const RECORD = /^[0-9a-f]{40,64} [a-z]+ [0-9]+$/

const NEWLINE = 10

const HELD_AT_FIRST = 65536

const READ_AT_MOST = 64 * 1024 * 1024

type Said = {
  readonly oid: string
  readonly bytes: Uint8Array
}

type Entry = {
  readonly oid: string
  readonly tree: boolean
}

type Walked = ReadonlyMap<string, Entry>

type Reading = {
  readonly root: string
  readonly dir: string
  readonly troubleFd: number
  readonly rfd: number
  readonly bases: Set<string>
  readonly trees: Map<string, Walked | null>
  readonly asked: (name: string) => undefined
  readonly ended: () => undefined
  held: Buffer
  from: number
  to: number
  took: number
}

let reading: Reading | null = null

export function readingEnded(): undefined {
  const held = reading
  reading = null
  if (held === null) return
  held.ended()
  rmSync(held.dir, { recursive: true, force: true })
}

process.on("exit", readingEnded)

function readerOn(root: string): Reading {
  const dir = mkdtempSync(join(SCRATCH_AT, CAT_FILE))
  const sayingAt = join(dir, SAYING)
  const troubleAt = join(dir, TROUBLE)
  ran(["mkfifo", sayingAt])
  const trouble = openSync(troubleAt, "w+")
  const saying = openSync(sayingAt, "r+")
  const kid = Bun.spawn(["git", "-C", root, "cat-file", "--batch", "-z"], {
    stdin: "pipe",
    stdout: saying,
    stderr: trouble,
  })
  kid.unref()
  const rfd = openSync(sayingAt, "r")
  closeSync(saying)
  rmSync(dir, { recursive: true, force: true })
  return {
    root,
    dir,
    troubleFd: trouble,
    rfd,
    bases: new Set<string>(),
    trees: new Map<string, Walked | null>(),
    held: Buffer.alloc(HELD_AT_FIRST),
    from: 0,
    to: 0,
    took: 0,
    asked: (name) => {
      kid.stdin.write(`${name}\0`)
      kid.stdin.flush()
    },
    ended: () => {
      try {
        kid.stdin.end()
      } catch {}
      for (const one of [rfd, trouble]) {
        try {
          closeSync(one)
        } catch {}
      }
      kid.kill()
    },
  }
}

function readingIn(root: string): Reading {
  if (reading !== null && reading.root === root && reading.took < READ_AT_MOST) return reading
  readingEnded()
  reading = readerOn(root)
  return reading
}

function troubledBy(held: Reading, said: string): Error {
  let why = ""
  try {
    const size = Math.min(fstatSync(held.troubleFd).size, TROUBLE_AT_MOST)
    if (size > 0) {
      const text = Buffer.alloc(size)
      readSync(held.troubleFd, text, 0, size, 0)
      why = text.toString("utf8").trim()
    }
  } catch {}
  const also = why === "" ? "" : ` and said \`${oneLine(why)}\``
  return new Error(`\`git cat-file --batch\` over ${held.root} ${said}${also}`)
}

function filled(held: Reading): undefined {
  if (held.to === held.held.length) {
    if (held.from > 0) {
      held.held.copyWithin(0, held.from, held.to)
      held.to -= held.from
      held.from = 0
    } else {
      const grown = Buffer.alloc(held.held.length * 2)
      held.held.copy(grown)
      held.held = grown
    }
  }
  const read = readSync(held.rfd, held.held, held.to, held.held.length - held.to, null)
  if (read > 0) {
    held.to += read
    held.took += read
    return
  }
  throw troubledBy(held, "answered nothing")
}

function lineOf(held: Reading): string {
  for (;;) {
    const end = held.held.indexOf(NEWLINE, held.from)
    if (end >= 0 && end < held.to) {
      const said = held.held.toString("utf8", held.from, end)
      held.from = end + 1
      return said
    }
    filled(held)
  }
}

function bytesOf(held: Reading, want: number): Uint8Array {
  while (held.to - held.from < want) filled(held)
  const said = new Uint8Array(held.held.subarray(held.from, held.from + want))
  held.from += want
  return said
}

function recordOf(held: Reading, name: string): Said | null {
  held.asked(name)
  const head = lineOf(held)
  if (!RECORD.test(head)) {
    if (head.endsWith(MISSING)) return null
    throw troubledBy(held, `answered \`${oneLine(head)}\``)
  }
  const bytes = bytesOf(held, Number(head.slice(head.lastIndexOf(" ") + 1)))
  bytesOf(held, 1)
  return { oid: head.slice(0, head.indexOf(" ")), bytes }
}

function entriesIn(said: Said): Walked {
  const width = said.oid.length / 2
  const held = Buffer.from(said.bytes)
  const found = new Map<string, Entry>()
  let at = 0
  while (at < held.length) {
    const gap = held.indexOf(SPACE, at)
    const end = gap < 0 ? -1 : held.indexOf(NUL, gap + 1)
    if (end < 0) break
    found.set(held.toString("utf8", gap + 1, end), {
      oid: held.toString("hex", end + 1, end + 1 + width),
      tree: held.toString("utf8", at, gap) === TREE_MODE,
    })
    at = end + 1 + width
  }
  return found
}

function walkedTo(held: Reading, base: string, at: string): Walked | null {
  if (at === "") {
    const root = recordOf(held, `${base}${TREE}`)
    return root === null ? null : entriesIn(root)
  }
  const cut = at.lastIndexOf("/")
  const one = treesAt(held, base, cut < 0 ? "" : at.slice(0, cut))?.get(at.slice(cut + 1))
  if (one === undefined || !one.tree) return null
  const said = recordOf(held, one.oid)
  return said === null ? null : entriesIn(said)
}

function treesAt(held: Reading, base: string, at: string): Walked | null {
  const key = `${base}:${at}`
  const found = held.trees.get(key)
  if (found !== undefined) return found
  const walked = walkedTo(held, base, at)
  held.trees.set(key, walked)
  return walked
}

function heldAt(held: Reading, base: string, path: string): Uint8Array | null {
  const cut = path.lastIndexOf("/")
  const one = treesAt(held, base, cut < 0 ? "" : path.slice(0, cut))?.get(path.slice(cut + 1))
  if (one === undefined) return null
  const said = recordOf(held, one.oid)
  return said === null ? null : said.bytes
}

export function bodyAt(root: string, base: string, path: string): Uint8Array | null {
  const held = readingIn(root)
  try {
    if (!held.bases.has(base)) {
      if (recordOf(held, `${base}${COMMIT}`) === null) {
        throw new Error(
          `\`${base}\` names no commit in ${root}, so no body could be read against it`
        )
      }
      held.bases.add(base)
    }
    return heldAt(held, base, path)
  } catch (thrown) {
    readingEnded()
    throw thrown
  }
}
