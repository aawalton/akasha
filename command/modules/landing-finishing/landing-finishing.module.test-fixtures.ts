import { readlinkSync } from "node:fs"
import { join } from "node:path"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  ADMITS,
  carriedRepo,
  pageLanded,
  rowsIn,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"

const LINKED = "01a04e11-0000-7000-8000-000000000003"

const LINKED_FROM = "akasha/one/b.domain.ts"

const LINKED_FOLDER = "akasha/two"

const LINKED_TO = `${LINKED_FOLDER}/b.domain.ts`

export async function linkMoved(): Promise<readonly string[]> {
  const at = join(scratch.rootFor("akasha-linked-"), "ops")
  const page = `export const b = { id: "${LINKED}", type: "page-type/domain", slug: "b", linkedAt: "${at}" }\n`
  const root = await pageLanded(await carriedRepo())
  await landing(root, rowsIn(root, [{ path: LINKED_FROM, body: bytesOf(page) }]), "held", ADMITS)
  const said = await landing(
    root,
    [{ kind: "move", pathFrom: LINKED_FROM, pathTo: LINKED_TO }],
    "held",
    ADMITS
  )
  if ("refusals" in said) return said.refusals
  const held = join(root, LINKED_FOLDER)
  const reads = readlinkSync(at)
  const named = said.linked.said.join("\n")
  return [
    ...said.linked.wrong,
    ...(reads === held ? [] : [`${at} reads ${reads} rather than ${held}`]),
    ...(named.includes(LINKED_FOLDER) ? [] : [`the landing said ${named}`]),
  ]
}
