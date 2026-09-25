import { expect, test } from "bun:test"
import { picturesOf } from "akasha/alan/harness/code-editor/data-interface/modules/data-watching/data-watching.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

test("the service tree follows the folders holding this checkout's services", () => {
  const picture = picturesOf(akashaRoot()).get("service-tree")
  expect(picture?.folders.length ?? 0).toBeGreaterThan(0)
  expect(picture?.identities.length ?? 0).toBeGreaterThan(0)
})
