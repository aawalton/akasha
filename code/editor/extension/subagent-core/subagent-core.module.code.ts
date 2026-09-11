import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"
import { textIn } from "akasha/utils/narrow/text-in/text-in.module.code.ts"
import { z } from "zod"

export interface RunningSubagent {
  readonly key: string
  readonly agentId: string | null
  readonly label: string
}

export interface SubagentState {
  readonly labels: Map<string, string>
  readonly agentByTool: Map<string, string>
  readonly running: Map<string, boolean>
  readonly awaiting: Set<string>
}

export function emptySubagentState(): SubagentState {
  return { labels: new Map(), agentByTool: new Map(), running: new Map(), awaiting: new Set() }
}

const AGENT_TOOL = "Agent"

const NOTIFICATION_BLOCK = /<task-notification>[\s\S]*?<\/task-notification>/g
const TASK_ID = /<task-id>([^<]+)<\/task-id>/g

const STOPPED_BY_USER = /\bAgent ([A-Za-z0-9]+) was stopped by the user\b/

type Json = Record<string, unknown>

const NOTIFICATION_BLOCKS = z.array(z.string())

const ID_MATCH = z.array(z.string()).min(2)

function asObject(value: unknown): Json | null {
  return isRecord(value) ? value : null
}

function asArray(value: unknown): readonly unknown[] {
  return Array.isArray(value) ? value : []
}

function notificationText(record: Json): string {
  if (record.toolUseResult !== undefined) {
    return ""
  }
  const message = asObject(record.message)
  const content = message?.content
  if (asArray(content).some((block) => asObject(block)?.type === "tool_result")) {
    return ""
  }

  const parts: string[] = []
  if (typeof content === "string") {
    parts.push(content)
  }
  for (const block of asArray(content)) {
    const b = asObject(block)
    if (b !== null && b.type === "text" && typeof b.text === "string") {
      parts.push(b.text)
    }
  }
  const attachment = asObject(record.attachment)
  const prompt = attachment === null ? null : textIn(attachment.prompt)
  if (prompt !== null) {
    parts.push(prompt)
  }
  const own = textIn(record.content)
  if (own !== null) {
    parts.push(own)
  }
  return parts.join("\n")
}

export function applyRecord(state: SubagentState, record: Json): undefined {
  const message = asObject(record.message)

  if (record.type === "system" && record.subtype === "agents_killed") {
    for (const toolUseId of state.running.keys()) {
      state.running.set(toolUseId, false)
    }
    state.awaiting.clear()
  }

  if (record.type === "assistant") {
    for (const toolUseId of state.awaiting) {
      state.running.set(toolUseId, false)
    }
    state.awaiting.clear()
  }

  for (const block of asArray(message?.content)) {
    const b = asObject(block)
    if (b === null || b.type !== "tool_use" || b.name !== AGENT_TOOL) {
      continue
    }
    const toolUseId = textIn(b.id)
    if (toolUseId === null) {
      continue
    }
    const input = asObject(b.input) ?? {}
    state.labels.set(
      toolUseId,
      textIn(input.description) ?? textIn(input.subagent_type) ?? "subagent"
    )
    state.running.set(toolUseId, true)
    state.awaiting.add(toolUseId)
  }

  const result = asObject(record.toolUseResult)
  for (const block of asArray(message?.content)) {
    const b = asObject(block)
    if (b === null || b.type !== "tool_result") {
      continue
    }
    const toolUseId = textIn(b.tool_use_id)
    if (toolUseId === null) {
      continue
    }
    state.awaiting.delete(toolUseId)

    if (result === null) {
      if (state.running.has(toolUseId)) {
        state.running.set(toolUseId, false)
      }
      continue
    }

    if (state.running.has(toolUseId)) {
      const agentId = textIn(result.agentId)
      if (agentId !== null) {
        state.agentByTool.set(agentId, toolUseId)
      }
      state.running.set(toolUseId, result.isAsync === true)
    }

    const resumed = textIn(result.resumedAgentId)
    if (resumed !== null && result.success === true) {
      const known = state.agentByTool.get(resumed)
      if (known !== undefined) {
        state.running.set(known, true)
      } else {
        state.agentByTool.set(resumed, resumed)
        if (!state.labels.has(resumed)) {
          state.labels.set(resumed, resumed)
        }
        state.running.set(resumed, true)
      }
    }

    if (result.success === false) {
      const stopped = ID_MATCH.safeParse(STOPPED_BY_USER.exec(textIn(result.message) ?? ""))
      const id = stopped.success ? stopped.data[1] : undefined
      const row = id === undefined ? undefined : state.agentByTool.get(id)
      if (row !== undefined) {
        state.running.set(row, false)
      }
    }
  }

  const text = notificationText(record)
  if (text.length === 0) {
    return undefined
  }
  const blocks = NOTIFICATION_BLOCKS.safeParse(text.match(NOTIFICATION_BLOCK))
  if (!blocks.success) {
    return undefined
  }
  for (const blockText of blocks.data) {
    for (const found of blockText.matchAll(TASK_ID)) {
      const match = ID_MATCH.safeParse(found)
      if (!match.success) {
        continue
      }
      const id = match.data[1]
      if (id === undefined) {
        continue
      }
      const toolUseId = state.agentByTool.get(id)
      if (toolUseId !== undefined) {
        state.running.set(toolUseId, false)
      }
    }
  }
  return undefined
}

export function runningSubagents(state: SubagentState): readonly RunningSubagent[] {
  const agentByToolUseId = new Map<string, string>()
  for (const [agentId, toolUseId] of state.agentByTool) {
    agentByToolUseId.set(toolUseId, agentId)
  }

  const out: RunningSubagent[] = []
  for (const [key, isRunning] of state.running) {
    if (!isRunning) {
      continue
    }
    out.push({
      key,
      agentId: agentByToolUseId.get(key) ?? null,
      label: state.labels.get(key) ?? key,
    })
  }
  return out.sort((a, b) => a.label.localeCompare(b.label) || a.key.localeCompare(b.key))
}

export function endedSubagents(state: SubagentState): readonly string[] {
  const out: string[] = []
  for (const [agentId, toolUseId] of state.agentByTool) {
    if (state.running.get(toolUseId) === false) {
      out.push(agentId)
    }
  }
  return out.sort()
}
