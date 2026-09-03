import { type Dirent, readdirSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { numberAt, slugAt, textAt, type Value, valueAt } from "@akasha/pages-system/page-value"
import { z } from "zod"

export const MOBILE_CUT_PAGE_TYPE_SLUG = "mobile-cut"

export const CUT_WRITER = "akasha deploy"

/** Every `mobile-cut` page stands in a folder of its own beneath this one, inside akasha. */
export const CUTS_FOLDER = "akasha/mobile-cli/mobile-cuts/pages"

const PAGE_SUFFIX = `.${MOBILE_CUT_PAGE_TYPE_SLUG}.ts`

/**
 * Raised where the cut pages cannot be read at all.
 *
 * Nothing catches this, and that is the point. A source that cannot be read must never be
 * answered as a source holding nothing. This module used to read the markdown pages under
 * `pages/mobile-cut`, and swallowed the "no such page type" refusal as an empty set: between
 * `c5fe126be1`, which took those markdown pages away, and `50c062b7e1`, which took their page
 * type away, every app read as owing a cut while six cuts stood for `alanwalton` alone.
 */
export class CutsUnread extends Error {
  readonly at: string
  constructor(at: string, why: string) {
    super(
      `the \`${MOBILE_CUT_PAGE_TYPE_SLUG}\` pages at ${at} went unread, so no cut can be called ` +
        `present or missing: ${why}`
    )
    this.name = "CutsUnread"
    this.at = at
  }
}

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

/** One `mobile-cut` page, as the page file itself declares it. */
export interface CutPage {
  readonly slug: string
  readonly path: string
  readonly value: Value
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

/** A cut page stands in a folder named for its slug, so that entry files can stand beside it. */
export function cutPagePath(slug: string): string {
  return `${CUTS_FOLDER}/${slug}/${slug}${PAGE_SUFFIX}`
}

function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function pathsUnder(root: string): readonly string[] {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(join(root, CUTS_FOLDER), { withFileTypes: true })
  } catch (why) {
    throw new CutsUnread(CUTS_FOLDER, why instanceof Error ? why.message : String(why))
  }
  const found: string[] = []
  for (const entry of entries) {
    if (entry.isDirectory()) found.push(cutPagePath(entry.name))
    else if (entry.name.endsWith(PAGE_SUFFIX)) found.push(`${CUTS_FOLDER}/${entry.name}`)
  }
  return found.sort()
}

/**
 * Every cut page standing inside akasha.
 *
 * A page that will not load raises rather than being left out, so that a fault in one cut is
 * never answered as that cut never having been taken.
 */
export function readCutPages(): readonly CutPage[] {
  const root = akashaRoot()
  const found: CutPage[] = []
  for (const path of pathsUnder(root)) {
    const value = valueAt(path, root)
    if (value === null) throw new CutsUnread(path, "the file declares no page value")
    const slug = textAt(value, "slug")
    if (slug === null) throw new CutsUnread(path, "the page names no slug")
    found.push({ slug, path, value })
  }
  return found
}

function cutPagesOf(appSlug: string): readonly CutPage[] {
  return readCutPages().filter((page) => slugAt(page.value, "appSlug") === appSlug)
}

export const cutFingerprintValues = z.object({
  buildNumber: z.coerce.number().int().positive(),
  mainSha: z.string().min(1),
  shellSha: z.string().min(1).optional(),
  buildInputTreeHash: z.string().min(1).optional(),
  cutAt: z.string().min(1),
})

export function fingerprintOf(values: z.infer<typeof cutFingerprintValues>): CutFingerprint {
  return {
    buildNumber: values.buildNumber,
    mainSha: values.mainSha,
    shellSha: values.shellSha ?? null,
    buildInputTreeHash: values.buildInputTreeHash ?? null,
    cutAt: values.cutAt,
  }
}

/** The body of the page one taken cut is remembered by. A TypeScript page mints its own id. */
export function cutPageBody(appSlug: string, fp: CutFingerprint): string {
  const slug = cutPageNameFor(appSlug, fp.buildNumber)
  return [
    `import type { MobileCut } from "../../${MOBILE_CUT_PAGE_TYPE_SLUG}.page-type.ts"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    `  id: "${Bun.randomUUIDv7()}",`,
    `  pageTypeSlug: "${MOBILE_CUT_PAGE_TYPE_SLUG}",`,
    `  slug: "${slug}",`,
    `  title: ${JSON.stringify(`${appSlug} cut build ${fp.buildNumber}`)},`,
    `  appSlug: ${JSON.stringify(appSlug)},`,
    `  buildNumber: ${fp.buildNumber},`,
    `  mainSha: ${JSON.stringify(fp.mainSha)},`,
    ...(fp.shellSha === null ? [] : [`  shellSha: ${JSON.stringify(fp.shellSha)},`]),
    ...(fp.buildInputTreeHash === null
      ? []
      : [`  buildInputTreeHash: ${JSON.stringify(fp.buildInputTreeHash)},`]),
    `  cutAt: ${JSON.stringify(fp.cutAt)},`,
    `} as const satisfies MobileCut`,
    "",
  ].join("\n")
}

export async function recordCutFingerprint(appSlug: string, fp: CutFingerprint): Promise<void> {
  const slug = cutPageNameFor(appSlug, fp.buildNumber)
  const path = cutPagePath(slug)
  const root = akashaRoot()
  const said = landedMechanically(
    root,
    CUT_WRITER,
    [{ path, body: new TextEncoder().encode(cutPageBody(appSlug, fp)) }],
    `record the ${appSlug} cut for build ${fp.buildNumber}`
  )
  const why = said.refusals.length > 0 ? said.refusals.join("\n") : said.report.join("\n")
  if (said.code !== 0) {
    throw new Error(
      `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${slug}\` was not filed, so \`mobile cut-status\` would keep ` +
        `answering against the newest fingerprint already filed rather than against build ` +
        `${fp.buildNumber}: ${why}`
    )
  }
  if (valueAt(path, root) === null) {
    throw new Error(
      `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${slug}\` reported as landed at ${path}, but nothing there ` +
        `declares a page value, so nothing is filed for build ${fp.buildNumber}: ${why}`
    )
  }
  return Promise.resolve()
}

function buildNumberOf(page: CutPage): number {
  return numberAt(page.value, "buildNumber") ?? Number.NEGATIVE_INFINITY
}

export async function readLatestCutFingerprint(appSlug: string): Promise<CutFingerprint | null> {
  const newest = [...cutPagesOf(appSlug)].sort((a, b) => buildNumberOf(b) - buildNumberOf(a))[0]
  if (newest === undefined) return null

  const parsed = cutFingerprintValues.safeParse(newest.value)
  if (!parsed.success) {
    throw new Error(
      `the newest \`${MOBILE_CUT_PAGE_TYPE_SLUG}\` for ${appSlug} (${newest.path}) carries no ` +
        `readable fingerprint: ${parsed.error.message}`
    )
  }
  return Promise.resolve(fingerprintOf(parsed.data))
}
