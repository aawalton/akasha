import {
  judgingBy,
  kindsFor,
} from "akasha/checks/code-checks/pages/command-is-in-the-right-folder/command-is-in-the-right-folder.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { namedUnder } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function commandIsInTheRightFolder(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const kinds = kindsFor(shadow)
  const judging = judgingBy(shadow)
  const said: Judged[] = []
  for (const path of everyPath(root)) {
    const one = namedUnder(path, kinds)
    if (one === null) continue
    const filed = shadow.index.listedByPath(path).find((each) => each.path === path)
    if (filed === undefined) continue
    const reason = judging(filed.id, path, one.slug)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}
