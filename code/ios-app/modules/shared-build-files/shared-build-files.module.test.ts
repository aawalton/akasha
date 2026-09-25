import { expect, test } from "bun:test"
import { sharedBuildFiles } from "akasha/code/ios-app/modules/shared-build-files/shared-build-files.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { readingNone } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

test("the shared files are read from the pages a commit holds when those pages are handed in", () => {
  const pinned = sharedBuildFiles(pagesAt(codeRoot(), "HEAD"))
  if ("why" in pinned) throw new Error(pinned.why)
  expect(pinned.files.length).toBeGreaterThan(0)
  expect(sharedBuildFiles(codeRoot())).toEqual(pinned)
})

test("pages naming no ios-app page type share nothing, whatever the checkout holds", () => {
  expect(sharedBuildFiles(readingNone())).toHaveProperty("why")
})
