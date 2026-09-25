import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import synthRequests from "akasha/alan/requests-web/alanwalton-requests/alanwalton-requests.manifest.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  manifestsOf,
  type Stated,
  secretChecksumOf,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/manifests-writing/manifests-writing.change-generator.code.ts"
import { parseAllDocuments } from "yaml"

const STATED: Stated = {
  image: "registry.registry.svc.cluster.local:5000/web-app/one-web",
  namespace: "one",
  resourceName: "web",
  replicas: 1,
  containerPort: 3100,
  workloadClass: "serve",
  probePath: "/api/health",
  instance: "one",
  ownsNamespace: false,
  sourceDirectory: "one/web",
  secretResource: "one-secrets",
  secretChecksum: "0123456789abcdef0123456789abcdef",
  env: [
    { name: "PAGE_WRITER", value: "one-web" },
    { name: "SIGNING", valueFrom: { secretKeyRef: { name: "one-login", key: "SIGNING" } } },
  ],
  resources: { requests: { cpu: "100m", memory: "1Gi" }, limits: { cpu: "500m", memory: "1Gi" } },
}

type Doc = Record<string, unknown>

function docsOf(yaml: string): readonly Doc[] {
  return parseAllDocuments(yaml).map((one) => one.toJS() as Doc)
}

function kindsOf(yaml: string): readonly unknown[] {
  return docsOf(yaml).map((one) => one.kind)
}

test("a web app's cluster service is written as its deployment and its service", () => {
  expect(kindsOf(manifestsOf(STATED))).toEqual(["Deployment", "Service"])
})

test("a cluster service owning its namespace is written with that namespace first", () => {
  expect(kindsOf(manifestsOf({ ...STATED, ownsNamespace: true }))).toEqual([
    "Namespace",
    "Deployment",
    "Service",
  ])
})

test("every port written is the container port the page states", () => {
  const written = manifestsOf(STATED)
  expect(written).toContain("containerPort: 3100")
  expect(written).toContain("port: 3100")
  expect(written).toContain("targetPort: 3100")
  expect(written).toContain('value: "3100"')
  expect(written).not.toContain("3000")
})

test("the image names the commit placeholder a deploy fills", () => {
  expect(manifestsOf(STATED)).toContain(
    "image: registry.registry.svc.cluster.local:5000/web-app/one-web:COMMIT"
  )
})

test("the page's runtime env follows the env every container gets, in the order stated", () => {
  const written = manifestsOf(STATED)
  expect(written.indexOf("name: PORT")).toBeLessThan(written.indexOf("name: PAGE_WRITER"))
  expect(written.indexOf("name: PAGE_WRITER")).toBeLessThan(written.indexOf("name: SIGNING"))
  expect(written).toContain("name: one-login")
})

test("the pod template carries the secret checksum and the container is handed the secret", () => {
  const written = manifestsOf(STATED)
  expect(written).toContain("checksum/secrets: 0123456789abcdef0123456789abcdef")
  expect(written).toContain("name: one-secrets")
})

test("the instance label a page states is the one the selector names", () => {
  const written = manifestsOf({ ...STATED, instance: "atlas" })
  expect(written).toContain("app.kubernetes.io/instance: atlas")
  expect(written).not.toContain("app.kubernetes.io/instance: one")
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

const PAGES_AT = "infrastructure/service/akasha-service/service-cluster/pages"

const WEB_APP_TAG = /(\/web-app\/[^:\s"']+):[^\s"']+/g

function comparable(yaml: string): readonly Doc[] {
  const docs = docsOf(yaml.replace(WEB_APP_TAG, "$1:TAG")).filter((one) => one !== null)
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
  return readFileSync(
    join(rootOf(import.meta.path), PAGES_AT, slug, `${slug}.service-cluster.manifests.yaml`),
    "utf8"
  )
}

test("parity: alanwalton-requests is written as its manifest code emitted", () => {
  const emitted = synthRequests()
    .map((one) => one.yaml)
    .join("---\n")
  expect(comparable(writtenFor("alanwalton-requests"))).toEqual(comparable(emitted))
})
