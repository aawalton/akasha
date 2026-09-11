import { dirname } from "node:path"
import {
  type Asking,
  DIRECTIVE,
  MANIFEST,
  PACKAGE,
  reasonsIn,
  sidesIn,
} from "akasha/checks/code-checks/pages/client-reaches-pages-through-its-hooks/client-reaches-pages-through-its-hooks.code-check.decision.code.ts"
import {
  bodyOf,
  onDisk,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { fileKeysAt } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { everyPath, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export function askingAt(root: string): Asking {
  const disk = onDisk(root)
  return {
    folderOf: (slug) => {
      const one = listedAt(root, PACKAGE, slug)[0]
      return one === undefined ? null : dirname(one.path)
    },
    manifestNamed: () => fileKeysAt(root).get(MANIFEST) ?? null,
    textAt: (path) => {
      const bytes = disk(path)
      return bytes === null ? null : bodyOf({ root, path, bytes })
    },
  }
}

export function clientReachesPagesThroughItsHooks(root: string): readonly Judged[] {
  const asking = askingAt(root)
  const sides = sidesIn(asking)
  if (sides === null) return []
  const said: Judged[] = []
  for (const path of everyPath(root)) {
    if (!textNamed(path)) continue
    const text = asking.textAt(path)
    if (text === null || !text.includes(DIRECTIVE)) continue
    for (const reason of reasonsIn(path, text, sides)) said.push({ path, reason })
  }
  return said
}
