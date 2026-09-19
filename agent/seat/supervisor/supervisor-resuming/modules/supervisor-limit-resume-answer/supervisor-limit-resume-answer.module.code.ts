import { SUPERVISOR_DECIDE_COMMAND } from "akasha/agent/seat/supervisor/supervisor-resuming/modules/supervisor-limit-resume-effects/supervisor-limit-resume-effects.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import type { Infer } from "akasha/code/type/narrowing/modules/shape-core/shape-core.module.code.ts"

const LIMIT_RESUME_DECISION = "limitResume"

export type AskDecide = (stdin: string) => Promise<unknown>

const LimitResumeAnswerShape = SHAPE.object({
  [LIMIT_RESUME_DECISION]: SHAPE.discriminatedUnion("kind", [
    SHAPE.object({
      kind: SHAPE.literal("nudge"),
      reason: SHAPE.string(),
      nudge: SHAPE.string().refine((text) => text.trim() !== "", {
        message: "the nudge text is blank, which would reach the seat as an empty turn",
      }),
      floorMs: SHAPE.number().refine((ms) => Number.isFinite(ms) && ms > 0, {
        message: "the floor window is not a positive finite number, which would disable the floor",
      }),
    }),
    SHAPE.object({ kind: SHAPE.literal("wait"), reason: SHAPE.string() }),
    SHAPE.object({ kind: SHAPE.literal("hold"), reason: SHAPE.string() }),
  ]),
})

export type LimitResumeVerdict = Infer<typeof LimitResumeAnswerShape>[typeof LIMIT_RESUME_DECISION]

export type LimitResumeQuestion = {
  readonly deathDetected: true
  readonly poolHasCapacity: boolean
  readonly eligibilityHeldMs: number | null
  readonly eligibilityHoldMs?: number
  readonly earliestResetMs: number | null
  readonly now: number
  readonly recentlyNudged: boolean
}

export async function askLimitResume(
  ask: AskDecide,
  question: LimitResumeQuestion
): Promise<{ verdict: LimitResumeVerdict } | { unreachable: string }> {
  let answered: unknown
  try {
    answered = await ask(JSON.stringify({ [LIMIT_RESUME_DECISION]: question }))
  } catch (error) {
    const what = `could not decide \`${LIMIT_RESUME_DECISION}\``
    return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}: ${String(error)}` }
  }
  const read = LimitResumeAnswerShape.safeParse(answered)
  if (read.success) return { verdict: read.data[LIMIT_RESUME_DECISION] }
  const issue = read.error.issues[0]
  const at = issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
  const why = issue?.message ?? "no reason given"
  const what = `answered nothing this can use for \`${LIMIT_RESUME_DECISION}\``
  return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}${at}: ${why}` }
}
