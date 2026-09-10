import { expect, test } from "bun:test"
import { buildArgv } from "./image-publishing.module.code.ts"

const ARGV = buildArgv("/where/it/was/written", "infra/auth-proxy", "reg/infra/auth-proxy:abc")

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
