import { closeSync, existsSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  LOG_AT,
  supervisorsRootDir,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import { seatAbove } from "akasha/agent/subagent/modules/naming/subagent-naming.module.code.ts"
import { subagentPageInHistory } from "akasha/agent/subagent/modules/page-history/subagent-page-history.module.code.ts"
import {
  pathIn,
  slugOf,
} from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
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

export type Running = { readonly ended: () => boolean }

export function askingAt(
  program: string,
  root: string,
  seatId: string,
  args: readonly string[],
  baseDir?: string
): Running {
  const fd = loggingTo(seatId, baseDir)
  try {
    const child = Bun.spawn([process.execPath, program, root, ...args], {
      cwd: root,
      stdin: "ignore",
      stdout: fd ?? "ignore",
      stderr: fd ?? "ignore",
    })
    child.unref()
    return { ended: () => child.exitCode !== null || child.signalCode !== null }
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

export type Asking = (root: string, seatId: string, args: readonly string[]) => undefined

function askingPresence(root: string, seatId: string, args: readonly string[]): undefined {
  const at = presenceAt(root)
  if (at !== null) askingAt(join(root, at), root, seatId, args)
  return undefined
}

export function askedBack(root: string, agentId: string, asking: Asking = askingPresence): boolean {
  const seatId = seatAbove(agentId)
  if (seatId === null) return false
  const own = agentId.slice(seatId.length + SUBAGENT_MARK.length)
  const seatName = seatNamedIn(root, seatId)
  if (own === "" || seatName === null) return false
  const at = pathIn(root, slugOf(seatName, own))
  if (existsSync(join(root, at))) return false
  if (subagentPageInHistory(root, at, agentId) === null) return false
  asking(root, seatId, [WRITING, seatName, own, "", seatId, String(Date.now())])
  return true
}
