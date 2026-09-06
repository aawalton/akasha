import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { TERMINAL_PAGES_DIR } from "../terminal-ended/terminal-ended.module.code.ts"
import { ROOT } from "../terminal-entry-points/terminal-entry-points.module.code.ts"

export const SEAT_ATTACH_FN = "__editor_terminal_seat_attach"

export const MARK_TAIL = ".code-editor-terminal.seat.uncommitted.attachment.json"

const STARTED_AT_FIELD = 20

export type SeatMark = {
  readonly pid: number
  readonly startedAt: string
  readonly seat: string
}

export function seatAttachFnLines(): readonly string[] {
  return [
    `${SEAT_ATTACH_FN}() {`,
    '  local _seat="$1"',
    `  local _root="${ROOT}"`,
    `  local _dir="$_root/${TERMINAL_PAGES_DIR}"`,
    '  local _at="" _stat _rest _start',
    '  if mkdir -p "$_dir" 2>/dev/null; then',
    "    _stat=$(</proc/$$/stat)",
    '    _rest="${_stat##*) }"',
    `    _start=$(printf '%s' "$_rest" | awk '{ print $${STARTED_AT_FIELD} }')`,
    '    if [ -n "$_start" ]; then',
    `      _at="$_dir/$$-$_start${MARK_TAIL}"`,
    `      printf '{"seat":"%s"}\\n' "$_seat" >"$_at" 2>/dev/null || _at=""`,
    "    fi",
    "  fi",
    '  tmux attach-session -t "=$_seat"',
    "  local _rc=$?",
    '  [ -n "$_at" ] && rm -f "$_at" 2>/dev/null',
    "  return $_rc",
    "}",
  ]
}

export function seatMarksAt(root: string): string {
  return join(root, TERMINAL_PAGES_DIR)
}

export function startedAtOf(pid: number): string | null {
  let stat: string
  try {
    stat = readFileSync(`/proc/${String(pid)}/stat`).toString("utf8")
  } catch {
    return null
  }
  const close = stat.lastIndexOf(")")
  if (close === -1) return null
  const after = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const started = after[STARTED_AT_FIELD - 1]
  return started === undefined || started === "" ? null : started
}

export function markIn(name: string, body: string): SeatMark | null {
  if (!name.endsWith(MARK_TAIL)) return null
  const stem = name.slice(0, -MARK_TAIL.length)
  const dash = stem.indexOf("-")
  if (dash < 0) return null
  const pid = Number(stem.slice(0, dash))
  const startedAt = stem.slice(dash + 1)
  if (!Number.isInteger(pid) || pid <= 0 || startedAt === "") return null
  let said: unknown
  try {
    said = JSON.parse(body)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object") return null
  const seat = (said as { seat?: unknown }).seat
  if (typeof seat !== "string" || seat === "") return null
  return { pid, startedAt, seat }
}

export function marksIn(at: string): readonly SeatMark[] | null {
  let names: readonly string[]
  try {
    names = readdirSync(at)
  } catch {
    return null
  }
  const found: SeatMark[] = []
  for (const name of names) {
    if (!name.endsWith(MARK_TAIL)) continue
    let body: string
    try {
      body = readFileSync(join(at, name)).toString("utf8")
    } catch {
      continue
    }
    const mark = markIn(name, body)
    if (mark !== null) found.push(mark)
  }
  return found
}

export function seatByShellPid(
  marks: readonly SeatMark[],
  seatNames: ReadonlySet<string>,
  startedAt: (pid: number) => string | null = startedAtOf
): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  for (const mark of marks) {
    if (!seatNames.has(mark.seat)) continue
    if (startedAt(mark.pid) !== mark.startedAt) continue
    found.set(mark.pid, mark.seat)
  }
  return found
}
