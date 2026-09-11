import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  facingHeld,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  generatedIn,
  writerAt,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"

const AT = "at"

const OLD = "old"

const NEW = "new"

const CHANGE_FILE = "change-mechanical-file-content/change-file-content-of-any-kind"

const BY_MACHINE = "` is a file a machine writes rather than an agent"

const WHAT_WRITES = ", so change what writes it rather than the file"

const BODY_IN = " — change `bodyIn` in `"

const ON_THE_LANDING = "` instead, and the group writes this file on the landing"

export type Asked = Readonly<Record<string, string>>

function passageIn(said: string): string {
  return said.endsWith("\n") ? said.slice(0, -1) : said
}

export function machineWrites(world: World, at: string): string | null {
  const facing = facingHeld(world)
  if (!generatedIn(facing, at)) return null
  const beside = writerAt(facing, at)
  if (beside === null) return "`" + at + BY_MACHINE + WHAT_WRITES
  return "`" + at + BY_MACHINE + BODY_IN + beside + ON_THE_LANDING
}

export async function changeFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const old = given[OLD]
  if (old === undefined) return refusing(missing(OLD))
  const becomes = given[NEW]
  if (becomes === undefined) return refusing(missing(NEW))
  const written = machineWrites(world, at)
  if (written !== null) return refusing(written)
  const passage = { at, old: passageIn(old), new: passageIn(becomes) }
  return (await reach(world, CHANGE_FILE, passage)).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await changeFileCommand(world, given)
}
