import { closeSync, mkdtempSync, openSync, readFileSync, readSync, rmSync, statSync } from "node:fs"
import { join } from "node:path"
import { oneLine } from "../fault-saying/fault-saying.module.code.ts"
import { SCRATCH_AT } from "../scratching/scratching.module.code.ts"

const CAT_FILE = "akasha-cat-file-"

const SAYING = "saying"

const TROUBLE = "trouble"

const COMMIT = "^{commit}"

const MISSING = " missing"

const RECORD = /^[0-9a-f]{40,64} [a-z]+ [0-9]+$/

const NEWLINE = 10

const HELD_AT_FIRST = 65536

const SPUN_BEFORE_WAITING = 20000

const SPUN_AT_MOST = 60000

const WAITED_FOR_A_BODY = 1

const READ_AT_MOST = 64 * 1024 * 1024

type Reading = {
  readonly root: string
  readonly dir: string
  readonly troubleAt: string
  readonly rfd: number
  readonly bases: Set<string>
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
  const saying = openSync(sayingAt, "w")
  const trouble = openSync(troubleAt, "w")
  const kid = Bun.spawn(["git", "-C", root, "cat-file", "--batch", "-z"], {
    stdin: "pipe",
    stdout: saying,
    stderr: trouble,
  })
  kid.unref()
  const rfd = openSync(sayingAt, "r")
  return {
    root,
    dir,
    troubleAt,
    rfd,
    bases: new Set<string>(),
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
      for (const one of [rfd, saying, trouble]) {
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
    why = readFileSync(held.troubleAt, "utf8").trim()
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
  for (let spun = 0; spun < SPUN_AT_MOST; spun++) {
    const read = readSync(held.rfd, held.held, held.to, held.held.length - held.to, held.took)
    if (read > 0) {
      held.to += read
      held.took += read
      return
    }
    if (spun < SPUN_BEFORE_WAITING) continue
    if (statSync(held.troubleAt).size > 0) throw troubledBy(held, "answered nothing")
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, WAITED_FOR_A_BODY)
  }
  throw troubledBy(held, "answered nothing in time")
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

function recordOf(held: Reading, name: string): Uint8Array | null {
  held.asked(name)
  const head = lineOf(held)
  if (!RECORD.test(head)) {
    if (head.endsWith(MISSING)) return null
    throw troubledBy(held, `answered \`${oneLine(head)}\``)
  }
  const said = bytesOf(held, Number(head.slice(head.lastIndexOf(" ") + 1)))
  bytesOf(held, 1)
  return said
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
    return recordOf(held, `${base}:${path}`)
  } catch (thrown) {
    readingEnded()
    throw thrown
  }
}
