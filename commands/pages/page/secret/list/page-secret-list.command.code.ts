import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { filePath } from "akasha/command/arguments/pages/file-path.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { pageSecretList as page } from "akasha/command/pages/page/secret/list/page-secret-list.command.ts"
import {
  caught,
  targeting,
} from "akasha/pages/command/modules/page-secret-acting/page-secret-acting.module.code.ts"
import { keysBeside } from "akasha/pages/modules/secret/page-secret.module.code.ts"
import { namesDrawn } from "akasha/utils/text/modules/name-drawing/name-drawing.module.code.ts"

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
