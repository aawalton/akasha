import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { iosAppInstalled } from "akasha/command/pages/deploy/modules/ios-installing/deploy-ios-installing.module.code.ts"

const root = rootOf(import.meta.dir)

function given(): Given {
  return { root, calledAs: "akasha deploy", from: root, writer: null, agentId: null }
}

test("a phone install of an app the commit holds no page for is refused before reaching a machine", async () => {
  const answer = await iosAppInstalled("nosuchapp", given(), "HEAD", true)

  expect(answer.refusals.join(" ")).toContain("known apps:")
  expect(answer.report).toEqual([])
})

test("a simulator install of an app no page is slugged for is refused before reaching a machine", async () => {
  const answer = await iosAppInstalled("nosuchapp", given(), "HEAD", false)

  expect(answer.refusals.join(" ")).toContain("nosuchapp")
  expect(answer.report).toEqual([])
})
