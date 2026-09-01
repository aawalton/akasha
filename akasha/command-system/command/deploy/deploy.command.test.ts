import { afterAll, expect, test } from "bun:test"
import { standingWorld } from "@akasha/service-system/web-app-reading/testing"
import type { Given } from "../../calling/calling.module.code.ts"
import { deploy } from "./deploy.command.code.ts"

const WORLD = standingWorld()

afterAll(() => {
  WORLD.sweep()
})

function given(root: string): Given {
  return { root, calledAs: "akasha deploy", from: root, writer: null, agentId: null }
}

const HERE = given(WORLD.root)

test("a call naming no web app is refused as the caller's fault", async () => {
  const answer = await deploy([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the web app")
})

test("a call naming two web apps is refused rather than chosen between", async () => {
  const answer = await deploy(["one-web", "two-web"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one web app")
  expect(answer.refusals[0]).toContain("one-web, two-web")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await deploy(["one-web", "--again"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--again`")
})

test("a slug no web app page carries is refused as the data's fault", async () => {
  const answer = await deploy(["no-such-web-app-stands-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-web-app-stands-here")
})

test("a web app leaving which workload is meant unsettled is refused", async () => {
  const answer = await deploy(["two-web"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("unsettled")
})

test("a refusal reaching no cluster reports nothing", async () => {
  const answer = await deploy(["no-such-web-app-stands-here"], HERE)
  expect(answer.report).toEqual([])
})
