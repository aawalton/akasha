import {
  parseModel,
  toCliAlias,
} from "akasha/agents/models/modules/vocab/model-vocab.module.code.ts"
import { readSeatConditions } from "akasha/seat-system/seat-conditions-reading/seat-conditions-reading.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"

export type WorkerModelDeps = {
  getWorkerModel: () => Promise<string | null>
  getExtendedContextAvailable: () => Promise<boolean>
}

export async function getExtendedContextAvailable(): Promise<boolean> {
  return readSeatConditions().extendedContextAvailable
}

const DEFAULT_WORKER_MODEL_DEPS: WorkerModelDeps = {
  getWorkerModel: async () => readSeatConditions().model,
  getExtendedContextAvailable,
}

function isUsableModel(value: string | null): value is string {
  return typeof value === "string" && value.trim() !== ""
}

export async function resolveWorkerModel(
  deps: WorkerModelDeps = DEFAULT_WORKER_MODEL_DEPS
): Promise<string> {
  const extendedAvailable = await deps.getExtendedContextAvailable()
  const raw = await deps.getWorkerModel()
  if (!isUsableModel(raw)) {
    throw new Error("seat conditions state no model, and a seat runs on the model they state")
  }
  const spec = parseModel(raw)
  if (spec === null) {
    throw new Error(
      `seat conditions state \`${raw}\` as the model, which names none this system knows`
    )
  }
  return toCliAlias(spec, { extendedAvailable })
}

export type AutoCompactWindowDeps = {
  getAutoCompactWindow: () => Promise<string | null>
}

const DEFAULT_AUTO_COMPACT_WINDOW_DEPS: AutoCompactWindowDeps = {
  getAutoCompactWindow: async () => readSeatConditions().autoCompactWindow,
}

export async function resolveAutoCompactWindow(
  deps: AutoCompactWindowDeps = DEFAULT_AUTO_COMPACT_WINDOW_DEPS
): Promise<string | null> {
  try {
    return await deps.getAutoCompactWindow()
  } catch (err) {
    console.warn(`${LOG} resolveAutoCompactWindow: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type AgentEffortLevelDeps = {
  getEffortLevel: () => Promise<string | null>
}

const DEFAULT_AGENT_EFFORT_LEVEL_DEPS: AgentEffortLevelDeps = {
  getEffortLevel: async () => readSeatConditions().effortLevel,
}

export async function resolveAgentEffortLevel(
  deps: AgentEffortLevelDeps = DEFAULT_AGENT_EFFORT_LEVEL_DEPS
): Promise<string | null> {
  try {
    return await deps.getEffortLevel()
  } catch (err) {
    console.warn(`${LOG} resolveAgentEffortLevel: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type SubagentModelDeps = {
  getSubagentModel: () => Promise<string | null>
  getExtendedContextAvailable: () => Promise<boolean>
}

const DEFAULT_SUBAGENT_MODEL_DEPS: SubagentModelDeps = {
  getSubagentModel: async () => readSeatConditions().subagentModel,
  getExtendedContextAvailable,
}

export async function resolveSubagentModel(
  deps: SubagentModelDeps = DEFAULT_SUBAGENT_MODEL_DEPS
): Promise<string | null> {
  try {
    const raw = await deps.getSubagentModel()
    if (!isUsableModel(raw)) return null
    const spec = parseModel(raw)
    if (spec === null) {
      console.warn(`${LOG} resolveSubagentModel: ${raw} names no model, leaving subagents unset`)
      return null
    }
    const extendedAvailable = await deps.getExtendedContextAvailable()
    return toCliAlias(spec, { extendedAvailable })
  } catch (err) {
    console.warn(`${LOG} resolveSubagentModel: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type FallbackModelDeps = {
  getFallbackModel: () => Promise<string | null>
  getExtendedContextAvailable: () => Promise<boolean>
}

const DEFAULT_FALLBACK_MODEL_DEPS: FallbackModelDeps = {
  getFallbackModel: async () => readSeatConditions().fallbackModel,
  getExtendedContextAvailable,
}

export async function resolveFallbackModel(
  deps: FallbackModelDeps = DEFAULT_FALLBACK_MODEL_DEPS
): Promise<string | null> {
  try {
    const raw = await deps.getFallbackModel()
    if (!isUsableModel(raw)) return null
    const spec = parseModel(raw)
    if (spec === null) {
      console.warn(`${LOG} resolveFallbackModel: ${raw} names no model, leaving unset`)
      return null
    }
    const extendedAvailable = await deps.getExtendedContextAvailable()
    return toCliAlias(spec, { extendedAvailable })
  } catch (err) {
    console.warn(`${LOG} resolveFallbackModel: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type SubagentSpawnDepthDeps = {
  getSubagentSpawnDepth: () => Promise<string | null>
}

const DEFAULT_SUBAGENT_SPAWN_DEPTH_DEPS: SubagentSpawnDepthDeps = {
  getSubagentSpawnDepth: async () => readSeatConditions().subagentSpawnDepth,
}

export async function resolveSubagentSpawnDepth(
  deps: SubagentSpawnDepthDeps = DEFAULT_SUBAGENT_SPAWN_DEPTH_DEPS
): Promise<string> {
  const raw = await deps.getSubagentSpawnDepth()
  if (raw === null) {
    throw new Error("seat conditions state no subagent spawn depth, which its property defaults")
  }
  return raw
}

export type ToolTimeoutDeps = {
  getToolTimeout: () => Promise<string | null>
}

const DEFAULT_TOOL_TIMEOUT_DEPS: ToolTimeoutDeps = {
  getToolTimeout: async () => readSeatConditions().toolTimeout,
}

export async function resolveToolTimeout(
  deps: ToolTimeoutDeps = DEFAULT_TOOL_TIMEOUT_DEPS
): Promise<string> {
  const raw = await deps.getToolTimeout()
  if (raw === null) {
    throw new Error("seat conditions state no tool timeout, which its property defaults")
  }
  return raw
}

export type ResumeThresholdDeps = {
  getResumeThresholdMinutes: () => Promise<string | null>
  getResumeTokenThreshold: () => Promise<string | null>
}

const DEFAULT_RESUME_THRESHOLD_DEPS: ResumeThresholdDeps = {
  getResumeThresholdMinutes: async () => readSeatConditions().resumeThresholdMinutes,
  getResumeTokenThreshold: async () => readSeatConditions().resumeTokenThreshold,
}

export interface ResumeThresholds {
  readonly minutes: string
  readonly tokens: string
}

export async function resolveResumeThresholds(
  deps: ResumeThresholdDeps = DEFAULT_RESUME_THRESHOLD_DEPS
): Promise<ResumeThresholds> {
  const [minutes, tokens] = await Promise.all([
    deps.getResumeThresholdMinutes(),
    deps.getResumeTokenThreshold(),
  ])
  if (minutes === null || tokens === null) {
    throw new Error("seat conditions state no resume threshold, which its property defaults")
  }
  return { minutes, tokens }
}
