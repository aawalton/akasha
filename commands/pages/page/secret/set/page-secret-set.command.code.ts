import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { commitMessage } from "akasha/commands/arguments/pages/commit-message.argument.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { keepLastNewline } from "akasha/commands/arguments/pages/keep-last-newline.argument.ts"
import { key as keyArgument } from "akasha/commands/arguments/pages/key.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { pageSecretSet as page } from "akasha/commands/pages/page/secret/set/page-secret-set.command.ts"
import {
  caught,
  landedWith,
  pipedIn,
  targeting,
  valueIn as valueSaid,
} from "akasha/pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import { secretsIn } from "akasha/pages/secret/page-secret.module.code.ts"

const ACT = "set"

const BARE = "a secret's value is piped in, and nothing is piped in"

export async function pageSecretSet(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const read = takenFor(argv, given.calledAs, page, [
      filePath,
      keyArgument,
      commitMessage,
      keepLastNewline,
    ])
    if ("refused" in read) return mistaking(read.refused)
    const aimed = targeting(given, read.taken.filePath, read.taken.key)
    if ("code" in aimed) return aimed
    const taken = pipedIn()
    if ("tty" in taken) return mistaking([BARE])
    if ("unreadable" in taken) {
      return refusedBy([`what is piped in would not open — ${taken.unreadable}`], OPERATIONAL)
    }
    const value = valueSaid(taken.bytes, read.taken.keepLastNewline)
    if (typeof value !== "string") return mistaking([value.refused])
    const next = new Map(secretsIn(given.root, aimed.target.path) ?? [])
    next.set(read.taken.key, value)
    return landedWith(given, read.taken, aimed.target, ACT, next)
  })
}
