import { expect, test } from "bun:test"
import {
  buildOf,
  everyNamed,
  namedByPage,
  namedOf,
} from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const PROXY = "auth-proxy"
const RIG = "eso-rig-image"
const VOICE_PAGE =
  "infrastructure/inference/voice-inference/voice-infer-image/voice-infer-image.container-recipe.ts"

test("a built image is handed the repository root", () => {
  expect(namedOf(PROXY).context).toBe("")
})

test("a built image's recipe is the Dockerfile beside its page", () => {
  expect(namedOf(PROXY).recipe).toBe(
    "infrastructure/container-image/dockerfile/built-image/auth-proxy/Dockerfile"
  )
})

test("a built image's own Dockerfile is what that image is built from", () => {
  expect(buildOf(PROXY).dockerfile).toContain("EXPOSE 3080")
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

test("an image is found by the page it is built for", () => {
  const found = namedByPage(codeRoot()).get(VOICE_PAGE)
  expect(found?.slug).toBe("voice-infer-image")
  expect(found?.context).toBe("infrastructure/inference/voice-inference")
})

test("every image named is found by its page", () => {
  const found = [...namedByPage(codeRoot()).values()].map((one) => one.slug)
  expect(found).toEqual(everyNamed().map((one) => one.slug))
})
