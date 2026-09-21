import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import { shouldPersistMedia } from "akasha/infrastructure/inference/run/modules/persist-media/persist-media.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const IMAGE_PAGE_TYPE_SLUG = "image"

const BYTES_PROPERTY = "bytes"

const PNG = "png"

const SLUG_OPENS = "image-"

const SLUG_HOLDS = 16

const IMAGE_OPERATIONS = new Set(["generate", "edit", "upscale"])

const WRITER = "inference-cli <inference-cli@alanwalton.com>"

export function shouldPersistImage(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, IMAGE_OPERATIONS)
}

export function imageSlugOf(bytes: Uint8Array): string {
  return `${SLUG_OPENS}${sha256Hex(bytes).slice(0, SLUG_HOLDS)}`
}

export interface PersistImageDeps {
  readonly pathOf: (slug: string) => Promise<string | null>
  readonly landPage: (slug: string) => Promise<void>
  readonly placeBytes: (at: string, bytes: Uint8Array) => Promise<void>
}

async function pathAsked(slug: string): Promise<string | null> {
  const read = await readingFor({ pages: [{ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug }] })
  if ("refused" in read) {
    throw new OperationalError(`the image page ${slug} went unread: ${read.refused}`)
  }
  const body = read.bodies[0]
  return body === undefined || body.content === null ? null : body.path
}

async function pageLanded(slug: string): Promise<void> {
  const wrote = await writingFor({
    writer: WRITER,
    message: `land the image ${slug}`,
    pages: [{ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug, values: {} }],
  })
  if ("refused" in wrote) {
    throw new OperationalError(`the image page ${slug} did not land: ${wrote.refused}`)
  }
}

export function defaultPersistImageDeps(): PersistImageDeps {
  return {
    pathOf: pathAsked,
    landPage: pageLanded,
    placeBytes: async (at, bytes) => {
      writeFileSync(join(akashaRoot(), at), bytes)
    },
  }
}

export async function persistInferenceImage(
  deps: PersistImageDeps,
  bytes: Uint8Array,
  done: string[]
): Promise<string> {
  const slug = imageSlugOf(bytes)
  let at = await deps.pathOf(slug)
  if (at === null) {
    await deps.landPage(slug)
    done.push(`landed the image page ${slug}`)
    at = await deps.pathOf(slug)
    if (at === null) {
      throw new OperationalError(`the image page ${slug} landed and cannot be read back`)
    }
  } else {
    done.push(`the image page ${slug} was already there`)
  }
  const beside = uncommittedBesideAt(at, BYTES_PROPERTY, PNG)
  if (beside === null) {
    throw new OperationalError(`\`${at}\` is no page file, so no bytes sit beside it`)
  }
  await deps.placeBytes(beside, bytes)
  done.push(`placed the bytes beside ${slug}`)
  return slug
}
