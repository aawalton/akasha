import { OperationalError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { bytesSlug } from "akasha/code/body/modules/bytes-slug/bytes-slug.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  placingFor,
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const IMAGE_PAGE_TYPE_SLUG = "image"

const BYTES_KEY = "bytes"

const PNG = "png"

const JPG = "jpg"

const SLUG_OPENS = "image-"

export type Ending = typeof PNG | typeof JPG

export type ImageDeps = {
  readonly pathOf: (slug: string) => Promise<string | null>
  readonly landPage: (slug: string, values: Value) => Promise<void>
  readonly place: (slug: string, ending: Ending, bytes: Uint8Array) => Promise<string>
}

export type Landed = { readonly slug: string; readonly at: string }

export function endingOf(bytes: Uint8Array): Ending | null {
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return PNG
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return JPG
  return null
}

export function imageSlugOf(bytes: Uint8Array): string {
  return bytesSlug(SLUG_OPENS, bytes)
}

async function pathAsked(slug: string): Promise<string | null> {
  const read = await readingFor({ pages: [{ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug }] })
  if ("refused" in read) {
    throw new OperationalError(`the image page ${slug} went unread: ${read.refused}`)
  }
  const body = read.bodies[0]
  return body === undefined || body.content === null ? null : body.path
}

export function imageDeps(writer: string): ImageDeps {
  return {
    pathOf: pathAsked,
    landPage: async (slug, values) => {
      const wrote = await writingFor({
        writer,
        message: `land the image ${slug}`,
        pages: [{ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug, values }],
      })
      if ("refused" in wrote) {
        throw new OperationalError(`the image page ${slug} did not land: ${wrote.refused}`)
      }
    },
    place: async (slug, ending, bytes) => {
      const placed = await placingFor({
        pageTypeSlug: IMAGE_PAGE_TYPE_SLUG,
        slug,
        key: BYTES_KEY,
        ending,
        bytes,
      })
      if ("refused" in placed) {
        throw new OperationalError(`the bytes of ${slug} were not placed: ${placed.refused}`)
      }
      return placed.placed
    },
  }
}

export async function landImage(
  deps: ImageDeps,
  bytes: Uint8Array,
  values: Value,
  done: string[]
): Promise<Landed> {
  const ending = endingOf(bytes)
  if (ending === null) {
    throw new OperationalError("a picture is png or jpg, and these bytes are neither")
  }
  const slug = imageSlugOf(bytes)
  const there = await deps.pathOf(slug)
  if (there === null) {
    await deps.landPage(slug, values)
    done.push(`landed the image page ${slug}`)
  } else {
    done.push(`the image page ${slug} was already there`)
  }
  const at = await deps.place(slug, ending, bytes)
  done.push(`placed the bytes at ${at}`)
  return { slug, at }
}
