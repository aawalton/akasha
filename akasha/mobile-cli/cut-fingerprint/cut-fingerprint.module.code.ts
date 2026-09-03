import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { textOf } from "@akasha/pages-system/page-query-values"
import { PagesMissing, readFilePages } from "@tools/lib/file-pages"
import { writePage } from "@tools/lib/page-write"
import { z } from "zod"

export const MOBILE_CUT_PAGE_TYPE_SLUG = "mobile-cut"

export const CUT_WRITER = "akasha deploy"

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

export function cutPageNameFor(appSlug: string, buildNumber: number): string {
  return `${appSlug}-${buildNumber}`
}

export function cutPageValuesFor(
  appSlug: string,
  fp: CutFingerprint
): Readonly<Record<string, string | number>> {
  return {
    title: `${appSlug} cut build ${fp.buildNumber}`,
    "app-slug": appSlug,
    "build-number": fp.buildNumber,
    "main-sha": fp.mainSha,
    ...(fp.shellSha === null ? {} : { "shell-sha": fp.shellSha }),
    ...(fp.buildInputTreeHash === null ? {} : { "build-input-tree-hash": fp.buildInputTreeHash }),
    "cut-at": fp.cutAt,
  }
}

export async function recordCutFingerprint(appSlug: string, fp: CutFingerprint): Promise<void> {
  const name = cutPageNameFor(appSlug, fp.buildNumber)
  const written = writePage(
    resolveRoots(),
    MOBILE_CUT_PAGE_TYPE_SLUG,
    name,
    cutPageValuesFor(appSlug, fp),
    CUT_WRITER
  )
  if (written === null) {
    throw new Error(
      `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${name}\` was not written — no checkout root places the ` +
        `\`${MOBILE_CUT_PAGE_TYPE_SLUG}\` page type, so \`mobile cut-status\` would keep answering ` +
        `against the newest fingerprint already filed rather than against build ${fp.buildNumber}`
    )
  }
  if (written.commitError !== null) {
    throw new Error(
      `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${name}\` was left at ${written.relPath} with no commit ` +
        `taking it, so nothing is filed for build ${fp.buildNumber}: ${written.commitError}`
    )
  }
}

export const cutFingerprintValues = z.object({
  "build-number": z.coerce.number().int().positive(),
  "main-sha": z.string().min(1),
  "shell-sha": z.string().min(1).optional(),
  "build-input-tree-hash": z.string().min(1).optional(),
  "cut-at": z.string().min(1),
})

export function fingerprintOf(values: z.infer<typeof cutFingerprintValues>): CutFingerprint {
  return {
    buildNumber: values["build-number"],
    mainSha: values["main-sha"],
    shellSha: values["shell-sha"] ?? null,
    buildInputTreeHash: values["build-input-tree-hash"] ?? null,
    cutAt: values["cut-at"],
  }
}

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
  return fingerprintOf(parsed.data)
}
