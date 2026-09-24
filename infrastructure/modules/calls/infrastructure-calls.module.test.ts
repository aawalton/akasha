import { expect, test } from "bun:test"
import { page } from "akasha/command/pages/page/page.namespace.ts"
import { pageSecret } from "akasha/command/pages/page/secret/page-secret.namespace.ts"
import { pageSecretSet } from "akasha/command/pages/page/secret/set/page-secret-set.command.ts"
import { SECRET_SET } from "akasha/infrastructure/modules/calls/infrastructure-calls.module.code.ts"

const EVERY: readonly (readonly [string, readonly { readonly name: string }[]])[] = [
  [SECRET_SET, [page, pageSecret, pageSecretSet]],
]

test("a call is the levels' own names with a space between each", () => {
  for (const [said, levels] of EVERY) {
    expect(said).toBe(levels.map((one) => one.name).join(" "))
  }
})

test("a call has one word for each level it reaches", () => {
  for (const [said, levels] of EVERY) {
    expect(said.split(" ")).toHaveLength(levels.length)
  }
})
