import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { commitMessage } from "akasha/commands/arguments/pages/commit-message.argument.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { key as keyArgument } from "akasha/commands/arguments/pages/key.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { pageSecretClear as page } from "akasha/commands/pages/page/secret/clear/page-secret-clear.command.ts"
import {
  caught,
  landedWith,
  targeting,
  wrongData,
} from "akasha/pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import { secretsIn } from "akasha/pages/secret/page-secret.module.code.ts"

const ACT = "clear"

export async function pageSecretClear(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const read = takenFor(argv, given.calledAs, page, [filePath, keyArgument, commitMessage])
    if ("refused" in read) return mistaking(read.refused)
    const key = read.taken.key
    const aimed = targeting(given, read.taken.filePath, key)
    if ("code" in aimed) return aimed
    const held = secretsIn(given.root, aimed.target.path)
    if (held === null || !held.has(key)) {
      return wrongData(`${aimed.target.sidecar} holds no \`${key}\`, so there is none to clear`)
    }
    const next = new Map(held)
    next.delete(key)
    return landedWith(given, read.taken, aimed.target, ACT, next)
  })
}
