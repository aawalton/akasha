import {
  askSupervisorDecide,
  SUPERVISOR_DECIDE_COMMAND,
} from "@akasha/seat-system/supervisor-limit-resume-effects"
import type { AskDecide } from "@tools/lib/supervisor-resume-asks"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export type RuleAnswer<T> = { readonly value: T; readonly notice: string | null }

const REASON_CAP = 400

function unreachedRule(rule: string, reason: string): string {
  const notice = `${SUPERVISOR_DECIDE_COMMAND} could not decide \`${rule}\`: ${reason.slice(0, REASON_CAP)}`
  console.error(`${LOG} ${notice} — acting on the safe answer instead`)
  return notice
}

export async function askRule<T>(
  rule: string,
  question: Record<string, unknown>,
  read: (answered: unknown) => T,
  safe: T,
  ask: AskDecide = askSupervisorDecide
): Promise<RuleAnswer<T>> {
  try {
    const answered = await ask(JSON.stringify({ [rule]: question }))
    return { value: read(answered), notice: null }
  } catch (error) {
    return { value: safe, notice: unreachedRule(rule, String(error)) }
  }
}
