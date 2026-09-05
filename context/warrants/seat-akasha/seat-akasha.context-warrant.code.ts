import { listedAt } from "@akasha/indexes"
import { slugStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const AKASHA =
  "An agent works within akasha, and the akasha domain is read before the agent is changed."

const DOMAIN_TYPE = "domain"

const AKASHA_SLUG = "akasha"

const KEY = "slug"

export function seatAkasha(root: string, path: string): readonly Warrant[] {
  if (slugStated(root, path, KEY) === null) return []
  const listed = listedAt(root, DOMAIN_TYPE, AKASHA_SLUG)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: AKASHA }]
}
