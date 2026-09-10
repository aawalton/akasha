import { lintedOver } from "@akasha/code/code-lint"
import type { Change } from "@akasha/pages/change"
import { mirroredOf } from "../../../modules/change-mirror/change-mirror.module.code.ts"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  CONFIG,
  carriedIn,
  judgedOf,
  readsIn,
  skippedIn,
} from "./lint-clean.code-check.decision.code.ts"

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
  const mirror = mirroredOf(change.root, carried, change.after, CONFIGURED)
  try {
    return judgedOf(lintedOver(mirror.root, carried, change.root), first, mirror.root)
  } finally {
    mirror.sweep()
  }
}

export const lintClean = input(LOOKED, refusalsIn)
