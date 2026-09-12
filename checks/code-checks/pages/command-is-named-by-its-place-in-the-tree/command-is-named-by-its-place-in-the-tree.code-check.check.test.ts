import { afterAll, expect, test } from "bun:test"
import { commandIsInTheRightFolder } from "akasha/checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.code-check.check.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  claiming,
  declaring,
  edging,
  founded,
  landing,
  shadowed,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { pageFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const NS = "01a08d69-0b2e-7101-8000-000000000001"

const CMD = "01a08d69-0b2e-7102-8000-000000000002"

const NS_AT = "commands/pages/warbling/warbling.namespace.ts"

const UNDER = "commands/pages/warbling/humming/warbling-humming.command.ts"

const BESIDE = "commands/pages/warbling/warbling-humming.command.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(at: string): string {
  const root = scratch.rootFor("akasha-command-tree-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  typed(root, "command", "module")
  typed(root, "namespace", "domain")
  declaring(root, "parts", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  listedFiled(root, "command", "warbling-humming", [{ path: at, id: CMD }])
  pageFiled(root, CMD, at)
  pageFiled(root, NS, NS_AT)
  claiming(root, NS_AT, NS_AT, NS)
  edging(root, CMD, "parts", NS, NS_AT)
  return root
}

function namespaceBody(): Uint8Array {
  return new TextEncoder().encode(
    `export const warbling = { id: ${JSON.stringify(NS)}, pageTypeSlug: "namespace", ` +
      `slug: "warbling", parts: ["command/warbling-humming"] }\n`
  )
}

function judged(change: Change): readonly Judged[] {
  return commandIsInTheRightFolder(change, shadowed(change))
}

test("a namespace naming a command leaves that command judged, though it did not change", () => {
  const said = judged(landing(rooted(BESIDE), { [NS_AT]: namespaceBody() }))

  expect(said.map((one) => one.path)).toEqual([BESIDE])
  expect(said[0]?.reason).toContain("commands/pages/warbling/humming")
})

test("a namespace naming a command already in its own folder is let through", () => {
  expect(judged(landing(rooted(UNDER), { [NS_AT]: namespaceBody() }))).toEqual([])
})
