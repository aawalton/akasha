import { expect, test } from "bun:test"
import { buildOf } from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import {
  copiedIn,
  driftedIn,
  inputsFor,
} from "akasha/infrastructure/container-image/modules/image-inputs/image-inputs.module.code.ts"

const PROXY = buildOf("auth-proxy")

const COPIES_NOTHING = {
  slug: "copies-nothing",
  repository: "cluster/copies-nothing",
  context: "",
  recipe: null,
  dockerfile: ["FROM alpine:3.21", "RUN apk add --no-cache jq", ""].join("\n"),
}

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
  expect(inputsFor(PROXY).hash).toMatch(/^[0-9a-f]{12}$/)
})

test("the same inputs hash the same twice over", () => {
  expect(inputsFor(PROXY).hash).toBe(inputsFor(PROXY).hash)
})

test("what the proxy is built from carries the lockfile and its own folder", () => {
  const copied = inputsFor(PROXY).copied
  expect(copied).toContain("bun.lock")
  expect(copied).toContain("infrastructure/network/auth-proxy")
})

test("a Dockerfile copying nothing hashes on its own text", () => {
  expect(inputsFor(COPIES_NOTHING).hash).toMatch(/^[0-9a-f]{12}$/)
})

test("a Dockerfile copying nothing names no input", () => {
  expect(inputsFor(COPIES_NOTHING).copied).toEqual([])
})

test("two Dockerfiles copying nothing hash apart where their text differs", () => {
  const other = { ...COPIES_NOTHING, dockerfile: `${COPIES_NOTHING.dockerfile}RUN apk add curl\n` }
  expect(inputsFor(other).hash).not.toBe(inputsFor(COPIES_NOTHING).hash)
})

test("an image copying nothing drifts in nothing", () => {
  expect(driftedIn([])).toEqual([])
})
