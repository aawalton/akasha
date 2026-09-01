import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const HOLD = "/var/tmp"
const PREFIX = "akasha-web-app-"

export const SYNTH_AT = "one/web/one-web.cluster-service.code.attachment.ts"

export type Standing = {
  readonly root: string
  readonly sweep: () => undefined
}

const SERVICE = [
  "---",
  "page-type-slug: cluster-service",
  'title: "One web"',
  "slug: one-web",
  "kind: Deployment",
  "namespace: one",
  "resource-name: web",
  "---",
  "",
].join("\n")

const BARE = [
  "---",
  "page-type-slug: cluster-service",
  "slug: bare",
  "kind: Deployment",
  "namespace: one",
  "resource-name: bare",
  "---",
  "",
].join("\n")

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

function webApp(slug: string, named: readonly string[]): string {
  const lines = ["---", "page-type-slug: web-app", `slug: ${slug}`, `title: "${slug}"`]
  if (named.length > 0) {
    lines.push("cluster-service-slugs:")
    for (const one of named) lines.push(`  - ${one}`)
  }
  lines.push("---", "")
  return lines.join("\n")
}

export function standingWorld(): Standing {
  const root = mkdtempSync(join(HOLD, PREFIX))
  const stand = (path: string, body: string): undefined => {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body, "utf8")
  }
  stand("pages/web-app/one-web.web-app.md", webApp("one-web", ["one-web"]))
  stand("pages/web-app/two-web.web-app.md", webApp("two-web", ["one-web", "other-web"]))
  stand("pages/web-app/none-web.web-app.md", webApp("none-web", []))
  stand("pages/web-app/lost-web.web-app.md", webApp("lost-web", ["no-such-service"]))
  stand("pages/web-app/bare-web.web-app.md", webApp("bare-web", ["bare"]))
  stand("one/web/one-web.cluster-service.md", SERVICE)
  stand(SYNTH_AT, SYNTH)
  stand("one/bare/bare.cluster-service.md", BARE)
  execFileSync("git", ["-C", root, "init", "-q"])
  execFileSync("git", ["-C", root, "add", "-A"])
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}
