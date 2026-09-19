import { SUPERVISOR_DECIDE_COMMAND } from "akasha/agent/seat/supervisor/supervisor-resuming/modules/supervisor-limit-resume-effects/supervisor-limit-resume-effects.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import type { Infer } from "akasha/code/type/narrowing/modules/shape-core/shape-core.module.code.ts"

const WAIT_RESUME_DECISION = "waitResume"

export type AskDecide = (stdin: string) => Promise<unknown>

const WaitResumeAnswerShape = SHAPE.object({
  [WAIT_RESUME_DECISION]: SHAPE.discriminatedUnion("kind", [
    SHAPE.object({
      kind: SHAPE.literal("nudge"),
      reason: SHAPE.string(),
      attempt: SHAPE.number(),
      nudge: SHAPE.string().refine((text) => text.trim() !== "", {
        message: "the nudge text is blank, which would reach the seat as an empty turn",
      }),
    }),
    SHAPE.object({
      kind: SHAPE.literal("wait"),
      reason: SHAPE.string(),
      readyAtMs: SHAPE.number(),
    }),
    SHAPE.object({ kind: SHAPE.literal("hold"), reason: SHAPE.string() }),
  ]),
})

export type WaitResumeVerdict = Infer<typeof WaitResumeAnswerShape>[typeof WAIT_RESUME_DECISION]

export type WaitResumeQuestion = {
  readonly deathDetected: true
  readonly consecutiveDeaths: number
  readonly lastNudgeAtMs: number | null
  readonly now: number
}

export async function askWaitResume(
  ask: AskDecide,
  question: WaitResumeQuestion
): Promise<{ verdict: WaitResumeVerdict } | { unreachable: string }> {
  let answered: unknown
  try {
    answered = await ask(JSON.stringify({ [WAIT_RESUME_DECISION]: question }))
  } catch (error) {
    const what = `could not decide \`${WAIT_RESUME_DECISION}\``
    return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}: ${String(error)}` }
  }
  const read = WaitResumeAnswerShape.safeParse(answered)
  if (read.success) return { verdict: read.data[WAIT_RESUME_DECISION] }
  const issue = read.error.issues[0]
  const at = issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
  const why = issue?.message ?? "no reason given"
  const what = `answered nothing this can use for \`${WAIT_RESUME_DECISION}\``
  return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}${at}: ${why}` }
}
