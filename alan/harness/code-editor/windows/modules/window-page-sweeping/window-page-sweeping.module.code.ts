import { rmSync } from "node:fs"
import { join } from "node:path"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  parseSeatProcKey,
  statedProcessPresence,
} from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import { landRemovals } from "akasha/changes/modules/gated-landing/gated-landing.module.code.ts"
import { fileStemOf } from "akasha/pages/identity/modules/file-page/file-page.module.code.ts"
import { fileKeysAt } from "akasha/pages/index/modules/entries/index-entries.module.code.ts"
import { everyOfType } from "akasha/pages/index/modules/reading/index-reading.module.code.ts"
import { besideOf } from "akasha/pages/modules/beside/page-beside.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"

const WINDOW_TYPE = "code-editor-window"

const WRITER = "window-page-sweeper"

const NAMES_A_WINDOW = "window-"

const REMOVE = "--remove"

const ABSENT = "absent"

const NOTHING = 0

export interface WindowFacts {
  readonly relPath: string
  readonly slug: string
  readonly procKey: string
}

export interface WindowsRead {
  readonly windows: readonly WindowFacts[]
  readonly unjudged: readonly string[]
}

export function procKeyOfWindowSlug(slug: string): string | null {
  if (!slug.startsWith(NAMES_A_WINDOW)) return null
  const said = slug.slice(NAMES_A_WINDOW.length)
  const key = parseSeatProcKey(said)
  if (key === null) return null
  if (key.pid <= NOTHING || key.startTicks <= NOTHING) return null
  return said
}

export function decideWindow(procKey: string): "keep" | "sweep" {
  return statedProcessPresence(procKey) === ABSENT ? "sweep" : "keep"
}

export function windowsIn(root: string): WindowsRead {
  const found: WindowFacts[] = []
  const unjudged: string[] = []
  for (const one of everyOfType(root, WINDOW_TYPE)) {
    const said = partedIn(one.path)
    const slug = said === null ? one.path : said.slug
    const procKey = said === null ? null : procKeyOfWindowSlug(said.slug)
    if (procKey === null) {
      unjudged.push(slug)
      continue
    }
    found.push({ relPath: one.path, slug, procKey })
  }
  return { windows: found, unjudged }
}

function removeLines(root: string, relPath: string): undefined {
  const keys = new Set(fileKeysAt(root).keys())
  for (const one of besideOf(root, relPath, keys)) rmSync(join(root, one), { force: true })
  return undefined
}

async function removePages(
  relPaths: readonly string[],
  root: string
): Promise<{ code: number; output: string }> {
  const landed = await landRemovals(
    {
      repo: AKASHA,
      writer: WRITER,
      root,
      message: `the window is closed, so ${relPaths.length === 1 ? "this window's page goes" : "these windows' pages go"}: ${relPaths.map((one) => fileStemOf(one)).join(", ")}`,
    },
    relPaths
  )
  return landed.ok ? { code: 0, output: "" } : { code: 1, output: landed.why }
}

export async function sweepWindowPages(argv: readonly string[]): Promise<number> {
  const root = rootFor(resolveRoots(), AKASHA)

  const read = windowsIn(root)
  const closed = read.windows.filter((one) => decideWindow(one.procKey) === "sweep")

  if (read.unjudged.length > 0) {
    process.stderr.write(
      `${read.unjudged.length} window page(s) carry a slug stating no process, so none is judged: ` +
        `${read.unjudged.join(", ")}\n`
    )
  }

  for (const one of closed) process.stdout.write(`${one.slug}\t${one.procKey}\n`)

  if (!argv.includes(REMOVE)) {
    process.stderr.write(
      `read ${read.windows.length} window page(s), ${closed.length} whose window is closed` +
        ` — nothing removed without ${REMOVE}\n`
    )
    return 0
  }
  if (closed.length === 0) {
    process.stderr.write(`read ${read.windows.length} window page(s), every window still open\n`)
    return 0
  }

  const held: string[] = []
  const taken: WindowFacts[] = []
  const together = await removePages(
    closed.map((one) => one.relPath),
    root
  )
  if (together.code === 0) {
    taken.push(...closed)
  } else {
    for (const one of closed) {
      const alone = await removePages([one.relPath], root)
      if (alone.code === 0) taken.push(one)
      else held.push(`${one.slug}: ${alone.output.trim().split("\n").slice(-1)[0] ?? "refused"}`)
    }
  }
  for (const one of taken) removeLines(root, one.relPath)
  if (taken.length > 0)
    dropReadings(
      root,
      taken.map((one) => one.relPath)
    )

  process.stderr.write(
    `removed ${taken.length} of ${closed.length} closed window page(s); ` +
      `${read.windows.length - closed.length} kept\n`
  )
  for (const one of held) process.stderr.write(`refused: ${one}\n`)
  return held.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(await sweepWindowPages(process.argv.slice(2)))
