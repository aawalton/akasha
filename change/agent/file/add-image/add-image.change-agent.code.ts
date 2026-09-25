import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { akasha } from "akasha/akasha.domain.ts"
import {
  type Answer,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { image } from "akasha/infrastructure/inference/generation/image/image.page-type.ts"
import {
  endingOf,
  imageSlugOf,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { imageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  besideAt,
  uncommittedBesideAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const FROM = "from"

const TITLE = "title"

const ROOTED = "/"

const PAGES = "pages"

const TS = "ts"

const TYPES = "types"

export type Asked = Readonly<Record<string, string>>

function bodyFor(slug: string, title: string | undefined, typesAt: string): string {
  const typed = typedAs(image.slug)
  const lines = [
    `import type { ${typed} } from "${akasha.slug}/${typesAt}"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    `  type: "${namedAs(pageType.slug, image.slug, null)}",`,
    `  slug: "${slug}",`,
    ...(title === undefined ? [] : [`  title: ${JSON.stringify(title)},`]),
    `} as const satisfies ${typed}`,
    "",
  ]
  return lines.join("\n")
}

export function addImageCommand(world: World, given: Asked, bytes: Uint8Array | null): Answer {
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  if (!from.startsWith(ROOTED)) {
    return refusing(`\`${from}\` is not a whole path, so no picture is brought from it`)
  }
  if (bytes === null) return refusing(`\`${from}\` holds no file, so no picture is brought in`)
  const ending = endingOf(bytes)
  if (ending === null) return refusing(`\`${from}\` is neither png nor jpg, so it is no picture`)
  const slug = imageSlugOf(bytes)
  const there = world.index.listedAt(image.slug, slug)[0]
  if (there !== undefined) return refusing(`\`${slug}\` is a page already, at \`${there.path}\``)
  const typeAt = world.index.listedAt(pageType.slug, image.slug)[0]?.path
  if (typeAt === undefined) return refusing(`\`${image.slug}\` names no page type`)
  const pageAt = join(dirname(typeAt), PAGES, `${slug}.${image.slug}.${TS}`)
  const typesAt = besideAt(typeAt, TYPES, TS)
  const bytesAt = uncommittedBesideAt(pageAt, imageBytes.propertySlug, ending)
  if (typesAt === null || bytesAt === null) return refusing(`\`${slug}\` names no page path`)
  return stating([
    { kind: "add", path: pageAt, content: bodyFor(slug, given[TITLE], typesAt) },
    { kind: "bring", path: bytesAt, pathFrom: from },
  ])
}

function pictureAt(from: string | undefined): Uint8Array | null {
  if (from === undefined || !from.startsWith(ROOTED) || !existsSync(from)) return null
  return readFileSync(from)
}

export const takes: readonly string[] = [FROM, TITLE]

export function runChange(world: World, given: Asked): Answer {
  return addImageCommand(world, given, pictureAt(given[FROM]))
}
