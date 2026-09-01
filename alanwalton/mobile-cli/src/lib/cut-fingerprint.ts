import { askComposed } from "@shared/pages-query/ask"
import { z } from "zod"

export const MOBILE_CUT_PAGE_TYPE_SLUG = "mobile-cut"

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

// NO CUT HAS BEEN WRITTEN DOWN SINCE THE STORE STOPPED TAKING KEYED WRITES. A cut was filed with
// `writePage`, which refuses unconditionally, so this threw on every upload. `ops mobile
// deploy-testflight` catches the throw and prints the warning at
// `tools/lib/mobile-testflight-cut.ts:222` — the upload really does succeed, and only the record
// of it is lost.
//
// The consequence is one-sided and worth stating plainly, because the reading half below still
// works: `ops mobile cut-status` asks a page type nothing can write anymore, so it answers against
// the last fingerprint filed before the writes died. That warning calls the staleness temporary
// ("until re-recorded"); it is not. Every `cut-status` since compares today's tree against a
// fingerprint that will not move, so it reports a cut owed and keeps reporting one.
const NO_KEYED_WRITE =
  "the page store refuses every keyed write, so a cut cannot be filed against its build"

export async function recordCutFingerprint(appSlug: string, fp: CutFingerprint): Promise<void> {
  const name = `${appSlug}-${fp.buildNumber}`
  throw new Error(
    `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${name}\` was not written — ${NO_KEYED_WRITE}. ` +
      `\`ops mobile cut-status\` reads this page type and will keep answering against the last ` +
      `fingerprint filed before the writes died, rather than against build ${fp.buildNumber}`
  )
}

const cutFingerprintValuesSchema = z.object({
  "build-number": z.coerce.number().int().positive(),
  "main-sha": z.string().min(1),
  "shell-sha": z.string().min(1).optional(),
  "build-input-tree-hash": z.string().min(1).optional(),
  "cut-at": z.string().min(1),
})

export async function readLatestCutFingerprint(appSlug: string): Promise<CutFingerprint | null> {
  const asked = await askComposed({
    "page-type": MOBILE_CUT_PAGE_TYPE_SLUG,
    where: { "app-slug": { is: appSlug } },
    "sort-by": "build-number",
    descending: true,
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`\`${MOBILE_CUT_PAGE_TYPE_SLUG}\` went unread: ${asked.why}`)
  }

  const newest = asked.answer.rows[0]
  if (newest === undefined) return null
  const parsed = cutFingerprintValuesSchema.safeParse(newest.values)
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
