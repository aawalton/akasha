import { dirname } from "node:path"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { input, TEXTS, textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  type Asking,
  DIRECTIVE,
  MANIFEST,
  PACKAGE,
  reasonsIn,
  sidesIn,
} from "./client-reaches-pages-through-its-hooks.code-check.decision.code.ts"

export function askingIn(change: Change, shadow: Shadow): Asking {
  return {
    folderOf: (slug) => {
      const one = shadow.index.listedAt(PACKAGE, slug)[0]
      return one === undefined ? null : dirname(one.path)
    },
    manifestNamed: () => shadow.index.fileKeysAt().get(MANIFEST) ?? null,
    textAt: (path) => textIn(change, path),
  }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const texts = TEXTS.from(change, shadow).filter((one) => one.text.includes(DIRECTIVE))
  if (texts.length === 0) return []
  const sides = sidesIn(askingIn(change, shadow))
  if (sides === null) return []
  const said: Judged[] = []
  for (const one of texts) {
    for (const reason of reasonsIn(one.path, one.text, sides)) {
      said.push({ path: one.path, reason })
    }
  }
  return said
}

export const clientReachesPagesThroughItsHooks = input(TEXTS, refusalsIn)
