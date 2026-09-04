import { existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname } from "node:path"
import { duringOneCall } from "@akasha/command-system/during-call"
import { exclusively } from "@akasha/file-system/exclusive"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  attachmentFileOf,
  removeAttachment,
  writeAttachment,
} from "../markdown-attachment-file/markdown-attachment-file.module.code.ts"
import {
  diskFileTree,
  type FileTree,
} from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { attachmentKeysFor } from "../markdown-page-attachment-keys/markdown-page-attachment-keys.module.code.ts"
import { rowsHoldingsFor } from "../markdown-page-property-types/markdown-page-property-types.module.code.ts"
import { landOne } from "../markdown-page-write-commit/markdown-page-write-commit.module.code.ts"
import {
  patchedText,
  withId,
  withSeq,
} from "../markdown-page-write-compose/markdown-page-write-compose.module.code.ts"
import {
  frontOf,
  textIn,
} from "../markdown-page-write-text/markdown-page-write-text.module.code.ts"
import {
  type Attachment,
  splitValues,
  type Value,
} from "../markdown-page-write-values/markdown-page-write-values.module.code.ts"
import {
  type Where,
  whereFor,
} from "../markdown-page-write-where/markdown-page-write-where.module.code.ts"
import {
  partNumberOf,
  rowsFileOf,
  rowsPartOf,
  rowsPartsOf,
} from "../markdown-rows-file/markdown-rows-file.module.code.ts"
import {
  patchUncommitted,
  removeUncommitted,
} from "../markdown-uncommitted/markdown-uncommitted.module.code.ts"

export interface Taken {
  readonly at: string
  readonly pageType: string | null
  readonly pages: number
}

export interface Written extends Where {
  readonly commitError: string | null
  readonly absent?: string
  readonly refused?: string
  readonly took?: readonly Taken[]
}

export function landAttachments(
  at: Where,
  attachments: Readonly<Record<string, Attachment>>
): readonly string[] {
  const landed: string[] = []
  for (const [key, one] of Object.entries(attachments)) {
    const changed = exclusively(attachmentFileOf(at.path, key, one.extension), () =>
      writeAttachment(at.path, key, one.extension, one.text)
    )
    if (changed) landed.push(attachmentFileOf(at.relPath, key, one.extension))
  }
  return landed
}

function rowsIn(path: string): number | null {
  if (!existsSync(path)) return null
  return textIn(path)
    .split("\n")
    .filter((one) => one.trim() !== "").length
}

export interface RowsPart {
  readonly path: string
  readonly at: string
}

/**
 * Every file one property's rows are in, on disk and as the commit names it.
 *
 * A property whose rows outgrow the part ceiling is divided across `<key>.jsonl` and
 * `<key>.partN.jsonl` beside the page, and `rowsPartsOf` is the one rule that says which files
 * those are — the same rule the read path finds them by. Asking `rowsFileOf` alone named the
 * first file only, so a removal left every part behind: the rows became unreachable and
 * undeleted at once, while `rm` and `mv` both said a page's files had gone with it.
 */
export function rowsPartsFor(path: string, relPath: string): readonly RowsPart[] {
  return rowsPartsOf(path).map((part) => ({
    path: part,
    at: rowsPartOf(relPath, partNumberOf(part)),
  }))
}

function clearRows(tree: FileTree, pageType: string, at: Where): readonly Taken[] {
  const took: Taken[] = []
  for (const holding of rowsHoldingsFor(tree, pageType)) {
    const path = rowsFileOf(at.path, holding.key, holding.uncommitted)
    const relPath = rowsFileOf(at.relPath, holding.key, holding.uncommitted)
    for (const part of rowsPartsFor(path, relPath)) {
      const pages = exclusively(part.path, () => {
        const stood = rowsIn(part.path)
        rmSync(part.path, { force: true })
        return stood
      })
      if (pages !== null) took.push({ at: part.at, pageType: holding.target, pages })
    }
  }
  return took
}

function clearAttachments(tree: FileTree, pageType: string, at: Where): readonly string[] {
  const gone: string[] = []
  for (const [key, extension] of attachmentKeysFor(tree, pageType)) {
    const changed = exclusively(attachmentFileOf(at.path, key, extension), () =>
      removeAttachment(at.path, key, extension)
    )
    if (changed) gone.push(attachmentFileOf(at.relPath, key, extension))
  }
  return gone
}

