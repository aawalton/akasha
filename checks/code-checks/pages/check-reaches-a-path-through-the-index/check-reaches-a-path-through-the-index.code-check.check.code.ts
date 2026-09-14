import {
  askingOver,
  judgingOver,
  type Naming,
  namingOver,
  pagePathsOf,
  type Reaching,
  reasonsIn,
} from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.code-check.decision.code.ts"
import {
  type Body,
  FILES,
  judgingEach,
  type Selector,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { textIn } from "akasha/code/bodies/modules/body-text/body-text.module.code.ts"
import type { Answering } from "akasha/pages/indexes/modules/answering/index-answering.module.code.ts"
import {
  claimantOf,
  pagingOf,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"
import {
  type Facing,
  generatedIn,
  toolResolvesPathsIn,
} from "akasha/pages/indexes/modules/property-carrying/property-carrying.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"

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
    root: shadow.root,
  }
  FACING.set(shadow, made)
  return made
}

const JUDGED = new WeakMap<Shadow, (path: string) => boolean>()

function judgedFor(shadow: Shadow): (path: string) => boolean {
  const found = JUDGED.get(shadow)
  if (found !== undefined) return found
  const paging = pagingOf(shadow.index.everyOfType)
  const types = shadow.index.pageTypesIn()
  const fileProperties = shadow.index.filePropertiesAt()
  const folders = shadow.index.folderPropertiesAt()
  const made = judgingOver({
    types,
    listed: (path) => claimantOf(paging, path, types, fileProperties, folders) !== null,
    generated: (path) => generatedIn(facingFor(shadow), path),
    toolResolvesPaths: (path) => toolResolvesPathsIn(facingFor(shadow), path),
  })
  JUDGED.set(shadow, made)
  return made
}

const PAGE_PATHS = new WeakMap<Answering, readonly string[]>()

function pagePathsFor(index: Answering): readonly string[] {
  const found = PAGE_PATHS.get(index)
  if (found !== undefined) return found
  const made = pagePathsOf(index.pageTypesIn(), (slug) => index.everyOfType(slug))
  PAGE_PATHS.set(index, made)
  return made
}

const REACHING = new WeakMap<Shadow, Reaching>()

function reachingFor(shadow: Shadow): Reaching {
  const found = REACHING.get(shadow)
  if (found !== undefined) return found
  const made = askingOver(shadow.listed(), pagePathsFor(shadow.index))
  REACHING.set(shadow, made)
  return made
}

const NAMING = new WeakMap<Shadow, Naming>()

function namingFor(shadow: Shadow): Naming {
  const found = NAMING.get(shadow)
  if (found !== undefined) return found
  const made = namingOver(shadow.listed(), shadow.index.pageTypesIn())
  NAMING.set(shadow, made)
  return made
}

const PAGE_FILES: Selector<Body> = {
  named: "the files a page holds",
  isInput: (path, shadow) => judgedFor(shadow)(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => judgedFor(shadow)(one.path)),
}

export const checkReachesAPathThroughTheIndex = judgingEach(PAGE_FILES, (given, shadow) =>
  reasonsIn(reachingFor(shadow), namingFor(shadow), given.path, textIn(given.bytes))
)
