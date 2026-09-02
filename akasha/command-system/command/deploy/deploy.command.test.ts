import { afterAll, expect, test } from "bun:test"
import { seededWorld } from "@akasha/service-system/web-app-reading/testing"
import type { Given } from "../../calling/calling.module.code.ts"
import { deploy } from "./deploy.command.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

function given(root: string): Given {
  return { root, calledAs: "akasha deploy", from: root, writer: null, agentId: null }
}

const HERE = given(WORLD.root)

test("a call naming no app is refused as the caller's fault", async () => {
  const answer = await deploy([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the app")
})

test("a call naming two apps is refused rather than chosen between", async () => {
  const answer = await deploy(["one-web", "two-web"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one app")
  expect(answer.refusals[0]).toContain("one-web, two-web")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await deploy(["one-web", "--again"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--again`")
})

test("a slug no app page of either kind carries is refused as the data's fault", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-app-here")
  expect(answer.refusals[0]).toContain("web app")
  expect(answer.refusals[0]).toContain("ios app")
})

test("an app leaving which workload is meant unsettled is refused", async () => {
  const answer = await deploy(["two-web"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("unsettled")
})

test("a refusal reaching no cluster reports nothing", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.report).toEqual([])
})

test("an ios app is handed to the build rather than refused as unbuilt", async () => {
  const answer = await deploy(["atlas", "--dry-run"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names an ios app")
  expect(answer.refusals[0]).toContain("--no-upload")
})

test("an ios app is found by the short slug its page states", async () => {
  const answer = await deploy(["atlas-ios", "--dry-run"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("atlas-ios")
})

test("a web app is refused the flag belonging to an ios app", async () => {
  const answer = await deploy(["one-web", "--no-upload"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names a web app")
  expect(answer.refusals[0]).toContain("--dry-run")
})

test("every ios app the mobile commands carry is reached by this command", async () => {
  for (const slug of ["alanwalton", "atlas", "smilingjenny"]) {
    const answer = await deploy([slug, "--dry-run"], HERE)
    expect(answer.refusals[0]).toContain("names an ios app")
  }
})
