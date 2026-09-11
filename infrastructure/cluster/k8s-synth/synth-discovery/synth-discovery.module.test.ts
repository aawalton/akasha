import { afterAll, beforeAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import {
  discoverSynthFiles,
  isSynthPath,
  manifestCodePaths,
} from "akasha/infrastructure/cluster/k8s-synth/synth-discovery/synth-discovery.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const MANIFEST = "manifest"

const MANIFESTS: readonly (readonly [string, string])[] = [
  ["alpha/gamma/gamma.manifest.ts", "gamma"],
  ["beta/delta/delta.manifest.ts", "delta"],
  ["alpha/src/hidden/hidden.manifest.ts", "hidden"],
  ["alpha/lone/lone.manifest.ts", "lone"],
]

const GLOBBED: readonly string[] = [
  "infrastructure/cluster/manifests/one-synth/one-synth.module.code.ts",
  "infrastructure/inference/generations/upscale/two-synth/two-synth.module.code.ts",
]

const SYNTH_BODY = "export default () => []\n"

const scratch = scratchWorld()

let root = ""

function found(pkgFilter?: string): readonly string[] {
  return discoverSynthFiles(root, pkgFilter).map((one) => one.slice(root.length + 1))
}

beforeAll(() => {
  root = scratch.rootFor("synth-discovery-")
  for (const rel of GLOBBED) writing(root, rel, SYNTH_BODY)
  for (const [path] of MANIFESTS) writing(root, path.replace(/\.ts$/, ".code.ts"), SYNTH_BODY)
  valueAlsoFiled(
    root,
    MANIFEST,
    MANIFESTS.map(([path, slug]) => ({ path, value: { pageTypeSlug: MANIFEST, slug } }))
  )
})

afterAll(() => {
  scratch.sweep()
})

test("the code file of a manifest page is found", () => {
  expect(found()).toContain("alpha/gamma/gamma.manifest.code.ts")
  expect(found()).toContain("beta/delta/delta.manifest.code.ts")
})

test("a file the globs match is found still", () => {
  expect(found()).toContain("infrastructure/cluster/manifests/one-synth/one-synth.module.code.ts")
  expect(found()).toContain(
    "infrastructure/inference/generations/upscale/two-synth/two-synth.module.code.ts"
  )
})

test("a path reached through a `src` folder is left out", () => {
  expect(found()).not.toContain("alpha/src/hidden/hidden.manifest.code.ts")
})

test("a package filter narrows the answer", () => {
  expect(found("alpha")).toEqual([
    "alpha/gamma/gamma.manifest.code.ts",
    "alpha/lone/lone.manifest.code.ts",
  ])
})

test("a manifest no cluster service names is a synth file still", () => {
  expect(found()).toContain("alpha/lone/lone.manifest.code.ts")
})

test("every manifest page the index holds carries a synth file", () => {
  expect(manifestCodePaths(root)).toHaveLength(MANIFESTS.length)
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
  expect(isSynthPath("infrastructure/cluster/manifests/one-synth/one-synth.module.code.ts")).toBe(
    true
  )
  expect(isSynthPath("infrastructure/cluster/manifests/one-synth/one-synth.module.ts")).toBe(false)
})
