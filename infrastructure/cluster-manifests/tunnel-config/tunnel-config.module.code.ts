#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { TunnelRoute } from "../tunnel-route/tunnel-route.module.code.ts"
import { discoverTunnelRoutes } from "../tunnel-route-discovery/tunnel-route-discovery.module.code.ts"

const REPO_ROOT = join(import.meta.dirname, "../../../..")
const HEADER_PATH = join(
  REPO_ROOT,
  "akasha/service-system/cluster-services/pages/cloudflared/config-header.yaml"
)

const LABELS = {
  "app.kubernetes.io/name": "cloudflared",
  "app.kubernetes.io/instance": "cloudflared",
  "app.kubernetes.io/component": "tunnel",
  "app.kubernetes.io/part-of": "cloudflared",
  "app.kubernetes.io/managed-by": "deploy-script",
}

function generateYaml(routes: readonly TunnelRoute[]): string {
  const header = readFileSync(HEADER_PATH, "utf-8").trimEnd()
  const sorted = [...routes].sort((a, b) => a.hostname.localeCompare(b.hostname))

  const labelLines = Object.entries(LABELS)
    .map(([k, v]) => `    ${k}: ${v}`)
    .join("\n")

  const ingressLines = sorted
    .map((r) => `      - hostname: ${r.hostname}\n        service: ${r.service}`)
    .join("\n")

  const headerIndented = header
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n")

  return `apiVersion: v1
kind: ConfigMap
metadata:
  name: cloudflared-config
  namespace: cloudflared
  labels:
${labelLines}
data:
  config.yaml: |
${headerIndented}
    ingress:
${ingressLines}
      - service: http_status:404
`
}

function extractHostnames(yaml: string): Set<string> {
  const hostnames = new Set<string>()
  for (const match of yaml.matchAll(/hostname:\s+(\S+)/g)) {
    const host = match[1]
    if (host !== undefined) hostnames.add(host)
  }
  return hostnames
}

async function checkMode(filePath?: string): Promise<void> {
  const sourced = await discoverTunnelRoutes()

  const expectedRoutes = sourced.map((s) => s.route)
  const expectedYaml = generateYaml(expectedRoutes)
  const expectedHostnames = extractHostnames(expectedYaml)

  let liveYaml: string
  if (filePath != null) {
    liveYaml = readFileSync(filePath, "utf-8")
  } else {
    liveYaml = readFileSync("/dev/stdin", "utf-8")
  }
  const liveHostnames = extractHostnames(liveYaml)

  const missing = [...expectedHostnames].filter((h) => !liveHostnames.has(h))
  const extra = [...liveHostnames].filter((h) => !expectedHostnames.has(h))

  if (missing.length === 0 && extra.length === 0) {
    console.log("OK: hostnames match")
    process.exit(0)
  }

  if (missing.length > 0) {
    console.error(`Missing hostnames in live config:\n  ${missing.join("\n  ")}`)
  }
  if (extra.length > 0) {
    console.error(`Extra hostnames in live config:\n  ${extra.join("\n  ")}`)
  }
  process.exit(1)
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.includes("--check")) {
    const checkIdx = args.indexOf("--check")
    const filePath = args[checkIdx + 1]
    await checkMode(filePath)
    return
  }

  const sourced = await discoverTunnelRoutes()

  const routes = sourced.map((s) => s.route)
  const yaml = generateYaml(routes)
  process.stdout.write(yaml)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
