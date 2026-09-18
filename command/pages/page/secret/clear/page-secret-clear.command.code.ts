import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commitMessage } from "akasha/command/argument/pages/commit-message.argument.ts"
import { filePath } from "akasha/command/argument/pages/file-path.argument.ts"
import { key as keyArgument } from "akasha/command/argument/pages/key.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking, wrongData } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { pageSecretClear as page } from "akasha/command/pages/page/secret/clear/page-secret-clear.command.ts"
import {
  caught,
  landedWith,
  targeting,
  undeclared,
} from "akasha/page/command/modules/page-secret-acting/page-secret-acting.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"

const ACT = "clear"

export async function pageSecretClear(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const read = takenFor(argv, given.calledAs, page, [filePath, keyArgument, commitMessage])
    if ("refused" in read) return mistaking(read.refused)
    const key = read.taken.key
    const aimed = targeting(given, read.taken.filePath, undefined)
    if ("code" in aimed) return aimed
    const held = secretsIn(given.root, aimed.target.path)
    if (held === null || !held.has(key)) {
      const wrong = undeclared(key, aimed.target)
      if (wrong !== null) return mistaking([wrong])
      return wrongData(`${aimed.target.sidecar} holds no \`${key}\`, so there is none to clear`)
    }
    const next = new Map(held)
    next.delete(key)
    return landedWith(given, read.taken, aimed.target, ACT, next)
  })
}
