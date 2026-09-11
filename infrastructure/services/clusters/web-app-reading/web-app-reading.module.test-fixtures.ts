import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"

const HOLD = "/var/tmp"
const PREFIX = "akasha-web-app-"
export const WEB_APPS_AT = "akasha/service-system/web-app/web-apps"
const CLUSTER_SERVICES_AT = "akasha/service-system/service-cluster/clusters"

export const MANIFEST_AT = "one/web/one-web.manifest.ts"
export const SYNTH_AT = "one/web/one-web.manifest.code.ts"
const BARE_MANIFEST_AT = "one/bare/bare.manifest.ts"

export type World = {
  readonly root: string
  readonly sweep: () => undefined
}

const SERVICE_YAML = [
  "apiVersion: v1",
  "kind: Service",
  "metadata:",
  "  name: web",
  "  namespace: one",
  "",
].join("\n")

const DEPLOYMENT_YAML = [
  "apiVersion: apps/v1",
  "kind: Deployment",
  "metadata:",
  "  name: web",
  "  namespace: one",
  "spec:",
  "  template:",
  "    metadata:",
  "      name: not-this-one",
  "",
].join("\n")

const SYNTH = [
  "export default function synth() {",
  `  return [`,
  `    { name: "web-service", yaml: ${JSON.stringify(SERVICE_YAML)} },`,
  `    { name: "web-deployment", yaml: ${JSON.stringify(DEPLOYMENT_YAML)} },`,
  "  ]",
  "}",
  "",
].join("\n")

function idOf(kind: number, at: number): string {
  return `01a05b26-0000-700${String(kind)}-8000-00000000000${String(at)}`
}

function pageOf(slug: string, held: Record<string, unknown>): string {
  const lines = Object.entries(held).map(([key, one]) => `  ${key}: ${JSON.stringify(one)},`)
  return [`export const ${exportedAs(slug)} = {`, ...lines, "}", ""].join("\n")
}

type Held = Record<string, unknown>

function webApp(slug: string, at: number, slugs: readonly string[], whole = true): Held {
  const held: Held = {
    id: idOf(0, at),
    pageTypeSlug: "web-app",
    slug,
    definition: `the ${slug} site`,
  }
  if (whole) {
    held.sourceDirectory = "one/web"
    held.buildCommand = "bun run build"
  }
  held.clusterServices = slugs
  held.hostnames = [`${slug}.example`]
  return held
}

function clusterService(slug: string, at: number, name: string, appliedAs: string): Held {
  return {
    id: idOf(1, at),
    pageTypeSlug: "service-cluster",
    slug,
    definition: `what runs ${slug}`,
    resourceKind: "Deployment",
    namespace: "one",
    resourceName: name,
    image: "registry.example/bun:latest",
    replicas: 1,
    containerPort: 3000,
    manifest: appliedAs,
  }
}

function manifest(slug: string, at: number): Held {
  return {
    id: idOf(2, at),
    pageTypeSlug: "manifest",
    slug,
    definition: `the resources ${slug} is applied as`,
    code: "ts",
  }
}

export function writingUnder(root: string): (path: string, body: string) => undefined {
  return (path: string, body: string): undefined => {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body, "utf8")
  }
}

export function seededWorld(): World {
  const root = mkdtempSync(join(HOLD, PREFIX))
  const written = writingUnder(root)
  const filed = (path: string, pageTypeSlug: string, held: Held): undefined => {
    const slug = held.slug as string
    written(path, pageOf(slug, held))
    listedFiled(root, pageTypeSlug, slug, [{ path, id: held.id as string }])
    valueAlsoFiled(root, pageTypeSlug, [{ path, value: held }])
  }
  const webAppFiled = (
    slug: string,
    at: number,
    slugs: readonly string[],
    whole = true
  ): undefined => {
    filed(`${WEB_APPS_AT}/${slug}.web-app.ts`, "web-app", webApp(slug, at, slugs, whole))
  }
  const serviceFiled = (slug: string, at: number, name: string, appliedAs: string): undefined => {
    const path = `${CLUSTER_SERVICES_AT}/${slug}.service-cluster.ts`
    filed(path, "service-cluster", clusterService(slug, at, name, appliedAs))
  }
  const manifestFiled = (path: string, slug: string, at: number): undefined => {
    filed(path, "manifest", manifest(slug, at))
  }
  webAppFiled("one-web", 1, ["one-web"])
  webAppFiled("two-web", 2, ["one-web", "other-web"])
  webAppFiled("none-web", 3, [])
  webAppFiled("lost-web", 4, ["no-such-service"])
  webAppFiled("bare-web", 5, ["bare"])
  webAppFiled("short-web", 6, ["one-web"], false)
  webAppFiled("orphan-web", 7, ["orphan"])
  serviceFiled("one-web", 1, "web", "one-web")
  serviceFiled("bare", 2, "bare", "bare")
  serviceFiled("orphan", 3, "orphan", "no-such-manifest")
  manifestFiled(MANIFEST_AT, "one-web", 1)
  manifestFiled(BARE_MANIFEST_AT, "bare", 2)
  written(SYNTH_AT, SYNTH)
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}
