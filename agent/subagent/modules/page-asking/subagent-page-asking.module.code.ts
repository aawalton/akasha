import { closeSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  LOG_AT,
  supervisorsRootDir,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import {
  indexThere,
  listedAt,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const WRITING = "write"

const SEAT = "seat"

const MODULE = "module"

const PRESENCE = "subagent-presence"

const CODE = "code"

const TS = "ts"

export function logPathOf(seatId: string, baseDir?: string): string {
  return join(baseDir ?? supervisorsRootDir(), seatId, LOG_AT)
}

function loggingTo(seatId: string, baseDir: string | undefined): number | null {
  const at = logPathOf(seatId, baseDir)
  try {
    mkdirSync(dirname(at), { recursive: true })
    return openSync(at, "a")
  } catch {
    return null
  }
}

export function askingAt(
  program: string,
  root: string,
  seatId: string,
  args: readonly string[],
  baseDir?: string
): undefined {
  const fd = loggingTo(seatId, baseDir)
  try {
    Bun.spawn([process.execPath, program, root, ...args], {
      cwd: root,
      stdin: "ignore",
      stdout: fd ?? "ignore",
      stderr: fd ?? "ignore",
    }).unref()
  } finally {
    if (fd !== null) closeSync(fd)
  }
}

export function seatNamedIn(root: string, seatId: string): string | null {
  const listed = listedById(root, seatId)
  if (listed === null) return null
  const named = partedIn(listed.path)
  if (named === null || named.sections.length > 0 || named.pageType !== SEAT) return null
  return named.slug
}

export function presenceAt(root: string): string | null {
  if (!indexThere(root)) return null
  const page = listedAt(root, MODULE, PRESENCE)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${PRESENCE}\`, so no call would put a page up`)
  }
  return at
}
