import { afterAll, expect, test } from "bun:test"
import { commandIsNamedByItsPlaceInTheTree } from "akasha/check/code/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  claiming,
  declaring,
  edging,
  founded,
  landing,
  shadowed,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const NS = "01a08d69-0b2e-7101-8000-000000000001"

const CMD = "01a08d69-0b2e-7102-8000-000000000002"

const NS_AT = "command/pages/warbling/warbling.namespace.ts"

const UNDER = "command/pages/warbling/humming/warbling-humming.command.ts"

const BESIDE = "command/pages/warbling/warbling-humming.command.ts"

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
  claiming(root, NS_AT, NS)
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
  return commandIsNamedByItsPlaceInTheTree(change, shadowed(change))
}

test("a namespace naming a command leaves that command judged, though it did not change", () => {
  const said = judged(landing(rooted(BESIDE), { [NS_AT]: namespaceBody() }))

  expect(said.map((one) => one.path)).toEqual([BESIDE])
  expect(said[0]?.reason).toContain("command/pages/warbling/humming")
})

test("a namespace naming a command already in its own folder is let through", () => {
  expect(judged(landing(rooted(UNDER), { [NS_AT]: namespaceBody() }))).toEqual([])
})

const MOD = "01a08d69-0b2e-7103-8000-000000000003"

const MOD_AT = "command/pages/warbling/humming/modules/trilling/trilling.module.ts"

const MOD_CODE = "command/pages/warbling/humming/modules/trilling/trilling.module.code.ts"

const CMD_CODE = "command/pages/warbling/humming/warbling-humming.command.code.ts"

const BYTES = new TextEncoder()

function bare(): string {
  const root = scratch.rootFor("akasha-command-arriving-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  typed(root, "command", "module")
  typed(root, "namespace", "domain")
  declaring(root, "parts", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  pageFiled(root, NS, NS_AT)
  claiming(root, NS_AT, NS)
  listedFiled(root, "namespace", "warbling", [{ path: NS_AT, id: NS }])
  return root
}

function arriving(): Change {
  return landing(bare(), {
    [UNDER]: BYTES.encode(
      `export const held = { id: ${JSON.stringify(CMD)}, pageTypeSlug: "command", ` +
        `slug: "warbling-humming", parts: ["module/trilling"] }\n`
    ),
    [CMD_CODE]: BYTES.encode(
      `import { trilling } from "akasha/${MOD_CODE}"\nexport const said = trilling\n`
    ),
    [MOD_AT]: BYTES.encode(
      `export const held = { id: ${JSON.stringify(MOD)}, pageTypeSlug: "module", slug: "trilling" }\n`
    ),
    [MOD_CODE]: BYTES.encode(`export function trilling(): string {\n  return "trilling"\n}\n`),
  })
}

test("a module whose only importer is a command the same landing adds is let through", () => {
  expect(judged(arriving())).toEqual([])
})
