import { afterAll, beforeAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import {
  appliedManifestPaths,
  discoverSynthFiles,
  isSynthPath,
} from "./synth-discovery.module.code.ts"

const VALUE_AT = ".git/data/index/value"

const MANIFESTS: readonly (readonly [string, string])[] = [
  ["alpha/gamma/gamma.manifest.ts", "gamma"],
  ["beta/delta/delta.manifest.ts", "delta"],
  ["alpha/src/hidden/hidden.manifest.ts", "hidden"],
  ["alpha/lone/lone.manifest.ts", "lone"],
]

const SERVICES: readonly (readonly [string, string | null])[] = [
  ["alpha/one/one.cluster-service.ts", "gamma"],
  ["beta/two/two.cluster-service.ts", "delta"],
  ["alpha/three/three.cluster-service.ts", "hidden"],
  ["alpha/four/four.cluster-service.ts", null],
  ["alpha/five/five.cluster-service.ts", "no-such-manifest"],
]

const ATTACHMENTS: readonly string[] = [
  "alpha/one.cluster-service.code.attachment.ts",
  "beta/two.cluster-service.code.attachment.ts",
  "beta/src/three.cluster-service.code.attachment.ts",
]

let root = ""

function put(rel: string, body: string): undefined {
  const at = join(root, rel)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
}

function filed(name: string, lines: readonly unknown[]): undefined {
  put(`${VALUE_AT}/${name}.jsonl`, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function found(pkgFilter?: string): readonly string[] {
  return discoverSynthFiles(root, pkgFilter).map((one) => one.slice(root.length + 1))
}

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "synth-discovery-"))
  for (const rel of ATTACHMENTS) put(rel, "export default () => []\n")
  for (const [path] of MANIFESTS)
    put(path.replace(/\.ts$/, ".code.ts"), "export default () => []\n")
  filed(
    "manifest",
    MANIFESTS.map(([path, slug]) => ({ path, value: { pageTypeSlug: "manifest", slug } }))
  )
  filed(
    "cluster-service",
    SERVICES.map(([path, named]) => ({
      path,
      value:
        named === null
          ? { pageTypeSlug: "cluster-service" }
          : { pageTypeSlug: "cluster-service", manifestSlug: named },
    }))
  )
})

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

test("the code file of the manifest a cluster service is applied as is found", () => {
  expect(found()).toContain("alpha/gamma/gamma.manifest.code.ts")
  expect(found()).toContain("beta/delta/delta.manifest.code.ts")
})

test("a file the globs match is found still", () => {
  expect(found()).toContain("alpha/one.cluster-service.code.attachment.ts")
  expect(found()).toContain("beta/two.cluster-service.code.attachment.ts")
})

test("a path reached through a `src` folder is left out of both sources", () => {
  expect(found()).not.toContain("alpha/src/hidden/hidden.manifest.code.ts")
  expect(found()).not.toContain("beta/src/three.cluster-service.code.attachment.ts")
})

test("a package filter narrows both sources", () => {
  expect(found("alpha")).toEqual([
    "alpha/gamma/gamma.manifest.code.ts",
    "alpha/one.cluster-service.code.attachment.ts",
  ])
})

test("a manifest no cluster service is applied as is left out", () => {
  expect(found()).not.toContain("alpha/lone/lone.manifest.code.ts")
})

test("a cluster service naming no manifest adds nothing", () => {
  expect(appliedManifestPaths(root)).toHaveLength(3)
})

test("a manifest slug naming no manifest page is left out", () => {
  expect(appliedManifestPaths(root).join(" ")).not.toContain("no-such-manifest")
})

test("the answer is sorted and holds each path once", () => {
  const all = found()
  expect([...all].sort()).toEqual([...all])
  expect(new Set(all).size).toBe(all.length)
})

test("a manifest code path reads as a synth path", () => {
  expect(isSynthPath("alpha/gamma/gamma.manifest.code.ts")).toBe(true)
  expect(isSynthPath("alpha/src/hidden/hidden.manifest.code.ts")).toBe(false)
  expect(isSynthPath("alpha/gamma/gamma.manifest.ts")).toBe(false)
})

test("a glob path reads as a synth path still", () => {
  expect(isSynthPath("alpha/one.cluster-service.code.attachment.ts")).toBe(true)
  expect(isSynthPath("beta/src/three.cluster-service.code.attachment.ts")).toBe(false)
})
