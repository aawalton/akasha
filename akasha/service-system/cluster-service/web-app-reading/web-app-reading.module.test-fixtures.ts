import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { said } from "@akasha/utils-run/running"

const HOLD = "/var/tmp"
const PREFIX = "akasha-web-app-"
const WEB_APPS_AT = "akasha/service-system/web-app/web-apps"
const CLUSTER_SERVICES_AT = "akasha/service-system/cluster-service/cluster-services"

export const SYNTH_AT = "one/web/one-web.cluster-service.code.attachment.ts"

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

function pageOf(slug: string, held: Record<string, unknown>): string {
  const lines = Object.entries(held).map(([key, one]) => `  ${key}: ${JSON.stringify(one)},`)
  return [`export const ${exportedAs(slug)} = {`, ...lines, "}", ""].join("\n")
}

function webApp(slug: string, at: number, slugs: readonly string[], whole = true): string {
  const held: Record<string, unknown> = {
    id: `01a05b26-0000-7000-8000-00000000000${at}`,
    pageTypeSlug: "web-app",
    slug,
    definition: `the ${slug} site`,
  }
  if (whole) {
    held.sourceDirectory = "one/web"
    held.buildCommand = "bun run build"
  }
  held.clusterServiceSlugs = slugs
  held.hostnames = [`${slug}.example`]
  return pageOf(slug, held)
}

function clusterService(slug: string, at: number, name: string, code: string): string {
  return pageOf(slug, {
    id: `01a05b26-0000-7001-8000-00000000000${at}`,
    pageTypeSlug: "cluster-service",
    slug,
    definition: `what runs ${slug}`,
    resourceKind: "Deployment",
    namespace: "one",
    resourceName: name,
    image: "registry.example/bun:latest",
    replicas: 1,
    containerPort: 3000,
    manifestCode: code,
  })
}

export function seededWorld(): World {
  const root = mkdtempSync(join(HOLD, PREFIX))
  const written = (path: string, body: string): undefined => {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body, "utf8")
  }
  written(`${WEB_APPS_AT}/one-web.web-app.ts`, webApp("one-web", 1, ["one-web"]))
  written(`${WEB_APPS_AT}/two-web.web-app.ts`, webApp("two-web", 2, ["one-web", "other-web"]))
  written(`${WEB_APPS_AT}/none-web.web-app.ts`, webApp("none-web", 3, []))
  written(`${WEB_APPS_AT}/lost-web.web-app.ts`, webApp("lost-web", 4, ["no-such-service"]))
  written(`${WEB_APPS_AT}/bare-web.web-app.ts`, webApp("bare-web", 5, ["bare"]))
  written(`${WEB_APPS_AT}/short-web.web-app.ts`, webApp("short-web", 6, ["one-web"], false))
  written(
    `${CLUSTER_SERVICES_AT}/one-web.cluster-service.ts`,
    clusterService("one-web", 1, "web", SYNTH_AT)
  )
  written(
    `${CLUSTER_SERVICES_AT}/bare.cluster-service.ts`,
    clusterService("bare", 2, "bare", "one/bare/bare.cluster-service.code.attachment.ts")
  )
  written(SYNTH_AT, SYNTH)
  said(["git", "-C", root, "init", "-q"])
  said(["git", "-C", root, "add", "-A"])
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}
