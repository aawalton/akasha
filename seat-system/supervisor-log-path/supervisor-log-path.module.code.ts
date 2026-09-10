import { join } from "node:path"

const ROOT_UID = 0

const OURS = "akasha"

export function runtimeRootDir(): string {
  return `/run/user/${process.getuid?.() ?? ROOT_UID}`
}

export function supervisorsRootDir(): string {
  return join(runtimeRootDir(), OURS)
}

export function supervisorSocketPath(agentId: string, baseDir?: string): string {
  return join(baseDir ?? runtimeRootDir(), `akasha-${agentId}.sock`)
}

export function agentRuntimeDir(agentId: string, baseDir?: string): string {
  return join(baseDir ?? runtimeRootDir(), `akasha-${agentId}`)
}
