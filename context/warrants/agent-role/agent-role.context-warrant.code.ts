import { listedAt } from "@akasha/indexes"
import { slugStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const ROLE_TYPE =
  "An agent is held to what every role is held to, and that is read before the agent is changed."

const PAGE_TYPE = "page-type"

const ROLE = "role"

const KEY = "slug"

export function agentRole(root: string, path: string): readonly Warrant[] {
  if (slugStated(root, path, KEY) === null) return []
  const listed = listedAt(root, PAGE_TYPE, ROLE)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: ROLE_TYPE }]
}
