import {
  type Passing,
  passingIn,
} from "akasha/check/code/pages/no-spacing-literal/no-spacing-literal.check-code.decision.code.ts"
import {
  founded,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const COMPONENT = "ios-component"

const PAGES_AT = "code/ios-component/pages"

const RING = "ring"

const VIEW = "alanwalton-claude-usage-view"

export const RING_AT = `${PAGES_AT}/${RING}/${RING}.${COMPONENT}.swift.swift`

export const VIEW_AT = `${PAGES_AT}/${VIEW}/${VIEW}.${COMPONENT}.swift.swift`

export const HELD_AT = `${PAGES_AT}/held/held.${COMPONENT}.swift.swift`

export const PASSING: Passing = {
  granted: new Map([
    [RING_AT, new Set(["lineWidth 12"])],
    [VIEW_AT, new Set(["spacing 1"])],
  ]),
}

export const scratch = scratchWorld()

const RING_ID = "01a0827a-4d80-7000-8000-000000000001"

const VIEW_ID = "01a0827a-4d80-7000-8000-000000000002"

function paged(root: string, slug: string, id: string): undefined {
  const path = `${PAGES_AT}/${slug}/${slug}.${COMPONENT}.ts`
  listedFiled(root, COMPONENT, slug, [{ path, id }])
  writing(
    root,
    path,
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(COMPONENT)},` +
      ` slug: ${JSON.stringify(slug)}, swift: "swift" }\n`
  )
}

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-spacing-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, COMPONENT, "page")
  paged(root, RING, RING_ID)
  paged(root, VIEW, VIEW_ID)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-spacing-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export function passingAt(root: string): Passing {
  return passingIn(shadowAt(root))
}
