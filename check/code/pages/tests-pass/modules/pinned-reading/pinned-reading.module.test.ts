import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { pinnedBodies } from "akasha/check/code/pages/tests-pass/modules/pinned-reading/pinned-reading.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import {
  graphedRepo,
  HELD_CODE,
  NAMER_CODE,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const GONE = "akasha/two/never.module.test.ts"

function pinnedRepo(): { readonly root: string; readonly base: string } {
  const root = graphedRepo()
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "indexed"])
  return { root, base: git(root, ["rev-parse", "HEAD"]).trim() }
}

const DECODING = new TextDecoder()

function textOf(body: unknown): string | null {
  return body instanceof Uint8Array ? DECODING.decode(body) : null
}

test("a named test the checkout lost is read at the commit", () => {
  const { root, base } = pinnedRepo()
  const was = textIn(root)(NAMER_CODE)
  rmSync(join(root, NAMER_CODE))
  const found = pinnedBodies(root, base, pagesAt(root, base), [NAMER_CODE], {})
  expect(textOf(found[NAMER_CODE])).toBe(was)
})

test("a file a named test imports is read at the commit too", () => {
  const { root, base } = pinnedRepo()
  const was = textIn(root)(HELD_CODE)
  rmSync(join(root, HELD_CODE))
  const found = pinnedBodies(root, base, pagesAt(root, base), [NAMER_CODE], {})
  expect(textOf(found[HELD_CODE])).toBe(was)
})

test("a named test the commit has nowhere is carried as a removal", () => {
  const { root, base } = pinnedRepo()
  const found = pinnedBodies(root, base, pagesAt(root, base), [GONE], {})
  expect(Object.hasOwn(found, GONE)).toBe(true)
  expect(found[GONE]).toBeNull()
})

test("a body the change carries already is kept", () => {
  const { root, base } = pinnedRepo()
  const found = pinnedBodies(root, base, pagesAt(root, base), [NAMER_CODE], {
    [NAMER_CODE]: "kept\n",
  })
  expect(found[NAMER_CODE]).toBe("kept\n")
})
