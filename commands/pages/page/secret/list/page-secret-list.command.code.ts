import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { pageSecretList as page } from "akasha/commands/pages/page/secret/list/page-secret-list.command.ts"
import {
  caught,
  targeting,
} from "akasha/pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import { keysBeside } from "akasha/pages/secret/page-secret.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const NOTHING = "nothing"

export async function pageSecretList(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const read = takenFor(argv, given.calledAs, page, [filePath])
    if ("refused" in read) return mistaking(read.refused)
    const aimed = targeting(given, read.taken.filePath, undefined)
    if ("code" in aimed) return aimed
    const target = aimed.target
    const keys = keysBeside(given.root, target.path)
    return told([
      `held:   ${target.sidecar} holds ${keys.length === 0 ? NOTHING : namesDrawn(keys)}`,
      `secret: the page type declares ${
        target.declared.length === 0 ? "no key" : namesDrawn(target.declared)
      }`,
    ])
  })
}
