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
  imageCopies: [],
}

const SYNCED: Stated = {
  ...STATED,
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  codeSync: { cachePath: "/var/one-web-cache", minMemoryMb: 64, killMemoryMb: 1024 },
}

const COPYING: Stated = {
  ...SYNCED,
  imageCopies: [
    {
      image: "registry.registry.svc.cluster.local:5000/cluster/one-tools:latest",
      copyFrom: "/build",
      copyTo: "one/web/tools",
      copiedFiles: ["tool.exe", "version.txt"],
      copyEnv: "TOOLS_DIR",
    },
    {
      image: "registry.registry.svc.cluster.local:5000/cluster/one-bundle:abc123",
      copyFrom: "/bundle",
      copyTo: "one/web/bundle",
      copiedFiles: ["bundle.zip"],
      copyEnv: "BUNDLE_DIR",
    },
  ],
}

type Doc = Record<string, unknown>

function docsOf(yaml: string): readonly Doc[] {
  return parseAllDocuments(yaml).map((one) => one.toJS() as Doc)
}

function kindsOf(yaml: string): readonly unknown[] {
  return docsOf(yaml).map((one) => one.kind)
}

function podListed(yaml: string, key: string): readonly Doc[] {
  const deployment = docsOf(yaml).find((one) => one.kind === "Deployment")
  const template = (deployment?.spec as Doc | undefined)?.template as Doc | undefined
  return ((template?.spec as Doc | undefined)?.[key] as readonly Doc[] | undefined) ?? []
}

function containerNamed(yaml: string, name: string): Doc | undefined {
  return podListed(yaml, "containers").find((one) => one.name === name)
}

function initNamed(yaml: string, name: string): Doc | undefined {
  return podListed(yaml, "initContainers").find((one) => one.name === name)
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

test("files copied out of an image are copied after the checkout and before the build", () => {
  expect(podListed(manifestsOf(COPYING), "initContainers").map((one) => one.name)).toEqual([
    "init-chown-cache",
    "init-code",
    "init-tools",
    "init-bundle",
    "init-build",
  ])
})

test("each file stated is copied into the checkout's directory the page names", () => {
  const command = initNamed(manifestsOf(COPYING), "init-tools")?.command as readonly string[]
  expect(command[2]).toContain("cp -f /build/tool.exe /app/repo/one/web/tools/tool.exe")
  expect(command[2]).toContain("cp -f /build/version.txt /app/repo/one/web/tools/version.txt")
})

test("an image tagged latest is pulled at every start, and any other only where it is missing", () => {
  const written = manifestsOf(COPYING)
  expect(initNamed(written, "init-tools")?.imagePullPolicy).toBe("Always")
  expect(initNamed(written, "init-bundle")?.imagePullPolicy).toBe("IfNotPresent")
})

test("the container is told where each copy went, after the runtime env the page states", () => {
  const env = containerNamed(manifestsOf(COPYING), "web")?.env as readonly Doc[]
  expect(env.slice(-3)).toEqual([
    { name: "SIGNING", valueFrom: { secretKeyRef: { name: "one-login", key: "SIGNING" } } },
    { name: "TOOLS_DIR", value: "/app/repo/one/web/tools" },
    { name: "BUNDLE_DIR", value: "/app/repo/one/web/bundle" },
  ])
})

test("a cluster service running an image built for it keeps no checkout", () => {
  const written = manifestsOf(STATED)
  expect(written).not.toContain("initContainers")
  expect(containerNamed(written, "code-sync")).toBe(undefined)
})
