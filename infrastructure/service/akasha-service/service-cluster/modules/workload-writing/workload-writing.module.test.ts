import { expect, test } from "bun:test"
import { CHECKOUT_PLACEHOLDER } from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  manifestsOf,
  type Stated,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-writing/workload-writing.module.code.ts"
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
  codeSync: null,
}

const SYNCED: Stated = {
  ...STATED,
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  codeSync: { cachePath: "/var/one-web-cache", minMemoryMb: 64, killMemoryMb: 1024 },
}

type Doc = Record<string, unknown>

function docsOf(yaml: string): readonly Doc[] {
  return parseAllDocuments(yaml).map((one) => one.toJS() as Doc)
}

function kindsOf(yaml: string): readonly unknown[] {
  return docsOf(yaml).map((one) => one.kind)
}

function containerNamed(yaml: string, name: string): Doc | undefined {
  const deployment = docsOf(yaml).find((one) => one.kind === "Deployment")
  const template = (deployment?.spec as Doc | undefined)?.template as Doc | undefined
  const containers = (template?.spec as Doc | undefined)?.containers as readonly Doc[] | undefined
  return containers?.find((one) => one.name === name)
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

test("a cluster service keeping a checkout runs the image its page states, tag and all", () => {
  expect(containerNamed(manifestsOf(SYNCED), "web")?.image).toBe(SYNCED.image)
})

test("a checkout is cloned into the directory the page states and reset to the placeholder", () => {
  const written = manifestsOf(SYNCED)
  expect(written).toContain("path: /var/one-web-cache")
  expect(written).toContain(`reset --hard ${CHECKOUT_PLACEHOLDER}`)
  expect(written).toContain("name: init-build")
})

test("the container keeping the checkout is given the memory the page states", () => {
  expect(containerNamed(manifestsOf(SYNCED), "code-sync")?.resources).toEqual({
    requests: { cpu: "10m", memory: "64Mi" },
    limits: { memory: "1Gi" },
  })
})

test("a cluster service running an image built for it keeps no checkout", () => {
  const written = manifestsOf(STATED)
  expect(written).not.toContain("initContainers")
  expect(containerNamed(written, "code-sync")).toBe(undefined)
})
