import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writingUnder } from "akasha/infrastructure/service/cluster/modules/web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  appliedFoundation,
  foundationNamed,
} from "akasha/infrastructure/service/cluster-foundation/modules/foundation-applying/foundation-applying.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const SCRATCH = scratchWorld()
const ROOT = SCRATCH.rootFor("akasha-foundation-")
const WRITE = writingUnder(ROOT)

afterAll(() => {
  SCRATCH.sweep()
})

const MANIFEST_TYPE = "manifest"
const FOUNDATION_TYPE = "cluster-foundation"

const NAMESPACES_AT = "ground/namespaces/namespaces.manifest.ts"
const NAMESPACES_CODE_AT = "ground/namespaces/namespaces.manifest.code.ts"
const ROLES_AT = "ground/roles/roles.manifest.ts"
const ROLES_CODE_AT = "ground/roles/roles.manifest.code.ts"
const CODELESS_AT = "ground/codeless/codeless.manifest.ts"

const NAMESPACE_YAML = [
  "apiVersion: v1",
  "kind: Namespace",
  "metadata:",
  "  name: ground",
  "",
].join("\n")

const ROLE_YAML = [
  "apiVersion: rbac.authorization.k8s.io/v1",
  "kind: ClusterRole",
  "metadata:",
  "  name: ground-deploy",
  "",
].join("\n")

function synthOf(name: string, yaml: string): string {
  return [
    "export default function synth() {",
    `  return [{ name: ${JSON.stringify(name)}, yaml: ${JSON.stringify(yaml)} }]`,
    "}",
    "",
  ].join("\n")
}

function idOf(at: number): string {
  return `01a0a600-0000-7000-8000-00000000000${String(at)}`
}

function filed(pageTypeSlug: string, path: string, value: Record<string, unknown>): undefined {
  valueAlsoFiled(ROOT, pageTypeSlug, [{ path, value }])
}

function manifestFiled(path: string, slug: string, at: number): undefined {
  filed(MANIFEST_TYPE, path, {
    id: idOf(at),
    type: MANIFEST_TYPE,
    slug,
    definition: `the resources ${slug} is applied as`,
    code: "ts",
  })
}

function foundationFiled(slug: string, at: number, manifest: readonly string[]): undefined {
  filed(FOUNDATION_TYPE, `ground/foundations/${slug}.cluster-foundation.ts`, {
    id: idOf(at),
    type: `page-type/${FOUNDATION_TYPE}`,
    slug,
    definition: `what ${slug} is built on`,
    manifest,
  })
}

manifestFiled(NAMESPACES_AT, "namespaces", 1)
manifestFiled(ROLES_AT, "roles", 2)
manifestFiled(CODELESS_AT, "codeless", 3)
WRITE(NAMESPACES_CODE_AT, synthOf("namespaces", NAMESPACE_YAML))
WRITE(ROLES_CODE_AT, synthOf("roles", ROLE_YAML))
foundationFiled("ground", 4, ["manifest/namespaces", "manifest/roles"])
foundationFiled("lost", 5, ["manifest/no-such-manifest"])
foundationFiled("codeless", 6, ["manifest/codeless"])

test("a slug no cluster foundation page carries is refused by naming that slug", () => {
  const read = foundationNamed(ROOT, "no-such-foundation")

  expect("refused" in read ? read.refused : "").toContain("no-such-foundation")
})

test("a foundation is read as the manifests its page names, in the order it names them", () => {
  const read = foundationNamed(ROOT, "ground")

  expect("refused" in read ? read.refused : "").toBe("")
  if ("refused" in read) return
  expect(read.foundation.grounding.map((one) => one.slug)).toEqual(["namespaces", "roles"])
  expect(read.foundation.grounding[0]?.synthPath).toBe(NAMESPACES_CODE_AT)
  expect(read.foundation.grounding[1]?.manifestPath).toBe(ROLES_AT)
})

test("a foundation naming a manifest no page describes is refused", () => {
  const read = foundationNamed(ROOT, "lost")

  expect("refused" in read ? read.refused : "").toContain("no-such-manifest")
})

test("a manifest page whose code file is not there is refused", () => {
  const read = foundationNamed(ROOT, "codeless")

  expect("refused" in read ? read.refused : "").toContain("no file is there")
})

test("a foundation no page describes is answered as a refusal rather than applied", async () => {
  const answer = await appliedFoundation(ROOT, "no-such-foundation", ROOT)

  expect(answer.refusals).toHaveLength(1)
  expect(answer.report).toEqual([])
})

test("a foundation naming a manifest no page describes reaches no cluster", async () => {
  const answer = await appliedFoundation(ROOT, "lost", ROOT)

  expect(answer.refusals[0]).toContain("no-such-manifest")
})
