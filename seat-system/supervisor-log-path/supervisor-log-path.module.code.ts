import { join } from "node:path"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import { uncommittedBesideAt } from "@akasha/pages/page-file-name"

const PAGES_AT = "seat-system/seats/supervisors/pages"

const HELD = "log"

export function supervisorsRootDir(): string {
  return join(akashaRoot(), ".supervisors")
}

export function supervisorPageRelPath(agentId: string): string {
  return `${PAGES_AT}/${agentId}/supervisor-${agentId}.supervisor.ts`
}

export function supervisorFileRelPath(agentId: string, propertySlug: string): string {
  const at = uncommittedBesideAt(supervisorPageRelPath(agentId), propertySlug, HELD)
  if (at === null) throw new Error(`\`${propertySlug}\` names no file beside a supervisor's page`)
  return at
}

export function supervisorFilePath(agentId: string, propertySlug: string, root?: string): string {
  return join(root ?? akashaRoot(), supervisorFileRelPath(agentId, propertySlug))
}

const ROOT_UID = 0

export function runtimeRootDir(): string {
  return `/run/user/${process.getuid?.() ?? ROOT_UID}`
}

export function supervisorSocketPath(agentId: string, baseDir?: string): string {
  return join(baseDir ?? runtimeRootDir(), `akasha-${agentId}.sock`)
}
