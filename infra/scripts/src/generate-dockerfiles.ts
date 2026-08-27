#!/usr/bin/env bun

import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { assertNever } from "../../../shared/utils-narrow/src/assert-never"
import { listWorkspaceDirs } from "@shared/workspace-paths"
import { generateBunServiceDockerfile } from "./generate-dockerfiles-bun"
import { buildPackageNameMap, discoverWorkflowFiles, readJson } from "./generate-dockerfiles-deps"
import { generateNextjsDockerfile } from "./generate-dockerfiles-nextjs"
import { ROOT, SERVICES } from "./generate-dockerfiles-registry"
import { generateToolImageDockerfile, getOutputPath } from "./generate-dockerfiles-tool"
import {
  type DockerfileExtensions,
  isServiceType,
  parseDockerfileExtensions,
  type ServiceConfig,
  type ServiceType,
} from "./generate-dockerfiles-types"

const args = process.argv.slice(2)
let targetService: string | null = null
let targetType: ServiceType | null = null

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  const next = args[i + 1]
  if ((arg === "--app" || arg === "--service") && next !== undefined) {
    targetService = next
    i++
  } else if (arg === "--type" && next !== undefined) {
    if (!isServiceType(next)) {
      console.error(`Unknown service type: ${next}`)
      process.exit(1)
    }
    targetType = next
    i++
  }
}

function generateDockerfile(
  name: string,
  config: ServiceConfig,
  nameMap: Map<string, string>,
  ext: DockerfileExtensions,
  allWorkspaceDirs: readonly string[]
): string {
  switch (config.type) {
    case "nextjs":
      return generateNextjsDockerfile(name, config, nameMap, ext)
    case "bun-service":
      return generateBunServiceDockerfile(name, config, nameMap, ext, allWorkspaceDirs)
    case "tool-image":
      return generateToolImageDockerfile(name, config, nameMap, ext)
    default:
      assertNever(config.type)
  }
}

const nameMap = buildPackageNameMap()
const allWorkspaceDirs = [...listWorkspaceDirs(ROOT)].sort()

let servicesToGenerate: [string, ServiceConfig][]

if (targetService != null) {
  const config = SERVICES[targetService]
  if (!config) {
    console.error(`Unknown service: ${targetService}`)
    process.exit(1)
  }
  servicesToGenerate = [[targetService, config]]
} else if (targetType != null) {
  servicesToGenerate = Object.entries(SERVICES).filter(([, c]) => c.type === targetType)
  if (servicesToGenerate.length === 0) {
    console.error(`No services registered with type: ${targetType}`)
    process.exit(1)
  }
} else {
  servicesToGenerate = Object.entries(SERVICES)
}

for (const [name, config] of servicesToGenerate) {
  const extFilename = config.extensionFile ?? "dockerfile-extensions.json"
  const extPath = join(ROOT, config.dir, "deploy", extFilename)
  const ext: DockerfileExtensions = existsSync(extPath)
    ? parseDockerfileExtensions(readJson(extPath))
    : {}

  if (ext.discover_workflow_files) {
    const discovered = discoverWorkflowFiles(config.dir)
    ext.extra_source_copies = [...(ext.extra_source_copies ?? []), ...discovered]
  }

  const generated = generateDockerfile(name, config, nameMap, ext, allWorkspaceDirs)
  const outPath = getOutputPath(ROOT, config, ext)
  writeFileSync(outPath, generated)

  const relPath = outPath.replace(ROOT + "/", "")
  console.log(`Generated: ${relPath}`)
}
