#!/usr/bin/env bun

import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { generateBunServiceDockerfile } from "../dockerfile-bun-service/dockerfile-bun-service.module.code.ts"
import { buildPackageNameMap, readJson } from "../dockerfile-deps/dockerfile-deps.module.code.ts"
import {
  type DockerfileExtensions,
  isServiceType,
  parseDockerfileExtensions,
  type ServiceConfig,
  type ServiceType,
} from "../dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { generateNextjsDockerfile } from "../dockerfile-nextjs/dockerfile-nextjs.module.code.ts"
import { ROOT, SERVICES } from "../dockerfile-services/dockerfile-services.module.code.ts"
import {
  generateToolImageDockerfile,
  getOutputPath,
} from "../dockerfile-tool-image/dockerfile-tool-image.module.code.ts"

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

  const generated = generateDockerfile(name, config, nameMap, ext, allWorkspaceDirs)
  const outPath = getOutputPath(ROOT, config, ext)
  writeFileSync(outPath, generated)

  const relPath = outPath.replace(ROOT + "/", "")
  console.log(`Generated: ${relPath}`)
}
