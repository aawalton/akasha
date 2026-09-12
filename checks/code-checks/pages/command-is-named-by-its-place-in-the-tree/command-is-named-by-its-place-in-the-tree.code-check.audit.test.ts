import { afterAll, expect, test } from "bun:test"
import { commandIsInTheRightFolder } from "akasha/checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.code-check.audit.code.ts"
import {
  claiming,
  declaring,
  edging,
  founded,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { pageFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const NS = "01a08d69-0b2e-7201-8000-000000000001"

const CMD = "01a08d69-0b2e-7202-8000-000000000002"

const NS_AT = "commands/pages/warbling/warbling.namespace.ts"

const UNDER = "commands/pages/warbling/humming/warbling-humming.command.ts"

const BESIDE = "commands/pages/warbling/warbling-humming.command.ts"

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
  claiming(root, at, at, CMD)
  claiming(root, NS_AT, NS_AT, NS)
  edging(root, CMD, "parts", NS, NS_AT)
  return root
}

test("an audit refuses a command sitting beside the namespace naming it", () => {
  const said = commandIsInTheRightFolder(rooted(BESIDE))

  expect(said.map((one) => one.path)).toEqual([BESIDE])
  expect(said[0]?.reason).toContain("commands/pages/warbling/humming")
})

test("an audit lets a command in a folder directly inside its namespace through", () => {
  expect(commandIsInTheRightFolder(rooted(UNDER))).toEqual([])
})
