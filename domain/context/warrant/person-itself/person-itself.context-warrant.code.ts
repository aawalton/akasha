import { onePersonIn } from "akasha/agent/seat/declaration/modules/seat-persons/seat-persons.module.code.ts"
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

export function personItself(root: string, path: string): readonly Warrant[] {
  if (!personaOrHandlerStated(root, path)) return []
  const slug = onePersonIn((valueAt(path, root) as Readonly<Record<string, unknown>> | null)?.[KEY])
  if (slug === null) return []
  const listed = listedAt(root, PERSON_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSON }]
}
