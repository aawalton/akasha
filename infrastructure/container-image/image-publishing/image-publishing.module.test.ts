import { expect, test } from "bun:test"
import { namedOf } from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import {
  buildArgv,
  claimedIn,
} from "akasha/infrastructure/container-image/image-publishing/image-publishing.module.code.ts"
import { REGISTRY } from "akasha/infrastructure/container-image/image-ref/image-ref.module.code.ts"

const PROXY = namedOf("auth-proxy")
const ARGV = buildArgv("/where/it/was/written", PROXY, "reg/infra/auth-proxy:abc")

test("the build is asked of the builder in the cluster", () => {
  expect(ARGV).toContain("tcp://buildkit.buildkit.svc.cluster.local:1234")
})

test("the Dockerfile is taken from where the build wrote it", () => {
  expect(ARGV).toContain("dockerfile=/where/it/was/written")
  expect(ARGV).toContain("filename=Dockerfile")
})

test("the image is pushed under the ref it was asked for", () => {
  expect(ARGV.some((one) => one.includes("name=reg/infra/auth-proxy:abc,push=true"))).toBe(true)
})

test("the cache is kept beside the image rather than under a tag a pull would take", () => {
  const cached = ARGV.filter((one) => one.includes("buildcache"))
  expect(cached).toHaveLength(2)
  for (const one of cached) expect(one).toContain("infra/auth-proxy:buildcache")
})

test("the folder the build is handed is the one the image names", () => {
  expect(ARGV.some((one) => one.startsWith("context=/"))).toBe(true)
})

test("a manifest naming an image in the registry claims that image", () => {
  const yaml = `      image: ${REGISTRY}/infra/auth-proxy:abcdef012345\n`
  expect(claimedIn([yaml]).map((one) => one.slug)).toEqual(["auth-proxy"])
})

test("a manifest naming no image of our own claims nothing", () => {
  expect(claimedIn(["      image: alpine:3.20\n"])).toHaveLength(0)
})
