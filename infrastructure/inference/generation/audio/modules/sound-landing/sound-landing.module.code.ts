import { bytesSlug } from "akasha/code/body/modules/bytes-slug/bytes-slug.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { isRiff } from "akasha/infrastructure/inference/client/modules/riff-bytes/riff-bytes.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  placingFor,
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const AUDIO_PAGE_TYPE_SLUG = "audio"

const BYTES_KEY = "bytes"

const WAV = "wav"

const SLUG_OPENS = "audio-"

export type SoundDeps = {
  readonly pathOf: (slug: string) => Promise<string | null>
  readonly landPage: (slug: string, values: Value) => Promise<void>
  readonly place: (slug: string, bytes: Uint8Array) => Promise<string>
}

export type Landed = { readonly slug: string; readonly at: string }

export function audioSlugOf(bytes: Uint8Array): string {
  return bytesSlug(SLUG_OPENS, bytes)
}

async function pathAsked(slug: string): Promise<string | null> {
  const read = await readingFor({ pages: [{ pageTypeSlug: AUDIO_PAGE_TYPE_SLUG, slug }] })
  if ("refused" in read) {
    throw new OperationalError(`the audio page ${slug} went unread: ${read.refused}`)
  }
  const body = read.bodies[0]
  return body === undefined || body.content === null ? null : body.path
}

export function soundDeps(writer: string): SoundDeps {
  return {
    pathOf: pathAsked,
    landPage: async (slug, values) => {
      const wrote = await writingFor({
        writer,
        message: `land the audio ${slug}`,
        pages: [{ pageTypeSlug: AUDIO_PAGE_TYPE_SLUG, slug, values }],
      })
      if ("refused" in wrote) {
        throw new OperationalError(`the audio page ${slug} did not land: ${wrote.refused}`)
      }
    },
    place: async (slug, bytes) => {
      const placed = await placingFor({
        pageTypeSlug: AUDIO_PAGE_TYPE_SLUG,
        slug,
        key: BYTES_KEY,
        ending: WAV,
        bytes,
      })
      if ("refused" in placed) {
        throw new OperationalError(`the bytes of ${slug} were not placed: ${placed.refused}`)
      }
      return placed.placed
    },
  }
}

export async function landSound(
  deps: SoundDeps,
  bytes: Uint8Array,
  values: Value,
  done: string[]
): Promise<Landed> {
  if (!isRiff(bytes)) {
    throw new OperationalError("a sound is a wav, and these bytes are not one")
  }
  const slug = audioSlugOf(bytes)
  const there = await deps.pathOf(slug)
  if (there === null) {
    await deps.landPage(slug, values)
    done.push(`landed the audio page ${slug}`)
  } else {
    done.push(`the audio page ${slug} was already there`)
  }
  const at = await deps.place(slug, bytes)
  done.push(`placed the bytes at ${at}`)
  return { slug, at }
}
