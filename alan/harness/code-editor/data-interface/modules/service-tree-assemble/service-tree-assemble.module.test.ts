import { expect, test } from "bun:test"
import { assembleServiceTree } from "akasha/alan/harness/code-editor/data-interface/modules/service-tree-assemble/service-tree-assemble.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const TREE = assembleServiceTree(akashaRoot())

test("the tree over this checkout holds a service under a kind of service", () => {
  expect(TREE.length).toBeGreaterThan(0)
  expect(TREE.flatMap((one) => one.children).length).toBeGreaterThan(0)
})
