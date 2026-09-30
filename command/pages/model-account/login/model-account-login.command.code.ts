import { mkdirSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  DOORS as FILE_DOORS,
  filePushedTo,
} from "akasha/agent/model/account/modules/credential-file/model-account-credential-file.module.code.ts"
import { everyAccountSlugIn } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { configDirForAccount } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { account } from "akasha/command/argument/pages/account.argument.ts"
import { loginCode } from "akasha/command/argument/pages/login-code.argument.ts"
import {
  answering,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { linesOf } from "akasha/command/pages/inference/zimage-up/inference-zimage-up.command.code.ts"
import { modelAccountLogin as page } from "akasha/command/pages/model-account/login/model-account-login.command.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

const SESSION_PREFIX = "model-account-login-"

const ENDED = "akasha-login-ended"

const ADDRESS = /https:\/\/\S*oauth\/authorize\?\S+/

const ENDING = new RegExp(`${ENDED} (\\d+)`)

export const POLL_MS = 500

const ADDRESS_WAIT_MS = 30_000

const ANSWER_WAIT_MS = 60_000

const LINGER_SECONDS = 900

export const SIGN_IN_MAX_SECONDS = 1800

const SCOPE_PREFIX = "model-account-login-"

const PANE_WIDTH = 1000

const PANE_HEIGHT = 50

const PANE_HISTORY = "-200"

const SOCKET_DIR = join(homedir(), ".local", "state", "akasha", "model-account-login")

const SOCKET_DIR_MODE = 0o700

const LOG_PREFIX = "[model-account login]"

export const SIGN_IN =
  `CLAUDE_CONFIG_DIR="$1" BROWSER=/bin/false claude auth login --claudeai; ` +
  `echo "${ENDED} $?"; sleep ${String(LINGER_SECONDS)}`

type Ran = { readonly code: number; readonly out: string }

export type Doors = {
  readonly tmux: (args: readonly string[]) => Promise<Ran>
  readonly opened: (slug: string, args: readonly string[]) => Promise<Ran>
  readonly waited: (ms: number) => Promise<void>
  readonly now: () => number
  readonly known: (slug: string) => boolean
  readonly dirOf: (slug: string) => string
  readonly pushed: (slug: string, dir: string) => Promise<void>
  readonly status: (dir: string) => Promise<readonly string[]>
}

async function ran(argv: readonly string[], env?: Record<string, string>): Promise<Ran> {
  const proc = Bun.spawn([...argv], {
    stdout: "pipe",
    stderr: "pipe",
    ...(env === undefined ? {} : { env: { ...process.env, ...env } }),
  })
  const [out, err, code] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { code, out: `${out}${err}` }
}

function tmuxOf(args: readonly string[]): readonly string[] {
  mkdirSync(SOCKET_DIR, { recursive: true, mode: SOCKET_DIR_MODE })
  return ["tmux", "-S", join(SOCKET_DIR, "tmux.sock"), ...args]
}

export function scopedOf(slug: string, at: number, args: readonly string[]): readonly string[] {
  return [
    "systemd-run",
    "--user",
    "--scope",
    "--collect",
    "--quiet",
    `--unit=${SCOPE_PREFIX}${slug}-${String(at)}`,
    "-p",
    `RuntimeMaxSec=${String(SIGN_IN_MAX_SECONDS)}`,
    ...args,
  ]
}

function doorsIn(root: string): Doors {
  return {
    tmux: async (args) => await ran(tmuxOf(args)),
    opened: async (slug, args) => await ran(scopedOf(slug, Date.now(), tmuxOf(args))),
    waited: async (ms) => {
      await Bun.sleep(ms)
    },
    now: () => Date.now(),
    known: (slug) => everyAccountSlugIn(root).includes(slug),
    dirOf: (slug) => configDirForAccount(slug),
    pushed: async (slug, dir) => {
      await filePushedTo({
        root,
        slug,
        dir,
        doors: { ...FILE_DOORS, said: () => undefined, warned: () => undefined },
        reading: readingIn(root),
        pageOf: (path) => valueAt(path, root),
        logPrefix: LOG_PREFIX,
      })
    },
    status: async (dir) =>
      linesOf((await ran(["claude", "auth", "status"], { CLAUDE_CONFIG_DIR: dir })).out),
  }
}

export function sessionOf(slug: string): string {
  return `${SESSION_PREFIX}${slug}`
}

export function addressIn(pane: string): string | null {
  return ADDRESS.exec(pane)?.[0] ?? null
}

export function endedIn(pane: string): number | null {
  const found = ENDING.exec(pane)?.[1]
  return found === undefined ? null : Number(found)
}

export function saidIn(pane: string, code: string | null): readonly string[] {
  return linesOf(pane).filter(
    (line) =>
      !ADDRESS.test(line) && !line.includes(ENDED) && (code === null || !line.includes(code))
  )
}

async function paneOf(session: string, doors: Doors): Promise<string> {
  return (await doors.tmux(["capture-pane", "-p", "-J", "-t", session, "-S", PANE_HISTORY])).out
}

async function held(session: string, doors: Doors): Promise<boolean> {
  return (await doors.tmux(["has-session", "-t", session])).code === 0
}

async function gone(session: string, doors: Doors): Promise<void> {
  await doors.tmux(["kill-session", "-t", session])
}

function waiting(slug: string, session: string, address: string): Answer {
  return told([
    `the sign-in for ${slug} waits in tmux session \`${session}\` for the code this page shows once its person signs in:`,
    address,
  ])
}

export async function started(slug: string, dir: string, doors: Doors): Promise<Answer> {
  const session = sessionOf(slug)
  if (await held(session, doors)) {
    const pane = await paneOf(session, doors)
    const address = addressIn(pane)
    if (endedIn(pane) !== null) await gone(session, doors)
    else if (address !== null) return waiting(slug, session, address)
  }
  if (!(await held(session, doors))) {
    const opened = await doors.opened(slug, [
      "new-session",
      "-d",
      "-s",
      session,
      "-x",
      String(PANE_WIDTH),
      "-y",
      String(PANE_HEIGHT),
      "sh",
      "-c",
      SIGN_IN,
      "sh",
      dir,
    ])
    if (opened.code !== 0) {
      return refusedBy(
        [`tmux would not open \`${session}\`, and said:`, ...linesOf(opened.out)],
        OPERATIONAL
      )
    }
  }
  const until = doors.now() + ADDRESS_WAIT_MS
  while (doors.now() < until) {
    const pane = await paneOf(session, doors)
    const address = addressIn(pane)
    if (address !== null) return waiting(slug, session, address)
    const ended = endedIn(pane)
    if (ended !== null) {
      await gone(session, doors)
      return refusedBy(
        [
          `the sign-in for ${slug} ended at ${String(ended)} before it showed an address, and said:`,
          ...saidIn(pane, null),
        ],
        OPERATIONAL
      )
    }
    await doors.waited(POLL_MS)
  }
  return refusedBy(
    [
      `the sign-in for ${slug} showed no address within ${String(ADDRESS_WAIT_MS / 1000)} seconds, and \`${session}\` is left open`,
    ],
    OPERATIONAL
  )
}

export async function codeTaken(
  slug: string,
  dir: string,
  code: string,
  doors: Doors
): Promise<Answer> {
  const session = sessionOf(slug)
  if (!(await held(session, doors)) || endedIn(await paneOf(session, doors)) !== null) {
    if (await held(session, doors)) await gone(session, doors)
    return refusedBy(
      [`no sign-in for ${slug} waits for a code, so the call naming none starts one`],
      DATA
    )
  }
  await doors.tmux(["send-keys", "-t", session, "-l", code])
  await doors.tmux(["send-keys", "-t", session, "Enter"])
  const until = doors.now() + ANSWER_WAIT_MS
  let pane = await paneOf(session, doors)
  while (endedIn(pane) === null && doors.now() < until) {
    await doors.waited(POLL_MS)
    pane = await paneOf(session, doors)
  }
  const ended = endedIn(pane)
  const said = saidIn(pane, code)
  if (ended === null) {
    return refusedBy(
      [
        `the sign-in for ${slug} gave no answer within ${String(ANSWER_WAIT_MS / 1000)} seconds and still waits in \`${session}\`:`,
        ...said,
      ],
      OPERATIONAL
    )
  }
  await gone(session, doors)
  if (ended !== 0) {
    return refusedBy(
      [`the sign-in for ${slug} ended at ${String(ended)}, and said:`, ...said],
      OPERATIONAL
    )
  }
  try {
    await doors.pushed(slug, dir)
  } catch (thrown) {
    return refusedBy(
      [`${slug} signed in, and its new credential was not pushed onto its page:`, whyOf(thrown)],
      OPERATIONAL
    )
  }
  return told([
    `${slug} is signed in, and its page holds the new credential`,
    ...(await doors.status(dir)),
  ])
}

export async function modelAccountLogin(
  argv: readonly string[],
  given: Given,
  doorsOf: (root: string) => Doors = doorsIn
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [account, loginCode])
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.account
  const code = read.taken.loginCode
  return await answering(async () => {
    const doors = doorsOf(given.root)
    if (!doors.known(slug))
      return refusedBy([`no model account page is filed for \`${slug}\``], DATA)
    const dir = doors.dirOf(slug)
    if (code === undefined) return await started(slug, dir, doors)
    return await codeTaken(slug, dir, code, doors)
  })
}
