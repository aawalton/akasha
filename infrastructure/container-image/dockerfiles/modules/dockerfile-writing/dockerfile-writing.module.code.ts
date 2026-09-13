import { join } from "node:path"
import { listWorkspaceDirs } from "akasha/alan/harness/workspace-paths/modules/workspace-dirs/workspace-dirs.module.code.ts"
import { generateBunServiceDockerfile } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-bun-service/dockerfile-bun-service.module.code.ts"
import {
  buildPackageNameMap,
  readJson,
} from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-deps/dockerfile-deps.module.code.ts"
import {
  type DockerfileExtensions,
  parseDockerfileExtensions,
  type ServiceConfig,
} from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { generateNextjsDockerfile } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-nextjs/dockerfile-nextjs.module.code.ts"
import {
  ROOT,
  SERVICES,
} from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-services/dockerfile-services.module.code.ts"
import { generateToolImageDockerfile } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-tool-image/dockerfile-tool-image.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"

function extensionsOf(config: ServiceConfig): DockerfileExtensions {
  if (config.extensionFile === undefined) return {}
  return parseDockerfileExtensions(readJson(join(ROOT, config.extensionFile)))
}

export function dockerfileFor(slug: string): string {
  const config = SERVICES[slug]
  if (config === undefined) {
    throw new Error(`${slug} is no built image, so no Dockerfile is written for it`)
  }
  const ext = extensionsOf(config)
  const dirs = [...listWorkspaceDirs(ROOT)].sort()
  const names = buildPackageNameMap(dirs)
  switch (config.type) {
    case "nextjs":
      return generateNextjsDockerfile(slug, config, names, ext, dirs)
    case "bun-service":
      return generateBunServiceDockerfile(slug, config, names, ext, dirs)
    case "tool-image":
      return generateToolImageDockerfile(slug, config, names, ext)
    default:
      return assertNever(config.type)
  }
}
