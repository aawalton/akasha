import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import { generateBunServiceDockerfile } from "akasha/infrastructure/container-image/dockerfile/modules/bun-service/dockerfile-bun-service.module.code.ts"
import {
  type DockerfileExtensions,
  parseDockerfileExtensions,
  type ServiceConfig,
} from "akasha/infrastructure/container-image/dockerfile/modules/extensions/dockerfile-extensions.module.code.ts"
import {
  type Seen,
  seenIn,
} from "akasha/infrastructure/container-image/dockerfile/modules/imports/dockerfile-imports.module.code.ts"
import { generateNextjsDockerfile } from "akasha/infrastructure/container-image/dockerfile/modules/nextjs/dockerfile-nextjs.module.code.ts"
import { generateToolImageDockerfile } from "akasha/infrastructure/container-image/dockerfile/modules/tool-image/dockerfile-tool-image.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

const JSON_VALUE_SCHEMA = z.unknown()

const BUILT_IMAGE = "built-image"

const DOCKERFILE = "dockerfile"

const EXTENSIONS = "extensions"

const WRITERS = "infrastructure/container-image/dockerfile/"

const PATCHES = "patches/"

const SOURCE = /\.(ts|tsx|mts|js|jsx|mjs|json)$/

type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

function jsonIn(text: string): Record<string, unknown> {
  const parsed = JSON_VALUE_SCHEMA.parse(JSON.parse(text))
  return isObjectRecord(parsed) ? parsed : {}
}

function extensionsOf(config: ServiceConfig, seen: Seen): DockerfileExtensions {
  if (config.extensionFile === undefined) return {}
  const text = seen.bodyAt(config.extensionFile)
  if (text === null) {
    throw new Error(
      `\`${config.extensionFile}\` is named as an image's extensions and is not there`
    )
  }
  return parseDockerfileExtensions(jsonIn(text))
}

function dockerfileOf(slug: string, config: ServiceConfig, seen: Seen): string {
  const ext = extensionsOf(config, seen)
  switch (config.type) {
    case "nextjs":
      return generateNextjsDockerfile(slug, config, ext, seen)
    case "bun-service":
      return generateBunServiceDockerfile(slug, config, ext, seen)
    case "tool-image":
      return generateToolImageDockerfile(slug, config, ext)
    default:
      return assertNever(config.type)
  }
}

function kindOf(said: string | null): ServiceConfig["type"] | null {
  return said === "nextjs" || said === "bun-service" || said === "tool-image" ? said : null
}

function configOf(path: string, value: Record<string, unknown>): ServiceConfig | null {
  const type = kindOf(textAt(value, "kind"))
  const dir = textAt(value, "folder")
  if (type === null || dir === null) return null
  const ending = textAt(value, EXTENSIONS)
  const extensionFile = ending === null ? null : besideAt(path, EXTENSIONS, ending)
  return extensionFile === null ? { type, dir } : { type, dir, extensionFile }
}

function writtenOver(change: Change): Written {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(`no Dockerfile could be written — ${cast.refused}`)
  const { shadow, reading } = cast
  const seen = seenIn(change, shadow.index)
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  for (const listed of shadow.index.everyOfType(BUILT_IMAGE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const config = configOf(listed.path, value)
    if (slug === null || config === null) continue
    const at = fileOf(reading, { path: listed.path, value }, BUILT_IMAGE, DOCKERFILE)
    const written = dockerfileOf(slug, config, seen)
    const was = textOf(change.after(at))
    if (was === written) continue
    edits.push(
      was === null
        ? { kind: "add", path: at, content: written }
        : { kind: "replace", path: at, contentFrom: was, contentTo: written }
    )
    said.push(`\`${at}\` was written again for the \`${slug}\` image`)
  }
  return { edits, said }
}

export function couldTurn(change: Change): boolean {
  return change.changed.some(
    (path) => path.startsWith(WRITERS) || path.startsWith(PATCHES) || SOURCE.test(path)
  )
}

export function generateChange(change: Change): Written {
  return writtenOver(change)
}
