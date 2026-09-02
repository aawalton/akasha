import { afterAll, expect, test } from "bun:test"
import { seededWorld } from "@akasha/service-system/web-app-reading/testing"
import type { Given } from "../../../calling/calling.module.code.ts"
import { putUpWebApp } from "./deploy-web-putting-up.module.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

function given(root: string): Given {
  return { root, calledAs: "akasha deploy", from: root, writer: null, agentId: null }
}

const HERE = given(WORLD.root)

test("a slug no web app page carries is refused as the data's fault", async () => {
  const answer = await putUpWebApp("no-such-web-app-here", HERE, false)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-web-app-here")
  expect(answer.report).toEqual([])
})

test("a web app leaving which workload is meant unsettled is refused", async () => {
  const answer = await putUpWebApp("two-web", HERE, false)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("unsettled")
})
