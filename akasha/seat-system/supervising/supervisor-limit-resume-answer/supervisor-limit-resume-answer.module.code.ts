import { SUPERVISOR_DECIDE_COMMAND } from "@akasha/seat-system/supervisor-limit-resume-effects"
import type { Infer } from "@akasha/utils-narrow/shape-core"
import { shape } from "@tools/lib/shape"

export const LIMIT_RESUME_DECISION = "limitResume"

export type AskDecide = (stdin: string) => Promise<unknown>

const LimitResumeAnswerShape = shape.object({
  [LIMIT_RESUME_DECISION]: shape.discriminatedUnion("kind", [
    shape.object({
      kind: shape.literal("nudge"),
      reason: shape.string(),
      nudge: shape.string().refine((text) => text.trim() !== "", {
        message: "the nudge text is blank, which would reach the seat as an empty turn",
      }),
      floorMs: shape.number().refine((ms) => Number.isFinite(ms) && ms > 0, {
        message: "the floor window is not a positive finite number, which would disable the floor",
      }),
    }),
    shape.object({ kind: shape.literal("wait"), reason: shape.string() }),
    shape.object({ kind: shape.literal("hold"), reason: shape.string() }),
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
