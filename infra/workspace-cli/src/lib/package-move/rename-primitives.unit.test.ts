import { describe, expect, it } from "bun:test"
import {
  applyBoundaryMatch,
  applyPathRename,
  applyQuotedPrefix,
  applyTemplateTail,
} from "./rename-primitives"

describe("applyPathRename", () => {
  it("rewrites the bare path", () => {
    const r = applyPathRename('"packages/shared/foo"', "packages/shared/foo", "packages/shared/bar")
    expect(r.text).toBe('"packages/shared/bar"')
    expect(r.count).toBe(1)
  })

  it("rewrites nested subpaths", () => {
    const r = applyPathRename(
      '"packages/shared/foo/src/index.ts"',
      "packages/shared/foo",
      "packages/shared/bar"
    )
    expect(r.text).toBe('"packages/shared/bar/src/index.ts"')
  })

  it("preserves unrelated similar-prefix siblings", () => {
    const r = applyPathRename(
      '"packages/shared/foobar/x"',
      "packages/shared/foo",
      "packages/shared/bar"
    )
    expect(r.text).toBe('"packages/shared/foobar/x"')
    expect(r.count).toBe(0)
  })

  it("no-op when old === new", () => {
    const r = applyPathRename('"x"', "x", "x")
    expect(r.count).toBe(0)
  })

  it("is idempotent when new is a strict child of old (bare)", () => {
    const r = applyPathRename(
      '"packages/temper/inventory/core"',
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe('"packages/temper/inventory/core"')
    expect(r.count).toBe(0)
  })

  it("is idempotent when new is a strict child of old (subpath)", () => {
    const r = applyPathRename(
      '"packages/temper/inventory/core/src/index.ts"',
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe('"packages/temper/inventory/core/src/index.ts"')
    expect(r.count).toBe(0)
  })

  it("rewrites a sibling subpath of new even when new is a child of old", () => {
    const r = applyPathRename(
      '"packages/temper/inventory/coredump/x"',
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe('"packages/temper/inventory/core/coredump/x"')
    expect(r.count).toBe(1)
  })
})

describe("applyQuotedPrefix", () => {
  it("rewrites double-quoted bare name", () => {
    const r = applyQuotedPrefix('"@shared/foo"', "@shared/foo", "@shared/bar")
    expect(r.text).toBe('"@shared/bar"')
  })

  it("rewrites quoted subpath", () => {
    const r = applyQuotedPrefix('"@shared/foo/util"', "@shared/foo", "@shared/bar")
    expect(r.text).toBe('"@shared/bar/util"')
  })

  it("preserves quote style", () => {
    const r1 = applyQuotedPrefix("'@a/b'", "@a/b", "@c/d")
    expect(r1.text).toBe("'@c/d'")
    const r2 = applyQuotedPrefix("`@a/b`", "@a/b", "@c/d")
    expect(r2.text).toBe("`@c/d`")
  })

  it("does not cross quote boundaries", () => {
    const r = applyQuotedPrefix('"@a/b", "@x/y"', "@a/b", "@c/d")
    expect(r.text).toBe('"@c/d", "@x/y"')
    expect(r.count).toBe(1)
  })

  it("is idempotent when new is a strict child of old (bare)", () => {
    const r = applyQuotedPrefix(
      '"@temper/game-items-core/core"',
      "@temper/game-items-core",
      "@temper/game-items-core/core"
    )
    expect(r.text).toBe('"@temper/game-items-core/core"')
    expect(r.count).toBe(0)
  })

  it("is idempotent when new is a strict child of old (subpath)", () => {
    const r = applyQuotedPrefix(
      '"@temper/game-items-core/core/util"',
      "@temper/game-items-core",
      "@temper/game-items-core/core"
    )
    expect(r.text).toBe('"@temper/game-items-core/core/util"')
    expect(r.count).toBe(0)
  })

  it("rewrites a sibling subpath of new even when new is a child of old", () => {
    const r = applyQuotedPrefix(
      '"@temper/game-items-core/coredump/x"',
      "@temper/game-items-core",
      "@temper/game-items-core/core"
    )
    expect(r.text).toBe('"@temper/game-items-core/core/coredump/x"')
    expect(r.count).toBe(1)
  })
})

describe("applyTemplateTail", () => {
  it("rewrites prefix splice after ${...}", () => {
    const r = applyTemplateTail("`${root}/old/sub`", "old", "new")
    expect(r.text).toBe("`${root}/new/sub`")
  })

  it("does not rewrite outside backticks", () => {
    const r = applyTemplateTail('"${root}/old/sub"', "old", "new")
    expect(r.text).toBe('"${root}/old/sub"')
    expect(r.count).toBe(0)
  })

  it("does not rewrite without leading slash", () => {
    const r = applyTemplateTail("`old-adjacent`", "old", "new")
    expect(r.count).toBe(0)
  })

  it("is idempotent when new is a strict child of old", () => {
    const r = applyTemplateTail(
      "`${root}/packages/temper/inventory/core/src`",
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe("`${root}/packages/temper/inventory/core/src`")
    expect(r.count).toBe(0)
  })

  it("rewrites a sibling subpath of new even when new is a child of old", () => {
    const r = applyTemplateTail(
      "`${root}/packages/temper/inventory/coredump/x`",
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe("`${root}/packages/temper/inventory/core/coredump/x`")
    expect(r.count).toBe(1)
  })
})

describe("applyBoundaryMatch", () => {
  it("rewrites prose mention", () => {
    const r = applyBoundaryMatch("See `packages/old` for details.", "packages/old", "packages/new")
    expect(r.text).toBe("See `packages/new` for details.")
  })

  it("rewrites markdown link body", () => {
    const r = applyBoundaryMatch("[doc](packages/old/docs.md)", "packages/old", "packages/new")
    expect(r.text).toBe("[doc](packages/new/docs.md)")
  })

  it("preserves similar-prefix identifier", () => {
    const r = applyBoundaryMatch("foo-packages/old-adjacent-x", "packages/old", "packages/new")
    expect(r.count).toBe(0)
  })

  it("rewrites at start of line", () => {
    const r = applyBoundaryMatch("packages/old/x\n", "packages/old", "packages/new")
    expect(r.text).toBe("packages/new/x\n")
  })

  it("is idempotent when new is a strict child of old (bare)", () => {
    const r = applyBoundaryMatch(
      "See `packages/temper/inventory/core` for details.",
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe("See `packages/temper/inventory/core` for details.")
    expect(r.count).toBe(0)
  })

  it("is idempotent when new is a strict child of old (subpath)", () => {
    const r = applyBoundaryMatch(
      "[doc](packages/temper/inventory/core/docs.md)",
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe("[doc](packages/temper/inventory/core/docs.md)")
    expect(r.count).toBe(0)
  })

  it("rewrites a sibling subpath of new even when new is a child of old", () => {
    const r = applyBoundaryMatch(
      "[doc](packages/temper/inventory/coredump/x.md)",
      "packages/temper/inventory",
      "packages/temper/inventory/core"
    )
    expect(r.text).toBe("[doc](packages/temper/inventory/core/coredump/x.md)")
    expect(r.count).toBe(1)
  })
})
