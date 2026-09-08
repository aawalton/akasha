import { shape } from "@akasha/utils/narrow/shape"
import type { Infer } from "@akasha/utils/narrow/shape-core"
import { notices } from "../../compose-notices/compose-notices.module.code.ts"

const LOG = "[resume-notices]"
const COMPOSE_MODULE = "compose-notices"

export const SUPERVISOR_NOTICE_PREFIX = "[supervisor]"

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

export function checkNotices(
  composed: Readonly<Record<string, string>>
): { notices: ResumeNotices } | { reason: string } {
  const result = ResumeNoticesZ.safeParse(composed)
  if (result.success) return { notices: result.data }
  const issue = result.error.issues[0]
  const at = issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
  return {
    reason: `${COMPOSE_MODULE} composed nothing this can use${at}: ${issue?.message ?? "no reason given"}`,
  }
}

export function resumeNotices(): ResumeNotices {
  let composed: Readonly<Record<string, string>>
  try {
    composed = notices()
  } catch (error) {
    const said = `${COMPOSE_MODULE} threw (${error instanceof Error ? error.message : String(error)})`
    console.log(`${LOG} ${said}`)
    return unavailable(said)
  }
  const checked = checkNotices(composed)
  if ("reason" in checked) {
    console.log(`${LOG} ${checked.reason}`)
    return unavailable(checked.reason)
  }
  return checked.notices
}
