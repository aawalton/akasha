import { mkdir, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { output as outputArgument } from "akasha/command/argument/pages/output.argument.ts"
import { picture as pictureArgument } from "akasha/command/argument/pages/picture.argument.ts"
import {
  answering,
  DATA,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { alanPicture as page } from "akasha/command/pages/alan/picture/alan-picture.command.ts"
import { endingOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import {
  type Fetched,
  filingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const NAMED = [pictureArgument, outputArgument] as const

const HOME_FOLDERS = [".local", "share", "akasha", "pictures"] as const

const IMAGE_PAGE_TYPE_SLUG = "image"

const BYTES_KEY = "bytes"

const A_SLUG = /^image-[0-9a-f]{16}$/

const NO_PAGE = "is no page here"

export type Sought = {
  readonly picture: string
  readonly output: string | undefined
}

export type Read = Sought | { readonly refused: readonly string[] }

export type Bringing = (slug: string) => Promise<Fetched>

export type Writing = (at: string, bytes: Uint8Array) => Promise<void>

export function readIn(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const said = read.taken.picture.toLowerCase()
  if (!A_SLUG.test(said)) {
    return {
      refused: [
        `\`${pictureArgument.said}\` takes an image page's slug, which opens with \`image-\` ` +
          `and sixteen hex, and \`${read.taken.picture}\` is none`,
      ],
    }
  }
  return { picture: said, output: read.taken.output }
}

export function keptAt(sought: Sought, ending: string): string {
  if (sought.output !== undefined) return sought.output
  return join(homedir(), ...HOME_FOLDERS, `${sought.picture}.${ending}`)
}

async function writtenOut(at: string, bytes: Uint8Array): Promise<void> {
  await mkdir(dirname(at), { recursive: true })
  await writeFile(at, bytes)
}

function brought(slug: string): Promise<Fetched> {
  return filingFor({ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug, key: BYTES_KEY })
}

export async function pictureBrought(
  sought: Sought,
  bring: Bringing = brought,
  write: Writing = writtenOut
): Promise<Answer> {
  const held = await bring(sought.picture)
  if ("refused" in held) {
    return refused(held.refused, held.refused.includes(NO_PAGE) ? DATA : OPERATIONAL)
  }
  const ending = endingOf(held.bytes)
  if (ending === null) {
    return refused(`the bytes of ${sought.picture} are neither png nor jpg`, DATA)
  }
  const at = keptAt(sought, ending)
  await write(at, held.bytes)
  return told([`picture\t${sought.picture}`, `path\t${at}`, `bytes\t${held.bytes.byteLength}`])
}

export async function alanPicture(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => pictureBrought(read))
}
