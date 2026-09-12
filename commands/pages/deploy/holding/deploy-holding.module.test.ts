import { expect, test } from "bun:test"
import { rmSync } from "node:fs"
import {
  heldNow,
  heldWhile,
  holdAt,
  saidOfHeld,
  saidOfNoHold,
} from "akasha/commands/pages/deploy/holding/deploy-holding.module.code.ts"
import { taken } from "akasha/git/holding/holding.module.code.ts"

const ROOT = process.cwd()

const NO_CHECKOUT = "/"

test("a hold is one file named for the thing being put up", () => {
  const at = holdAt(ROOT, "temper-web")
  expect(at).not.toBe(null)
  expect(at as string).toContain("temper-web.lock")
})

test("a root that is no git checkout has no hold", () => {
  expect(holdAt(NO_CHECKOUT, "temper-web")).toBe(null)
})

test("a root that is no git checkout refuses the deploy", async () => {
  const done = await heldWhile(NO_CHECKOUT, "temper-web", async () => 1)
  expect(done).toHaveProperty("refused")
})

test("a deploy inside the hold is run and its answer carried out", async () => {
  const done = await heldWhile(ROOT, "deploy-holding-test-one", async () => 7)
  expect(done).toEqual({ value: 7 })
})

test("a hold left by no live process is taken rather than refused", async () => {
  await heldWhile(ROOT, "deploy-holding-test-two", async () => 1)
  const at = holdAt(ROOT, "deploy-holding-test-two") as string
  expect(taken(at, "probe")).toBe(true)
  const done = await heldWhile(ROOT, "deploy-holding-test-two", async () => 3)
  expect(done).toEqual({ value: 3 })
})

test("a deploy that threw releases the hold and throws on", async () => {
  const thrown = heldWhile(ROOT, "deploy-holding-test-three", async () => {
    throw new Error("no")
  })
  await expect(thrown).rejects.toThrow("no")
  const done = await heldWhile(ROOT, "deploy-holding-test-three", async () => 2)
  expect(done).toEqual({ value: 2 })
})

test("what is running is read off the holds a live process keeps", async () => {
  const done = await heldWhile(ROOT, "deploy-holding-test-four", async () =>
    heldNow(ROOT).has("deploy-holding-test-four")
  )
  expect(done).toEqual({ value: true })
  expect(heldNow(ROOT).has("deploy-holding-test-four")).toBe(false)
})

test("a hold left by a process that is gone says no deploy is running", async () => {
  await heldWhile(ROOT, "deploy-holding-test-five", async () => 1)
  const at = holdAt(ROOT, "deploy-holding-test-five") as string
  expect(taken(at, "probe")).toBe(true)
  expect(heldNow(ROOT).has("deploy-holding-test-five")).toBe(false)
  rmSync(at, { force: true })
})

test("a root that is no git checkout has no deploy running", () => {
  expect(heldNow(NO_CHECKOUT).size).toBe(0)
})

test("a refusal names the thing, the process and how long the hold has been there", () => {
  const said = saidOfHeld("temper-web", 4321, 12)
  expect(said).toContain("temper-web")
  expect(said).toContain("4321")
  expect(said).toContain("12s")
})

test("a hold that will neither be taken nor cleared is said as that", () => {
  expect(saidOfNoHold("temper-web", "/at")).toContain("temper-web")
  expect(saidOfNoHold("temper-web", "/at")).toContain("/at")
})
