import { readFileSync } from "node:fs"
import { join } from "node:path"
import { generateBunServiceDockerfile } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-bun-service/dockerfile-bun-service.module.code.ts"
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
import { isObjectRecord } from "akasha/utils/narrow/modules/is-object-record/is-object-record.module.code.ts"
import { z } from "zod"

const JSON_VALUE_SCHEMA = z.unknown()

function readJson(path: string): Record<string, unknown> {
  const parsed = JSON_VALUE_SCHEMA.parse(JSON.parse(readFileSync(path, "utf-8")))
  return isObjectRecord(parsed) ? parsed : {}
}

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
  switch (config.type) {
    case "nextjs":
      return generateNextjsDockerfile(slug, config, ext)
    case "bun-service":
      return generateBunServiceDockerfile(slug, config, ext)
    case "tool-image":
      return generateToolImageDockerfile(slug, config, ext)
    default:
      return assertNever(config.type)
  }
}
