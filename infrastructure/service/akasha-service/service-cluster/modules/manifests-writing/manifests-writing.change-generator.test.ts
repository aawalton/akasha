import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { commitHere } from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import { secretChecksumOf } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/manifests-writing/manifests-writing.change-generator.code.ts"
import { withCommit } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-imaging/web-app-imaging.module.code.ts"
import synthArchive from "akasha/product/archive-of-worlds/web/manifests/archive-of-worlds-web-manifests.manifest.code.ts"
import { parseAllDocuments } from "yaml"

const PAGES_AT = "infrastructure/service/akasha-service/service-cluster/pages"

type Doc = Record<string, unknown>

function comparable(yaml: string): readonly Doc[] {
  const docs = parseAllDocuments(yaml)
    .map((one) => one.toJS() as Doc | null)
    .filter((one): one is Doc => one !== null)
  for (const one of docs) {
    const template = (one.spec as Doc | undefined)?.template as Doc | undefined
    const metadata = template?.metadata as Doc | undefined
    const annotations = metadata?.annotations as Doc | undefined
    if (annotations === undefined || metadata === undefined) continue
    delete annotations["checksum/secrets"]
    if (Object.keys(annotations).length === 0) delete metadata.annotations
  }
  return [...docs].sort((one, other) => String(one.kind).localeCompare(String(other.kind)))
}

function writtenFor(slug: string): string {
  const at = join(
    rootOf(import.meta.path),
    PAGES_AT,
    slug,
    `${slug}.service-cluster.manifests.yaml`
  )
  return withCommit(readFileSync(at, "utf8"), commitHere())
}

function emitted(synth: () => readonly { readonly yaml: string }[]): string {
  return synth()
    .map((one) => one.yaml)
    .join("---\n")
}

test("parity: archive-of-worlds-web is written as its manifest code emitted", () => {
  expect(comparable(writtenFor("archive-of-worlds-web"))).toEqual(comparable(emitted(synthArchive)))
})

test("a sealed file changing changes the checksum, and the order they are read in does not", () => {
  const once = secretChecksumOf(
    new Map([
      ["A", "sealed-a"],
      ["B", "sealed-b"],
    ])
  )
  expect(
    secretChecksumOf(
      new Map([
        ["B", "sealed-b"],
        ["A", "sealed-a"],
      ])
    )
  ).toBe(once)
  expect(
    secretChecksumOf(
      new Map([
        ["A", "sealed-a2"],
        ["B", "sealed-b"],
      ])
    )
  ).not.toBe(once)
})
