import { afterAll, expect, test } from "bun:test"
import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  typegenOf,
  typesUnder,
} from "akasha/check/code/pages/browser-code-compiles/modules/route-typegen/route-typegen.module.code.ts"
import {
  ADDED_AT,
  ADDED_BREAKS,
  APP,
  scratch,
  TABLE_ADDING,
  TABLE_AT,
  TABLE_UNREAD,
  treeOver,
  written,
} from "akasha/check/code/pages/browser-code-compiles/modules/route-typegen/route-typegen.module.test-fixtures.ts"

afterAll(scratch.sweep)

const WAITS = 60_000

const ONE_TYPES = "routes/one/+types/one.route.code.ts"

const TWO_TYPES = "routes/two/+types/two.route.code.ts"

const UNLISTED_AT = "held/unlisted.ts"

test(
  "route types are written outside the tree, from only the files the tree lists",
  () => {
    const root = written()
    writeFileSync(join(root, UNLISTED_AT), "export const unlisted = 1\n")
    const made = typegenOf(treeOver(root, {}), APP)
    const into = made.types.slice(0, -typesUnder(APP).length)
    try {
      expect(made.failed).toBeNull()
      expect(made.types.startsWith(`${root}/`)).toBe(false)
      expect(existsSync(join(made.types, ONE_TYPES))).toBe(true)
      expect(existsSync(join(root, APP, ".react-router"))).toBe(false)
      expect(existsSync(join(into, TABLE_AT))).toBe(true)
      expect(existsSync(join(into, UNLISTED_AT))).toBe(false)
    } finally {
      made.sweep()
    }
    expect(existsSync(made.types)).toBe(false)
  },
  WAITS
)

test(
  "a route the change adds is typed from the table the change leaves, though no disk holds it",
  () => {
    const root = written()
    const over = { [TABLE_AT]: TABLE_ADDING, [ADDED_AT]: ADDED_BREAKS }
    const made = typegenOf(treeOver(root, over), APP)
    try {
      expect(made.failed).toBeNull()
      expect(existsSync(join(made.types, TWO_TYPES))).toBe(true)
      expect(existsSync(join(root, ADDED_AT))).toBe(false)
    } finally {
      made.sweep()
    }
  },
  WAITS
)

test(
  "a table the typegen cannot read is answered as why rather than thrown",
  () => {
    const root = written()
    const over = { [TABLE_AT]: TABLE_UNREAD }
    const made = typegenOf(treeOver(root, over), APP)
    try {
      expect(made.failed).not.toBeNull()
      expect(made.failed ?? "").not.toContain("akasha-route-typegen-")
    } finally {
      made.sweep()
    }
  },
  WAITS
)
