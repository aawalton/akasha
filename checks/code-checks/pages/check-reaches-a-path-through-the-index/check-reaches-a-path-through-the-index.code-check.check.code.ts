import { textIn } from "akasha/code-system/body-text/body-text.module.code.ts"
import {
  type Facing,
  generatedIn,
  toolResolvesPathsIn,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import {
  type Body,
  FILES,
  judgingEach,
  type Selector,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  type Asking,
  askingOver,
  judgingOver,
  type Naming,
  namingOver,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.decision.code.ts"

const FACING = new WeakMap<Shadow, Facing>()

function facingFor(shadow: Shadow): Facing {
  const found = FACING.get(shadow)
  if (found !== undefined) return found
  const index = shadow.index
  const made: Facing = {
    kindsUnder: (of) => index.kindsUnder(of),
    everyOfType: (kind) => index.everyOfType(kind),
    valueAt: (path) => index.pageByPath(path),
    carryingOf: (named) => index.carryingOf(named),
  }
  FACING.set(shadow, made)
  return made
}

const JUDGED = new WeakMap<Shadow, (path: string) => boolean>()

function judgedFor(shadow: Shadow): (path: string) => boolean {
  const found = JUDGED.get(shadow)
  if (found !== undefined) return found
  const made = judgingOver({
    types: shadow.index.pageTypesIn(),
    listed: (path) => shadow.index.listedByPath(path).length > 0,
    generated: (path) => generatedIn(facingFor(shadow), path),
    toolResolvesPaths: (path) => toolResolvesPathsIn(facingFor(shadow), path),
  })
  JUDGED.set(shadow, made)
  return made
}

const ASKING = new WeakMap<Shadow, Asking>()

function askingFor(shadow: Shadow): Asking {
  const found = ASKING.get(shadow)
  if (found !== undefined) return found
  const made = askingOver(shadow.index.everyPath())
  ASKING.set(shadow, made)
  return made
}

const NAMING = new WeakMap<Shadow, Naming>()

function namingFor(shadow: Shadow): Naming {
  const found = NAMING.get(shadow)
  if (found !== undefined) return found
  const made = namingOver(shadow.index.everyPath(), shadow.index.pageTypesIn())
  NAMING.set(shadow, made)
  return made
}

export const PAGE_FILES: Selector<Body> = {
  named: "the files a page holds",
  isInput: (path, shadow) => judgedFor(shadow)(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => judgedFor(shadow)(one.path)),
}

export const checkReachesAPathThroughTheIndex = judgingEach(PAGE_FILES, (given, shadow) =>
  reasonsIn(askingFor(shadow), namingFor(shadow), given.path, textIn(given.bytes))
)
