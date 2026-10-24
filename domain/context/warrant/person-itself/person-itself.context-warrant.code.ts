import { personaOrHandlerStated } from "akasha/domain/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

export const PERSON =
  "A persona or handler seat of one person is held by that person, and that person is read before the seat is changed."

const PERSON_TYPE = "person"

const KEY = "persons"

function onePersonOf(root: string, path: string): string | null {
  const listed = (valueAt(path, root) as Readonly<Record<string, unknown>> | null)?.[KEY]
  if (!Array.isArray(listed) || listed.length !== 1) return null
  const [one] = listed
  return typeof one === "string" && one !== "" ? one.slice(one.lastIndexOf("/") + 1) : null
}

export function personItself(root: string, path: string): readonly Warrant[] {
  if (!personaOrHandlerStated(root, path)) return []
  const slug = onePersonOf(root, path)
  if (slug === null) return []
  const listed = listedAt(root, PERSON_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSON }]
}
