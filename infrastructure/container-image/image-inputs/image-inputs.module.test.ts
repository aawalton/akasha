import { expect, test } from "bun:test"
import { copiedIn, inputsFor } from "./image-inputs.module.code.ts"

const SAMPLE = [
  "FROM oven/bun AS build",
  "COPY --link bun.lock ./",
  "COPY --link one/two ./one/two",
  "FROM oven/bun",
  "COPY --link --from=build /workspace/one/two ./one/two",
  'CMD ["bun"]',
].join("\n")

test("what the context is copied from is read off the Dockerfile", () => {
  expect(copiedIn(SAMPLE)).toEqual(["bun.lock", "one/two"])
})

test("a path a second stage copies is left out", () => {
  expect(copiedIn(SAMPLE)).not.toContain("/workspace/one/two")
})

test("the authenticating proxy's inputs hash to twelve hex characters", () => {
  expect(inputsFor("auth-proxy").hash).toMatch(/^[0-9a-f]{12}$/)
})

test("the same inputs hash the same twice", () => {
  expect(inputsFor("auth-proxy").hash).toBe(inputsFor("auth-proxy").hash)
})

test("what the proxy is built from carries the lockfile and its own folder", () => {
  const copied = inputsFor("auth-proxy").copied
  expect(copied).toContain("bun.lock")
  expect(copied).toContain("infrastructure/networks/auth-proxy")
})
