import { output } from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import {
  callHarness,
  LANDING_TIMEOUT_MS,
} from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { agentSubagentStop } from "akasha/command/pages/agent/subagent-stop/agent-subagent-stop.command.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import * as vscode from "vscode"
import { z } from "zod"

const SUBAGENT = "subagent"

const ACT = "stop-subagent"

const CONFIRM = "Stop"

const NO_PAGE = "akasha holds no page for this subagent, so nothing can stop it"

export function subagentContextValue(stopped: boolean): string {
  return `${SUBAGENT}.${stopped ? "stopped" : "running"}`
}

const SUBAGENT_ROW_SCHEMA = z.looseObject({
  key: z.string().min(1),
  label: z.string().min(1),
  kind: z.literal(SUBAGENT),
  at: z.string().min(1).nullable(),
  stopped: z.boolean(),
})

export interface SubagentTarget {
  readonly id: string
  readonly name: string
  readonly at: string | null
  readonly stopped: boolean
}

export function invokedSubagent(value: unknown): SubagentTarget | undefined {
  const parsed = SUBAGENT_ROW_SCHEMA.safeParse(value)
  return parsed.success
    ? {
        id: parsed.data.key,
        name: parsed.data.label,
        at: parsed.data.at,
        stopped: parsed.data.stopped,
      }
    : undefined
}

export function pageNameOf(target: SubagentTarget): string | undefined {
  if (target.at === null) return undefined
  const parted = partedIn(target.at)
  return parted !== null && parted.pageType === SUBAGENT ? parted.slug : undefined
}

export interface StopPrompt {
  readonly message: string
  readonly detail: string
  readonly confirm: string
}

export function confirmSubagentStop(pageName: string): StopPrompt {
  return {
    message: `Are you sure you want to stop '${pageName}'?`,
    detail:
      "This refuses the subagent's next request to the model, so it cannot take another step. " +
      "The stop takes effect at its next model turn: if it is inside a tool call right now, " +
      "that call finishes first. Whatever it is part-way through is lost and cannot be recovered.",
    confirm: CONFIRM,
  }
}

export type StopCall = {
  readonly slug: string
  readonly exported: string
  readonly args: readonly string[]
}

export function stopCall(pageName: string): StopCall {
  return {
    slug: agentSubagentStop.slug,
    exported: exportedAs(agentSubagentStop.slug),
    args: [pageName],
  }
}

export async function stopSubagent(
  node: unknown,
  refresh: (trigger: string) => Promise<undefined>
): Promise<undefined> {
  const target = invokedSubagent(node)
  if (target === undefined) return undefined
  const pageName = pageNameOf(target)
  if (pageName === undefined) {
    output.appendLine(`[${ACT}] ${target.name}: ${NO_PAGE}`)
    void vscode.window.showErrorMessage(`${target.name}: ${NO_PAGE}.`)
    return undefined
  }
  if (target.stopped === true) {
    output.appendLine(`[${ACT}] ${pageName}: stopped already, nothing done`)
    return undefined
  }
  const prompt = confirmSubagentStop(pageName)
  const picked = await vscode.window.showWarningMessage(
    prompt.message,
    { modal: true, detail: prompt.detail },
    prompt.confirm
  )
  if (picked !== prompt.confirm) {
    output.appendLine(`[${ACT}] ${pageName}: declined at the warning, nothing done`)
    return undefined
  }
  const call = stopCall(pageName)
  try {
    const said = await callHarness(call.slug, call.exported, call.args, {
      timeout: LANDING_TIMEOUT_MS,
    })
    output.appendLine(`[${ACT}] ${pageName}: ${said.trim()}`)
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    output.appendLine(`[${ACT}] ${pageName}: failed: ${said}`)
    void vscode.window.showErrorMessage(`${pageName}: could not stop. ${said}`)
    return undefined
  }
  await refresh(ACT)
  return undefined
}
