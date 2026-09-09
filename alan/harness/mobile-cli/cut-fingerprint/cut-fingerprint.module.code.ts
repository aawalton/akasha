import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { everyOfType } from "@akasha/pages/index-reading"
import { exportedAs } from "@akasha/pages/page-export-name"
import { numberAt, slugAt, textAt, type Value, valueAt } from "@akasha/pages/page-value"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { z } from "zod"

export const MOBILE_CUT_PAGE_TYPE_SLUG = "mobile-cut"

const PUT = "change-mechanical-file/add-file"

const PAGE_SUFFIX = `.${MOBILE_CUT_PAGE_TYPE_SLUG}.ts`

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

function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function pathsUnder(root: string): readonly string[] {
  return everyOfType(root, MOBILE_CUT_PAGE_TYPE_SLUG).map((listed) => listed.path)
}

export function cutsFolder(): string {
  const one = pathsUnder(akashaRoot())[0]
  if (one === undefined) {
    throw new Error(
      `no \`${MOBILE_CUT_PAGE_TYPE_SLUG}\` page is filed, so nothing says which folder the cuts ` +
        `are filed in`
    )
  }
  return one.split("/").slice(0, -2).join("/")
}

export function cutPagePath(slug: string): string {
  return `${cutsFolder()}/${slug}/${slug}${PAGE_SUFFIX}`
}

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
  return readCutPages().filter((page) => slugAt(page.value, "app") === appSlug)
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

export function cutPageBody(appSlug: string, fp: CutFingerprint): string {
  const slug = cutPageNameFor(appSlug, fp.buildNumber)
  return [
    `import type { MobileCut } from "../../${MOBILE_CUT_PAGE_TYPE_SLUG}.page-type.types.ts"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    `  id: "${Bun.randomUUIDv7()}",`,
    `  pageTypeSlug: "${MOBILE_CUT_PAGE_TYPE_SLUG}",`,
    `  type: "${MOBILE_CUT_PAGE_TYPE_SLUG}",`,
    `  slug: "${slug}",`,
    `  title: ${JSON.stringify(`${appSlug} cut build ${fp.buildNumber}`)},`,
    `  app: ${JSON.stringify(appSlug)},`,
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
  const said = await runMechanicalChange(
    root,
    [{ at: PUT, given: { at: path, body: cutPageBody(appSlug, fp) } }],
    `record the ${appSlug} cut for build ${fp.buildNumber}`
  )
  const wrong = "refusals" in said ? said.refusals : said.wrong
  if (wrong.length > 0) {
    throw new Error(
      `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${slug}\` was not filed, so \`mobile cut-status\` would keep ` +
        `answering against the newest fingerprint already filed rather than against build ` +
        `${fp.buildNumber}: ${wrong.join("\n")}`
    )
  }
  if (valueAt(path, root) === null) {
    throw new Error(
      `\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${slug}\` reported as landed at ${path}, but nothing there ` +
        `declares a page value, so nothing is filed for build ${fp.buildNumber}`
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
