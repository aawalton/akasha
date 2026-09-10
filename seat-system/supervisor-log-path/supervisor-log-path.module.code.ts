import { join } from "node:path"
import { akashaRoot } from "@akasha/pages/checkout-roots"

export function supervisorsRootDir(): string {
  return join(akashaRoot(), ".supervisors")
}

const ROOT_UID = 0

export function runtimeRootDir(): string {
  return `/run/user/${process.getuid?.() ?? ROOT_UID}`
}

export function supervisorSocketPath(agentId: string, baseDir?: string): string {
  return join(baseDir ?? runtimeRootDir(), `akasha-${agentId}.sock`)
}
