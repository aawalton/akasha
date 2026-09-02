import { PagesMissing, readFilePages } from "@tools/lib/file-pages"
import type { Row } from "@tools/lib/page-derive-shape"
import { textOf } from "@tools/lib/page-query-values"
import { z } from "zod"

export const MOBILE_CUT_PAGE_TYPE_SLUG = "mobile-cut"

const CUT_KEYS: readonly string[] = [
  "app-slug",
  "build-number",
  "main-sha",
  "shell-sha",
  "build-input-tree-hash",
  "cut-at",
]

export interface CutFingerprint {
  readonly buildNumber: number
  readonly mainSha: string
  readonly shellSha: string | null
  readonly buildInputTreeHash: string | null
  readonly cutAt: string
}

export interface CurrentTreeState {
  readonly mainSha: string
  readonly buildInputTreeHash: string
}

export interface CutStatus {
  readonly owed: boolean
  readonly buildInputChanged: boolean
  readonly predatesBasis: boolean
  readonly lastCut: CutFingerprint | null
}

export function compareCutStatus(
  last: CutFingerprint | null,
  current: CurrentTreeState
): CutStatus {
  if (last === null) {
    return { owed: true, buildInputChanged: true, predatesBasis: false, lastCut: null }
  }
  if (last.buildInputTreeHash === null) {
    return { owed: true, buildInputChanged: true, predatesBasis: true, lastCut: last }
  }
  const buildInputChanged = last.buildInputTreeHash !== current.buildInputTreeHash
  return {
    owed: buildInputChanged,
    buildInputChanged,
    predatesBasis: false,
    lastCut: last,
  }
}

export async function recordCutFingerprint(appSlug: string, fp: CutFingerprint): Promise<void> {
  throw new Error(
    `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${appSlug}-${fp.buildNumber}\` was not written — nothing files ` +
      `a cut, so \`mobile cut-status\` keeps answering against the newest fingerprint already under ` +
      `pages/${MOBILE_CUT_PAGE_TYPE_SLUG} rather than against build ${fp.buildNumber}`
  )
}

const cutFingerprintValues = z.object({
  "build-number": z.coerce.number().int().positive(),
  "main-sha": z.string().min(1),
  "shell-sha": z.string().min(1).optional(),
  "build-input-tree-hash": z.string().min(1).optional(),
  "cut-at": z.string().min(1),
})

function buildNumberOf(row: Row): number {
  const said = textOf(row.values, "build-number")
  const counted = said === null ? Number.NaN : Number(said)
  return Number.isFinite(counted) ? counted : Number.NEGATIVE_INFINITY
}

function cutPagesOf(appSlug: string): readonly Row[] {
  let rows: readonly Row[]
  try {
    rows = readFilePages(MOBILE_CUT_PAGE_TYPE_SLUG, CUT_KEYS)
  } catch (unread) {
    if (unread instanceof PagesMissing) return []
    throw unread
  }
  return rows.filter((row) => textOf(row.values, "app-slug") === appSlug)
}

export async function readLatestCutFingerprint(appSlug: string): Promise<CutFingerprint | null> {
  const newest = [...cutPagesOf(appSlug)].sort((a, b) => buildNumberOf(b) - buildNumberOf(a))[0]
  if (newest === undefined) return null

  const parsed = cutFingerprintValues.safeParse(newest.values)
  if (!parsed.success) {
    throw new Error(
      `the newest \`${MOBILE_CUT_PAGE_TYPE_SLUG}\` for ${appSlug} (${newest.at}) carries no readable fingerprint: ${parsed.error.message}`
    )
  }
  return {
    buildNumber: parsed.data["build-number"],
    mainSha: parsed.data["main-sha"],
    shellSha: parsed.data["shell-sha"] ?? null,
    buildInputTreeHash: parsed.data["build-input-tree-hash"] ?? null,
    cutAt: parsed.data["cut-at"],
  }
}
