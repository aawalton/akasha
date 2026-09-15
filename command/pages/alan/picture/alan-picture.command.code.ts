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
import { imageObjectReadKeys } from "akasha/infrastructure/storage/object-store/modules/key/object-store-key.module.code.ts"
import {
  type ObjectStore,
  seaweedFSObjectStoreFromEnv,
} from "akasha/infrastructure/storage/object-store/modules/seaweedfs-store/seaweedfs-store.module.code.ts"
import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"

const NAMED = [pictureArgument, outputArgument] as const

const HOME_FOLDERS = [".local", "share", "akasha", "pictures"] as const

const NO_STORE =
  "no object store is configured — SEAWEEDFS_S3_ENDPOINT, SEAWEEDFS_BUCKET, " +
  "SEAWEEDFS_ACCESS_KEY and SEAWEEDFS_SECRET_KEY say where one is"

export type Sought = {
  readonly picture: string
  readonly output: string | undefined
}

export type Read = Sought | { readonly refused: readonly string[] }

export type Fetching = Pick<ObjectStore, "head" | "get">

export type Writing = (at: string, bytes: Uint8Array) => Promise<void>

export function readIn(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const said = read.taken.picture.toLowerCase()
  if (!lowerUuid(said)) {
    return {
      refused: [
        `\`${pictureArgument.said}\` takes the id a picture was kept under, which is a uuid, ` +
          `and \`${read.taken.picture}\` is none`,
      ],
    }
  }
  return { picture: said, output: read.taken.output }
}

export function keptAt(sought: Sought, key: string): string {
  if (sought.output !== undefined) return sought.output
  const extension = key.slice(key.lastIndexOf("."))
  return join(homedir(), ...HOME_FOLDERS, `${sought.picture}${extension}`)
}

async function writtenOut(at: string, bytes: Uint8Array): Promise<void> {
  await mkdir(dirname(at), { recursive: true })
  await writeFile(at, bytes)
}

export async function pictureBrought(
  sought: Sought,
  store: Fetching | null,
  write: Writing = writtenOut
): Promise<Answer> {
  if (store === null) return refused(NO_STORE, OPERATIONAL)
  for (const key of imageObjectReadKeys(sought.picture)) {
    const held = await store.head(key)
    if (held === null) continue
    const bytes = await store.get(key)
    const at = keptAt(sought, key)
    await write(at, bytes)
    return told([`picture\t${sought.picture}`, `path\t${at}`, `bytes\t${bytes.byteLength}`])
  }
  return refused(`no picture is kept under ${sought.picture}`, DATA)
}

export async function alanPicture(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => pictureBrought(read, seaweedFSObjectStoreFromEnv()))
}
