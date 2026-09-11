import { runChange as moveFile } from "akasha/changes/mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "akasha/changes/mechanical/file/move/move-file-code/move-file-code.change-mechanical.code.ts"
import { runChange as moveFileOfAnyKind } from "akasha/changes/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.code.ts"
import { runChange as moveFilePage } from "akasha/changes/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.code.ts"
import { runChange as changeImports } from "akasha/changes/mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Reaching } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export const MOVING: Reaching = async (world, at, given) => {
  if (at === "change-mechanical/move-file-of-any-kind") {
    return await moveFileOfAnyKind(world, given as Parameters<typeof moveFileOfAnyKind>[1])
  }
  if (at === "change-mechanical-file/move-file-page") {
    return await moveFilePage(world, given as Parameters<typeof moveFilePage>[1])
  }
  if (at === "change-mechanical/move-file-code") {
    return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
  }
  if (at === "change-mechanical-file/move-file") {
    return moveFile(world, given as Parameters<typeof moveFile>[1])
  }
  if (at === "change-mechanical-file-content/change-imports") {
    return changeImports(world, given as Parameters<typeof changeImports>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}
