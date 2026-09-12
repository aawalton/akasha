import { writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import { notices } from "akasha/agents/messaging/notices/compose-notices/compose-notices.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import {
  faulted,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { seatComposeNotices as page } from "akasha/commands/pages/seat/compose-notices/seat-compose-notices.command.ts"

export function saidOf(found: Readonly<Record<string, string>>): string {
  return JSON.stringify(found, null, 2)
}

export function pathOf(said: string, root: string): string {
  return isAbsolute(said) ? said : resolve(root, said)
}

export function seatComposeNotices(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [output])
  if ("refused" in read) return refusedBy(read.refused)
  const at = read.taken.output
  let found: Readonly<Record<string, string>>
  try {
    found = notices()
  } catch (thrown) {
    return faulted(thrown)
  }
  try {
    const said = saidOf(found)
    if (at === undefined) return told([said])
    writeFileSync(pathOf(at, resolve(given.root)), `${said}\n`)
    return told([])
  } catch (thrown) {
    return faulted(thrown)
  }
}
