import { expect, test } from "bun:test"
import {
  couldTurn,
  dockerfileFor,
} from "akasha/infrastructure/container-image/dockerfile/modules/writing/dockerfile-writing.change-generator.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

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

function changing(...changed: string[]): Change {
  return { root: ROOT, changed, before: () => null, after: () => null }
}

test("a change touching code, a manifest, a patch or an image could turn a Dockerfile", () => {
  expect(couldTurn(changing("a/b.code.ts"))).toBe(true)
  expect(couldTurn(changing("package.json"))).toBe(true)
  expect(couldTurn(changing("patches/one.patch"))).toBe(true)
  expect(couldTurn(changing("infrastructure/container-image/dockerfile/x/Dockerfile"))).toBe(true)
})

test("a change touching none of those writes nothing", () => {
  expect(couldTurn(changing("a/b.md", "c/d.entries.uncommitted.jsonl"))).toBe(false)
})
