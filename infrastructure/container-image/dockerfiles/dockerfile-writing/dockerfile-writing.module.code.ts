import { join } from "node:path"
import { listWorkspaceDirs } from "akasha/alan/harness/workspace-paths/workspace-dirs/workspace-dirs.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"
import { generateBunServiceDockerfile } from "../dockerfile-bun-service/dockerfile-bun-service.module.code.ts"
import { buildPackageNameMap, readJson } from "../dockerfile-deps/dockerfile-deps.module.code.ts"
import {
  type DockerfileExtensions,
  parseDockerfileExtensions,
  type ServiceConfig,
} from "../dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { generateNextjsDockerfile } from "../dockerfile-nextjs/dockerfile-nextjs.module.code.ts"
import { ROOT, SERVICES } from "../dockerfile-services/dockerfile-services.module.code.ts"
import { generateToolImageDockerfile } from "../dockerfile-tool-image/dockerfile-tool-image.module.code.ts"

export function extensionsOf(config: ServiceConfig): DockerfileExtensions {
  if (config.extensionFile === undefined) return {}
  return parseDockerfileExtensions(readJson(join(ROOT, config.extensionFile)))
}

export function dockerfileFor(slug: string): string {
  const config = SERVICES[slug]
  if (config === undefined) {
    throw new Error(`${slug} is no built image, so no Dockerfile is written for it`)
  }
  const ext = extensionsOf(config)
  const names = buildPackageNameMap()
  const dirs = [...listWorkspaceDirs(ROOT)].sort()
  switch (config.type) {
    case "nextjs":
      return generateNextjsDockerfile(slug, config, names, ext)
    case "bun-service":
      return generateBunServiceDockerfile(slug, config, names, ext, dirs)
    case "tool-image":
      return generateToolImageDockerfile(slug, config, names, ext)
    default:
      return assertNever(config.type)
  }
}
