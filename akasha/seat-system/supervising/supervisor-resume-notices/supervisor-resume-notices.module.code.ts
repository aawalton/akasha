import { existsSync } from "node:fs"
import { shape } from "@tools/lib/shape"
import type { Infer } from "@tools/lib/shape-core"
import type { notices as composedNotices } from "../../compose-notices-GONE/compose-notices.module.code.ts"

const LOG = "[resume-notices]"
const COMPOSE_COMMAND = "compose-notices"

// The specifier here is the one the type import above holds, so moving the compose module is a
// diagnostic rather than a path that is not there when a seat is put back to work.
const COMPOSE_AT = new URL("../../compose-notices/compose-notices.module.code.ts", import.meta.url)
  .pathname

export const SUPERVISOR_NOTICE_PREFIX = "[supervisor]"

const COMPOSE_TIMEOUT_MS = 5_000

const handed = shape.string().min(1)

const ResumeNoticesZ = shape.object({
  "restart-immediate": handed,
  "restart-deferred": handed,
  "restart-recovery-clause": shape.string(),
})

export type ResumeNotices = Readonly<Infer<typeof ResumeNoticesZ>>

export const HANDED_NOTICE_KEYS = [
  "restart-immediate",
  "restart-deferred",
] as const satisfies readonly (keyof ResumeNotices)[]

export const NOTICE_UNAVAILABLE_PREFIX = `${SUPERVISOR_NOTICE_PREFIX} Your resume notice could not be composed`

export function unavailable(reason: string): ResumeNotices {
  const said = `${NOTICE_UNAVAILABLE_PREFIX}: ${reason}. Nothing was asked of you by this restart.`
  return {
    "restart-immediate": said,
    "restart-deferred": said,
    "restart-recovery-clause": "",
  }
}

export function parseNotices(text: string): { notices: ResumeNotices } | { reason: string } {
  try {
    const parsed = JSON.parse(text) as ReturnType<typeof composedNotices>
    const result = ResumeNoticesZ.safeParse(parsed)
    if (result.success) return { notices: result.data }
    const issue = result.error.issues[0]
    const at =
      issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
    return {
      reason: `${COMPOSE_COMMAND} returned nothing this can use${at}: ${issue?.message ?? "no reason given"}`,
    }
  } catch (error) {
    return { reason: `${COMPOSE_COMMAND} did not return JSON (${String(error)})` }
  }
}

interface CommandAnswer {
  readonly stdout: string
  readonly stderr: string
  readonly code: number
}

async function runCompose(): Promise<CommandAnswer> {
  const verb = COMPOSE_AT
  if (!existsSync(verb)) {
    throw new Error(`${verb} is not there, so there is no notice to compose`)
  }
  const proc = Bun.spawn({
    cmd: [process.execPath, verb],
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  })
  let killedAtCeiling = false
  const ceiling = setTimeout(() => {
    killedAtCeiling = true
    proc.kill()
  }, COMPOSE_TIMEOUT_MS)
  let stdout: string
  let stderr: string
  let code: number
  try {
    ;[stdout, stderr, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
  } finally {
    clearTimeout(ceiling)
  }
  if (killedAtCeiling) {
    throw new Error(
      `${verb} was still running after ${COMPOSE_TIMEOUT_MS}ms and was killed, so nothing it ` +
        "composed is composed. It is stuck rather than slow."
    )
  }
  return { stdout, stderr, code }
}

async function composed(): Promise<{ out: string } | { reason: string }> {
  try {
    const answer = await runCompose()
    if (answer.code === 0) return { out: answer.stdout }
    const said = answer.stderr.trim()
    return { reason: `${COMPOSE_COMMAND} exited ${answer.code}${said === "" ? "" : ` (${said})`}` }
  } catch (error) {
    return { reason: `${COMPOSE_COMMAND} could not be run (${String(error)})` }
  }
}

export async function resumeNotices(): Promise<ResumeNotices> {
  const result = await composed()
  if ("reason" in result) {
    console.log(`${LOG} ${result.reason}`)
    return unavailable(result.reason)
  }
  const checked = parseNotices(result.out)
  if ("reason" in checked) {
    console.log(`${LOG} ${checked.reason}`)
    return unavailable(checked.reason)
  }
  return checked.notices
}
