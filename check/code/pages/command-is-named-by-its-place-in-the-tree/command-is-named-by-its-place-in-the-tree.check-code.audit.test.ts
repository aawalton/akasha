import { afterAll, expect, test } from "bun:test"
import { commandIsNamedByItsPlaceInTheTree } from "akasha/check/code/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.check-code.audit.code.ts"
import {
  claiming,
  declaring,
  edging,
  founded,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const NS = "01a08d69-0b2e-7201-8000-000000000001"

const CMD = "01a08d69-0b2e-7202-8000-000000000002"

const NS_AT = "command/pages/warbling/warbling.namespace.ts"

const UNDER = "command/pages/warbling/humming/warbling-humming.command.ts"

const BESIDE = "command/pages/warbling/warbling-humming.command.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(at: string): string {
  const root = scratch.rootFor("akasha-command-tree-audit-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  typed(root, "command", "module")
  typed(root, "namespace", "domain")
  declaring(root, "parts", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  listedFiled(root, "command", "warbling-humming", [{ path: at, id: CMD }])
  pageFiled(root, CMD, at)
  pageFiled(root, NS, NS_AT)
  claiming(root, at, CMD)
  claiming(root, NS_AT, NS)
  wrote(root, {
    [at]: `export const held = { id: ${JSON.stringify(CMD)}, type: "command", slug: "warbling-humming" }\n`,
  })
  edging(root, CMD, "parts", NS, NS_AT)
  return root
}

test("an audit refuses a command sitting beside the namespace naming it", () => {
  const said = commandIsNamedByItsPlaceInTheTree(rooted(BESIDE))

  expect(said.map((one) => one.path)).toEqual([BESIDE])
  expect(said[0]?.reason).toContain("command/pages/warbling/humming")
})

test("an audit lets a command in a folder directly inside its namespace through", () => {
  expect(commandIsNamedByItsPlaceInTheTree(rooted(UNDER))).toEqual([])
})
