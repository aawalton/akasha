import { expect, test } from "bun:test"
import {
  buildOf,
  everyNamed,
  namedOf,
} from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"

const PROXY = "auth-proxy"
const RIG = "eso-rig-image"

test("a built image is handed the repository root", () => {
  expect(namedOf(PROXY).context).toBe("")
})

test("a built image's recipe is written rather than read", () => {
  expect(namedOf(PROXY).recipe).toBeNull()
})

test("a container recipe is handed the package above the folder its page sits in", () => {
  const named = namedOf(RIG)
  expect(named.recipe).toBe(`${named.context}/image/Containerfile`)
})

test("a container recipe's own file is what that recipe is built from", () => {
  expect(buildOf(RIG).dockerfile).toContain("COPY ")
})

test("an image naming no repository is reached by nothing", () => {
  expect(() => namedOf("buildkit")).toThrow("states no repository")
})

test("no two images are named alike", () => {
  const named = everyNamed().map((one) => one.slug)
  expect(new Set(named).size).toBe(named.length)
})