export function writePage(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  by?: string
): Written | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  const split = splitValues(roots, pageType, values, tree)
  const alongside = landAttachments(at, split.attachments)
  const took = landOne(at, pageType, "write", name, by, {
    composing: [
      {
        relPath: at.relPath,
        compose: (standing) => {
          const held = standing ?? ""
          const front = withId(withSeq(roots, pageType, split.front, held), held, at)
          return `${frontOf(tree, pageType, front)}${split.body ?? ""}`
        },
      },
    ],
    alongside,
  })
  if (Object.keys(split.uncommitted).length > 0) patchUncommitted(at.path, split.uncommitted)
  return { ...at, commitError: took.commitError }
}

export function patchPage(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  by?: string,
  clear: readonly string[] = []
): Written | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  const split = splitValues(roots, pageType, values, tree)
  const alongside = landAttachments(at, split.attachments)
  const took = landOne(at, pageType, "patch", name, by, {
    composing: [
      {
        relPath: at.relPath,
        compose: (standing) => patchedText(roots, pageType, standing ?? "", split, at, clear, tree),
      },
    ],
    alongside,
  })
  if (Object.keys(split.uncommitted).length > 0) patchUncommitted(at.path, split.uncommitted)
  return { ...at, commitError: took.commitError }
}

// The state a page carries but does not commit, landed beside it.
//
// ONE WALK OF THE AKASHA ROOT, NOT TWO. `whereFor` asks the registry where the type is filed and
// then scans for the type's own files, and a type filed `**/*.<slug>.md` names no folder — 293 of
// the 364 page types are — so both questions are answered by walking every markdown file in the
// repo, 56,507 of them here. Outside a call scope `scanGlob` memoizes nothing, so the registry's
// walk of each root and `whereFor`'s walk of the page's own root were three walks of two trees,
// once per write, the akasha root twice over. The editor's observation store writes here on a
// 250ms settle from inside the extension host, where every walk is a synchronous stall of the node
// event loop. Counted by a line printed from `scannedGlob`, one write was 3 walks and 1990ms and
// is now 2 walks and 897ms; the scanning alone, timed apart from the write, was 922ms and is
// 205ms. Both were measured with the shape mark unavailable, which is how this worktree stands
// whenever `page/` is dirty — with the mark in hand the registry answers from its own file, does
// not scan, and the one walk left is `whereFor`'s, which this does not remove.
//
// WHY THIS SCOPE CANNOT READ PAST ITS OWN WRITE. A memo held across a write is safe only where the
// write cannot change what was memoized. What this lands is `<page>.uncommitted.yaml` and, if it
// is missing, the folder holding it — no markdown page, and every glob a scan here memoizes ends
// `.md`, so nothing this writes could ever appear in one. The uncommitted file has a memo of its
// own and that one is already sound on these terms: `patchUncommitted` re-reads the file itself
// rather than the memo, and `writeUncommitted` puts what it landed back into it.
export function patchState(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>
): Where | null {
  return duringOneCall(() => stateLanded(roots, pageType, name, values))
}

function stateLanded(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>
): Where | null {
  const at = whereFor(roots, pageType, name)
  if (at === null) return null
  mkdirSync(dirname(at.path), { recursive: true })
  patchUncommitted(at.path, { ...values })
  return at
}

export function removePage(
  roots: Roots,
  pageType: string,
  name: string,
  by?: string
): Written | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  removeUncommitted(at.path)
  const cleared = clearAttachments(tree, pageType, at)
  const rows = clearRows(tree, pageType, at)
  const landing = landOne(at, pageType, "remove", name, by, {
    removing: [at.relPath],
    alongside: [...cleared, ...rows.map((one) => one.at)],
  })
  const changed = landing.landed !== null && landing.landed.gone.includes(at.relPath)
  const gone = [...(changed ? [at.relPath] : []), ...cleared, ...rows.map((one) => one.at)]
  const commitError = landing.commitError
  const took: readonly Taken[] = [
    ...(changed ? [{ at: at.relPath, pageType, pages: 1 }] : []),
    ...cleared.map((one) => ({ at: one, pageType: null, pages: 0 })),
    ...rows,
  ]
  if (gone.length > 0) return { ...at, commitError, took }
  return {
    ...at,
    commitError,
    absent: `\`${pageType}\` has no page \`${name}\`: nothing stood at ${at.relPath}, so nothing was taken away`,
  }
}
