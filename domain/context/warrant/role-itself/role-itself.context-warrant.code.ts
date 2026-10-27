import { slugStated } from "akasha/domain/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { listedAt, listedFor } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressedIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

export const ROLE =
  "A seat answers for the role it states, and that role is read before the seat is changed."

export const ROLE_PART =
  "A seat answers for each part its role names as for the role, and each is read before the seat is changed."

const ROLE_TYPE = "role"

const KEY = "role"

const PARTS = "parts"

function partsOf(root: string, path: string): readonly Warrant[] {
  const value = valueAt(path, root) as Record<string, unknown> | null
  const parts = value?.[PARTS]
  if (!Array.isArray(parts)) return []
  const found: Warrant[] = []
  for (const part of parts) {
    if (typeof part !== "string") continue
    const address = addressedIn(part)
    if ("refused" in address) continue
    const listed = listedFor(root, address)
    const oid = listed === null ? null : blobAt(root, listed.path)
    if (listed !== null && oid !== null) found.push({ path: listed.path, oid, owed: ROLE_PART })
  }
  return found
}

export function roleItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const listed = listedAt(root, ROLE_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  if (oid === null) return []
  return [{ path: listed.path, oid, owed: ROLE }, ...partsOf(root, listed.path)]
}
