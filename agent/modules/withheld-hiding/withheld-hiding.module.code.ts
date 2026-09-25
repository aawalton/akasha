import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs"
import { homedir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { insideOf } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { seatIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { gitIn } from "akasha/file/modules/git-place/git-place.module.code.ts"
import {
  WITHHELD,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

export const NOTICE_AT = ".local/state/akasha/withheld-notice"

const CLAUDE_AT = ".claude"

const CLAUDE_STATE = ".claude.json"

const SNAPSHOTS = "shell-snapshots"

const TMP = "/tmp"

const VAR_TMP = "/var/tmp"

const TEMPS: readonly string[] = [TMP, VAR_TMP]

const WRITABLE = "--bind"

const NO_NETWORK = "--unshare-net"

const READ_ONLY = "--ro-bind"

const EMPTIED = "--tmpfs"

type Env = Readonly<Record<string, string | undefined>>

export type Place = {
  readonly root: string
  readonly home: string
  readonly claude: string
  readonly runtime: string | null
  readonly tmux: string
  readonly temps: readonly string[]
  readonly sessions: readonly string[]
  readonly cwdFile: string | null
}

function namedIn(env: Env, key: string): string | null {
  const said = env[key]
  return said === undefined || said === "" ? null : said
}

export function scratchIn(uid: number): string {
  return join(VAR_TMP, `claude-${uid}`)
}

function sessionsOf(uid: number, session: string | null): readonly string[] {
  return sessionsIn(scratchIn(uid), session)
}

export function sessionsIn(at: string, session: string | null): readonly string[] {
  if (session === null || !existsSync(at)) return []
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => join(at, one.name, session))
    .filter((one) => existsSync(one))
}

function harnessFile(said: string | null): string | null {
  if (said === null || resolve(said) !== said) return null
  return TEMPS.includes(dirname(said)) ? said : null
}

export function placeIn(env: Env, root: string, uid: number, cwdFile: string | null): Place {
  const home = namedIn(env, "HOME") ?? homedir()
  return {
    root,
    home,
    claude: namedIn(env, "CLAUDE_CONFIG_DIR") ?? join(home, CLAUDE_AT),
    runtime: namedIn(env, "XDG_RUNTIME_DIR"),
    tmux: join(namedIn(env, "TMUX_TMPDIR") ?? TMP, `tmux-${uid}`),
    temps: TEMPS,
    sessions: sessionsOf(uid, namedIn(env, "CLAUDE_CODE_SESSION_ID")),
    cwdFile: harnessFile(cwdFile),
  }
}

function noticeWritten(home: string): string {
  const at = join(home, NOTICE_AT)
  const body = `${WITHHELD.join("\n")}\n`
  if (existsSync(at) && readFileSync(at, "utf8") === body) return at
  mkdirSync(dirname(at), { recursive: true })
  const written = `${at}.${process.pid}`
  writeFileSync(written, body)
  renameSync(written, at)
  return at
}

function readOnly(at: string): readonly string[] {
  return [READ_ONLY, at, at]
}

function shownAs(notice: string, at: string): readonly string[] {
  return existsSync(at) ? [READ_ONLY, notice, at] : []
}

function emptied(at: string | null): readonly string[] {
  return at !== null && existsSync(at) ? [EMPTIED, at] : []
}

function claudeEmptied(place: Place): readonly string[] {
  const own = join(place.home, CLAUDE_AT)
  const inside = insideOf(own, place.claude)
  return [...emptied(own), ...(inside ? [] : emptied(place.claude))]
}

function snapshotsKept(place: Place): readonly string[] {
  const at = join(place.claude, SNAPSHOTS)
  return existsSync(at) ? readOnly(at) : []
}

function cwdKept(at: string | null): readonly string[] {
  if (at === null) return []
  if (!existsSync(at)) writeFileSync(at, "")
  return [WRITABLE, at, at]
}

export function hidingFor(place: Place, agentId: string | null): readonly string[] {
  const withheld = withheldFor(place.root, agentId)
  if (withheld.length === 0) return []
  const notice = noticeWritten(place.home)
  return [
    NO_NETWORK,
    ...readOnly(place.home),
    ...emptied(gitIn(place.root)),
    ...withheld.flatMap((one) => shownAs(notice, join(place.root, one))),
    ...claudeEmptied(place),
    ...snapshotsKept(place),
    ...shownAs(notice, join(place.home, CLAUDE_STATE)),
    ...emptied(place.runtime),
    ...emptied(place.tmux),
    ...place.temps.flatMap((one) => emptied(one)),
    ...place.sessions.flatMap((one) => [WRITABLE, one, one]),
    ...cwdKept(place.cwdFile),
  ]
}

if (import.meta.main) {
  const uid = process.getuid?.() ?? 0
  const place = placeIn(process.env, process.argv[2] ?? "", uid, process.argv[3] ?? null)
  process.stdout.write(hidingFor(place, seatIn(process.env)).join("\n"))
}
