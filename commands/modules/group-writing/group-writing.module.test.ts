import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { bodyIn as bodyOf } from "akasha/commands/modules/change-preparing/change-preparing.module.code.ts"
import {
  groupAt,
  groupsIn,
  type Reaching,
  writingIn,
  writtenOver,
} from "akasha/commands/modules/group-writing/group-writing.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { shadowAt, shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

const ROOT = codeRoot()

const INDEX = shadowAt(ROOT).index

const BYTES = new TextEncoder()

const MARKER = "the body the change leaves\n"

const OFF_DISK = "the body the checkout has\n"

const TURNED = `export function bodyIn(): string {\n  return ${JSON.stringify(MARKER)}\n}\n`

const COMPOSING = "composing"

const PAGE = "here/there/one.container-recipe.ts"

const GROUP = "here/there/one.container-recipe.composing.code.ts"

const WRITTEN = "here/there/Containerfile"

describe("where a page's group sits", () => {
  test("a group's code is beside the page keeping that group", () => {
    expect(groupAt(PAGE, COMPOSING)).toBe(GROUP)
  })

  test("a path that is no TypeScript file names no group", () => {
    expect(groupAt(WRITTEN, COMPOSING)).toBeNull()
  })
})

describe("the groups a file property names", () => {
  test("a group is answered with the property whose file that group writes", () => {
    const found = groupsIn(INDEX).find((one) => one.slug === COMPOSING)
    expect(found?.propertySlug).toBe("recipe")
  })

  test("a group is answered with the page types carrying that group", () => {
    const found = groupsIn(INDEX).find((one) => one.slug === COMPOSING)
    expect(found?.pageTypeSlugs).toEqual(["container-recipe"])
  })

  test("a group no file property names is not answered", () => {
    expect(groupsIn(INDEX).find((one) => one.slug === "check")).toBeUndefined()
  })
})

describe("reaching a group", () => {
  test("a group at no path is said rather than thrown", () => {
    expect("missing" in writingIn(ROOT, GROUP)).toBe(true)
  })

  test("every group beside a page answers the one function a group answers", () => {
    const gone: string[] = []
    for (const group of groupsIn(INDEX)) {
      for (const pageTypeSlug of group.pageTypeSlugs) {
        for (const listed of INDEX.everyOfType(pageTypeSlug)) {
          const beside = groupAt(listed.path, group.slug)
          if (beside === null || !existsSync(join(ROOT, beside))) continue
          if ("missing" in writingIn(ROOT, beside)) gone.push(beside)
        }
      }
    }
    expect(gone).toEqual([])
  })
})

function groupCodes(): readonly string[] {
  const found: string[] = []
  for (const group of groupsIn(INDEX)) {
    for (const pageTypeSlug of group.pageTypeSlugs) {
      for (const listed of INDEX.everyOfType(pageTypeSlug)) {
        const beside = groupAt(listed.path, group.slug)
        if (beside !== null && existsSync(join(ROOT, beside))) found.push(beside)
      }
    }
  }
  return [...found].sort()
}

const ONE = groupCodes()[0] as string

const WAS = readFileSync(join(ROOT, ONE), "utf8")

function bytesAt(path: string): Uint8Array | null {
  const full = join(ROOT, path)
  return existsSync(full) ? new Uint8Array(readFileSync(full)) : null
}

function changeTurning(at: string, body: string): Change {
  return {
    root: ROOT,
    changed: [at],
    before: (path) => bytesAt(path),
    after: (path) => (path === at ? BYTES.encode(body) : bytesAt(path)),
  }
}

const HANDED: Reaching = (_root, _at, body) => ({ writing: () => body ?? OFF_DISK })

describe("the body a group's code is loaded from", () => {
  test("a group is run off the body the change leaves", () => {
    const reached = writingIn(ROOT, ONE, TURNED)
    expect("writing" in reached ? reached.writing(ROOT) : reached.missing).toBe(MARKER)
  })

  test("a group is run off the checkout again once that body is loaded", () => {
    const reached = writingIn(ROOT, ONE)
    expect("writing" in reached ? reached.writing(ROOT) : reached.missing).not.toBe(MARKER)
  })
})

describe("a change to a group's own code", () => {
  const change = changeTurning(ONE, TURNED)
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const written = writtenOver(change, cast.shadow, cast.reading, HANDED)

  test("the file that group writes is composed from the body the change leaves", () => {
    expect(written.edits.filter((one) => bodyOf(one) === TURNED)).toHaveLength(1)
  })

  test("no file is composed from the body the checkout has at that path", () => {
    expect(written.edits.filter((one) => bodyOf(one) === WAS)).toEqual([])
  })

  test("a group the change leaves alone is handed no body", () => {
    const rest = written.edits.filter((one) => bodyOf(one) !== TURNED)
    expect(rest.length).toBeGreaterThan(0)
    expect(rest.every((one) => bodyOf(one) === OFF_DISK)).toBe(true)
  })
})
