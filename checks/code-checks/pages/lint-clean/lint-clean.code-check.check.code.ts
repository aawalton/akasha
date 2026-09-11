import {
  CONFIG,
  carriedIn,
  HERE,
  judgedOf,
  readsIn,
  skippedIn,
} from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.decision.code.ts"
import { mirroredOf } from "akasha/checks/modules/change-mirror/change-mirror.module.code.ts"
import type {
  Body,
  Selector,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { lintedOver } from "akasha/code-system/code-lint/code-lint.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"

const IGNORE = ".gitignore"

const CONFIGURED: readonly string[] = [CONFIG, IGNORE]

const LOOKED: Selector<Body> = {
  named: "the files the linter reads and the configuration naming them",
  isInput: () => true,
  from: (change, shadow) => FILES.from(change, shadow),
}

function refusalsIn(change: Change): readonly Judged[] {
  const said = change.after(CONFIG)
  const carried = carriedIn(change, readsIn(said), skippedIn(said))
  const first = carried[0]
  if (first === undefined) return []
  const mirror = mirroredOf([...carried, ...CONFIGURED], change.after)
  try {
    return judgedOf(lintedOver(mirror.root, HERE, change.root), first, mirror.root)
  } finally {
    mirror.sweep()
  }
}

export const lintClean = input(LOOKED, refusalsIn)
