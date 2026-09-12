import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { key as keyArgument } from "akasha/commands/arguments/pages/key.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { pageSecretShow as page } from "akasha/commands/pages/page/secret/show/page-secret-show.command.ts"
import {
  caught,
  mistaken,
  targeting,
  wrongData,
} from "akasha/pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import { secretsIn } from "akasha/pages/secret/page-secret.module.code.ts"

export async function pageSecretShow(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const read = takenFor(argv, given.calledAs, page, [filePath, keyArgument])
    if ("refused" in read) return mistaken(read.refused)
    const key = read.taken.key
    const aimed = targeting(given, read.taken.filePath, key)
    if ("code" in aimed) return aimed
    const held = secretsIn(given.root, aimed.target.path)
    const value = held === null ? undefined : held.get(key)
    if (value === undefined) {
      return wrongData(`${aimed.target.sidecar} holds no \`${key}\``)
    }
    return told([value])
  })
}
