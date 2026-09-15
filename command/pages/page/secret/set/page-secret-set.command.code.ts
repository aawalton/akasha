import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commitMessage } from "akasha/command/argument/pages/commit-message.argument.ts"
import { filePath } from "akasha/command/argument/pages/file-path.argument.ts"
import { keepLastNewline } from "akasha/command/argument/pages/keep-last-newline.argument.ts"
import { key as keyArgument } from "akasha/command/argument/pages/key.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { pageSecretSet as page } from "akasha/command/pages/page/secret/set/page-secret-set.command.ts"
import {
  caught,
  landedWith,
  pipedIn,
  targeting,
  valueIn as valueSaid,
} from "akasha/page/command/modules/page-secret-acting/page-secret-acting.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"

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
