import { afterAll, beforeAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import {
  discoverSynthFiles,
  manifestCodePaths,
} from "akasha/infrastructure/cluster/k8s-synth/synth-discovery/synth-discovery.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"

const MANIFEST = "manifest"

const MANIFESTS: readonly (readonly [string, string])[] = [
  ["alpha/gamma/gamma.manifest.ts", "gamma"],
  ["beta/delta/delta.manifest.ts", "delta"],
  ["alpha/lone/lone.manifest.ts", "lone"],
]

const CODELESS = "alpha/quiet/quiet.manifest.ts"

const SYNTH_BODY = "export default () => []\n"

const scratch = scratchWorld()

let root = ""

function found(pkgFilter?: string): readonly string[] {
  return discoverSynthFiles(root, pkgFilter).map((one) => one.slice(root.length + 1))
}

beforeAll(() => {
  root = scratch.rootFor("synth-discovery-")
  for (const [path] of MANIFESTS) writing(root, path.replace(/\.ts$/, ".code.ts"), SYNTH_BODY)
  valueAlsoFiled(root, MANIFEST, [
    ...MANIFESTS.map(([path, slug]) => ({
      path,
      value: { pageTypeSlug: MANIFEST, slug, code: "ts" },
    })),
    { path: CODELESS, value: { pageTypeSlug: MANIFEST, slug: "quiet" } },
  ])
})

afterAll(() => {
  scratch.sweep()
})

test("the code file of a manifest page is found", () => {
  expect(found()).toContain("alpha/gamma/gamma.manifest.code.ts")
  expect(found()).toContain("beta/delta/delta.manifest.code.ts")
})

test("a manifest page stating no code carries no synth file", () => {
  expect(found()).not.toContain("alpha/quiet/quiet.manifest.code.ts")
})

test("a package filter narrows the answer", () => {
  expect(found("alpha")).toEqual([
    "alpha/gamma/gamma.manifest.code.ts",
    "alpha/lone/lone.manifest.code.ts",
  ])
})

test("every manifest page stating its code carries a synth file", () => {
  expect(manifestCodePaths(root)).toHaveLength(MANIFESTS.length)
})

test("the answer is sorted and holds each path once", () => {
  const all = found()
  expect([...all].sort()).toEqual([...all])
  expect(new Set(all).size).toBe(all.length)
})
