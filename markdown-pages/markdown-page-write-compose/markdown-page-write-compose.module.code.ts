import { idOfFilePage as pageId } from "@akasha/file-page-identity"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  diskFileTree,
  type FileTree,
} from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { attachmentKeysFor } from "../markdown-page-attachment-keys/markdown-page-attachment-keys.module.code.ts"
import type { Rendered } from "../markdown-page-property-types/markdown-page-property-types.module.code.ts"
import { statesNextSeq, takeSeqOf } from "../markdown-page-seq/markdown-page-seq.module.code.ts"
import { pageTypePathIn } from "../markdown-page-types/markdown-page-types.module.code.ts"
import { uncommittedKeysFor } from "../markdown-page-uncommitted-keys/markdown-page-uncommitted-keys.module.code.ts"
import {
  bodyIn,
  frontOf,
  statedIn,
  textIn,
} from "../markdown-page-write-text/markdown-page-write-text.module.code.ts"
import {
  type Split,
  splitValues,
  type Value,
} from "../markdown-page-write-values/markdown-page-write-values.module.code.ts"
import {
  type Where,
  whereFor,
} from "../markdown-page-write-where/markdown-page-write-where.module.code.ts"

const PAGE_ID = "id"

export function withId(
  front: Readonly<Record<string, Rendered>>,
  text: string,
  at: Where
): Record<string, Rendered> {
  const held = statedIn(text)[PAGE_ID] ?? front[PAGE_ID] ?? pageId(null, `${at.repo}:${at.relPath}`)
  const rest = { ...front }
  delete rest[PAGE_ID]
  return { [PAGE_ID]: held as Rendered, ...rest }
}

const PAGE_SEQ = "seq"

async function mintedSeq(roots: Roots, pageType: string): Promise<number | undefined> {
  const relPath = pageTypePathIn(rootFor(roots, AKASHA), pageType)
  if (!statesNextSeq(rootFor(roots, AKASHA), relPath)) return undefined
  return await takeSeqOf({ pageTypeRelPath: relPath, noun: pageType })
}

export async function withSeq(
  roots: Roots,
  pageType: string,
  front: Readonly<Record<string, Rendered>>,
  text: string
): Promise<Record<string, Rendered>> {
  const held = statedIn(text)[PAGE_SEQ] ?? front[PAGE_SEQ] ?? (await mintedSeq(roots, pageType))
  if (held === undefined) return { ...front }
  const rest = { ...front }
  delete rest[PAGE_SEQ]
  return { [PAGE_SEQ]: held as Rendered, ...rest }
}

export function patchedText(
  roots: Roots,
  pageType: string,
  text: string,
  split: Split,
  at: Where,
  clear: readonly string[] = [],
  tree: FileTree = diskFileTree(roots)
): string {
  const standing = statedIn(text)
  delete standing["page-type-slug"]
  for (const key of uncommittedKeysFor(tree, pageType)) delete standing[key]
  for (const key of attachmentKeysFor(tree, pageType).keys()) delete standing[key]
  const merged: Record<string, unknown> = { ...standing, ...split.front }
  for (const key of clear) delete merged[key]
  const front = frontOf(tree, pageType, withId(merged as Record<string, Rendered>, text, at))
  return `${front}${split.body ?? bodyIn(text)}`
}

export function landingTextFor(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  act: "write" | "patch",
  clear: readonly string[] = []
): { readonly at: Where; readonly text: string } | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  const split = splitValues(roots, pageType, values, tree)
  if (act === "write") {
    const front = withId(split.front, textIn(at.path), at)
    return { at, text: `${frontOf(tree, pageType, front)}${split.body ?? ""}` }
  }
  return { at, text: patchedText(roots, pageType, textIn(at.path), split, at, clear, tree) }
}
