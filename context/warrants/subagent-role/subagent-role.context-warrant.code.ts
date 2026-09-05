import { listedAt } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import { slugStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const ROLE_TYPE =
  "A subagent is held to what every role is held to, and that is read before the subagent is changed."

const PAGE_TYPE = "page-type"

const ROLE = "role"

const SUBAGENT = "subagent"

const KEY = "slug"

export function subagentRole(root: string, path: string): readonly Warrant[] {
  if (partedIn(path)?.pageType !== SUBAGENT) return []
  if (slugStated(root, path, KEY) === null) return []
  const listed = listedAt(root, PAGE_TYPE, ROLE)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: ROLE_TYPE }]
}
