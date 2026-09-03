import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { PageFile } from "../files/monarch-files.module.code.ts"
import {
  ACCOUNT_FOLDER,
  AKASHA,
  accountPages,
  CATEGORY_FOLDER,
  categoryPages,
  HOLDING_FOLDER,
  holdingPages,
  MONTHS_FOLDER,
  monthSlugs,
  readAllTransactions,
  sidecarOf,
  TAG_FOLDER,
  tagPages,
} from "../files/monarch-files.module.code.ts"

export type Digest = Readonly<Record<string, string>>

function mark(pages: number, hash: ReturnType<typeof createHash>): string {
  return `${pages} pages, content ${hash.digest("hex").slice(0, 16)}`
}

async function folderMark(pages: readonly PageFile[]): Promise<string> {
  const hash = createHash("sha256")
  for (const page of [...pages].sort((one, other) => one.path.localeCompare(other.path))) {
    hash.update(page.path)
    hash.update(await readFile(join(page.root, page.path)))
  }
  return mark(pages.length, hash)
}

async function transactionMark(): Promise<string> {
  const hash = createHash("sha256")
  for (const slug of await monthSlugs()) {
    hash.update(slug)
    try {
      hash.update(await readFile(join(AKASHA, sidecarOf(slug))))
    } catch {
      hash.update("no sidecar")
    }
  }
  return mark((await readAllTransactions()).length, hash)
}

export async function digest(): Promise<Digest> {
  return {
    [`monarch-account (${ACCOUNT_FOLDER})`]: await folderMark(await accountPages()),
    [`monarch-category (${CATEGORY_FOLDER})`]: await folderMark(await categoryPages()),
    [`monarch-holding (${HOLDING_FOLDER})`]: await folderMark(await holdingPages()),
    [`monarch-tag (${TAG_FOLDER})`]: await folderMark(await tagPages()),
    [`monarch-transaction (${MONTHS_FOLDER})`]: await transactionMark(),
  }
}

export function moved(before: Digest, after: Digest): readonly string[] {
  const slugs = new Set([...Object.keys(before), ...Object.keys(after)])
  return [...slugs]
    .filter((slug) => before[slug] !== after[slug])
    .sort()
    .map((slug) => `${slug}: ${before[slug] ?? "absent"} -> ${after[slug] ?? "absent"}`)
}
