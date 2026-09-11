import { expect, test } from "bun:test"
import { dockerfileFor } from "akasha/infrastructure/container-image/dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ROOT = process.cwd()

const MODULE = "module"

const SERVER = "auth-proxy-server"

function serverAt(): string {
  const page = listedAt(ROOT, MODULE, SERVER)[0]
  const at = page === undefined ? null : besideAt(page.path, "code", "ts")
  if (at === null) {
    throw new Error(
      `no \`${MODULE}\` is slugged \`${SERVER}\`, so nothing says where its code sits`
    )
  }
  return at
}

test("the Dockerfile written for the authenticating proxy runs what its extensions name", () => {
  const written = dockerfileFor("auth-proxy")
  expect(written).toContain("FROM oven/bun:1.3.14-alpine AS build")
  expect(written).toContain("EXPOSE 3080")
  expect(written).toContain(`CMD ["bun", "run", "${serverAt()}"]`)
})

test("the same call twice over writes the same Dockerfile", () => {
  expect(dockerfileFor("auth-proxy")).toBe(dockerfileFor("auth-proxy"))
})

test("a slug that is no built image is refused", () => {
  expect(() => dockerfileFor("nothing-here")).toThrow("is no built image")
})
