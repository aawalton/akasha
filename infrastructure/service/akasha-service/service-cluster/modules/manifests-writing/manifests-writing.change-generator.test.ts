import { expect, test } from "bun:test"
import { secretChecksumOf } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/manifests-writing/manifests-writing.change-generator.code.ts"

test("a sealed file changing changes the checksum, and the order they are read in does not", () => {
  const once = secretChecksumOf(
    new Map([
      ["A", "sealed-a"],
      ["B", "sealed-b"],
    ])
  )
  expect(
    secretChecksumOf(
      new Map([
        ["B", "sealed-b"],
        ["A", "sealed-a"],
      ])
    )
  ).toBe(once)
  expect(
    secretChecksumOf(
      new Map([
        ["A", "sealed-a2"],
        ["B", "sealed-b"],
      ])
    )
  ).not.toBe(once)
})
