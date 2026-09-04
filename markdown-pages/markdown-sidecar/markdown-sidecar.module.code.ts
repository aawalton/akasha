import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"

/**
 * The two kinds of page a file can stand beside.
 *
 * A page is a markdown file under `pages/` or a TypeScript file under `akasha/`, and what stands
 * beside either one is named by dropping the page's own extension and putting parts back on. Every
 * shape below is that one rule; only the tail differs. This file asked the markdown half of it
 * alone, so `sidecarsOf` answered `[]` for every akasha page — including the 69 `.uncommitted.ts`
 * and 9 `.sops.yaml` files that stand beside one today — and `ops rm` and `ops mv` left them where
 * they were while reporting nothing, against `rm`'s own promise that a page's own files go with it.
 */
const MARKDOWN = ".md"

const AKASHA = ".ts"

const EITHER = [MARKDOWN, AKASHA] as const

/**
 * A tail a file standing beside a page carries, and the kinds of page it can be carried by.
 *
 * Most tails are the same on both sides: `besideAt` in `page-file-name.module.code.ts` builds a
 * property's file and a sops file for an akasha page exactly as the markdown rule builds them, and
 * `attachmentFileOf` builds one attachment name for both. The uncommitted file is the one tail that
 * differs — `uncommittedAt` names `.uncommitted.ts` for an akasha page and this repo's markdown
 * store writes `.uncommitted.yaml` — so each is carried by the one kind that has it.
 */
type Shape = {
  readonly named: RegExp
  readonly kinds: readonly string[]
}

const SHAPES: readonly Shape[] = [
  { named: /^(.*)\.[a-z0-9-]+\.uncommitted\.attachment\.[a-z0-9]+$/, kinds: EITHER },
  { named: /^(.*)\.[a-z0-9-]+\.attachment\.[a-z0-9]+$/, kinds: EITHER },
  { named: /^(.*)\.[a-z0-9-]+\.part\d+\.uncommitted\.jsonl$/, kinds: EITHER },
  { named: /^(.*)\.[a-z0-9-]+\.uncommitted\.jsonl$/, kinds: EITHER },
  { named: /^(.*)\.[a-z0-9-]+\.part\d+\.jsonl$/, kinds: EITHER },
  { named: /^(.*)\.[a-z0-9-]+\.jsonl$/, kinds: EITHER },
  { named: /^(.*)\.uncommitted\.yaml$/, kinds: [MARKDOWN] },
  { named: /^(.*)\.uncommitted\.ts$/, kinds: [AKASHA] },
  { named: /^(.*)\.sops\.yaml$/, kinds: EITHER },
]

/** The page's own path with its extension taken off, for a page of either kind. */
function stemOfPage(pagePath: string): string | null {
  for (const suffix of EITHER) {
    if (pagePath.endsWith(suffix) && pagePath.length > suffix.length) {
      return pagePath.slice(0, -suffix.length)
    }
  }
  return null
}

/**
 * The pages a file stands beside — one path for each kind of page its tail can belong to.
 *
 * A sidecar's own name does not say which kind of page it belongs to, and it cannot:
 * `alan.seat.sops.yaml` is the sops file of `alan.seat.md` under `pages/` and of `alan.seat.ts`
 * under `akasha/` alike, because both kinds name it the same way. So both are answered and the
 * caller settles it against what is actually there. Where a tail belongs to one kind only, one path
 * comes back.
 */
export function pagesOfSidecar(relPath: string): readonly string[] {
  for (const shape of SHAPES) {
    const found = shape.named.exec(relPath)
    if (found === null || found[1] === "") continue
    return shape.kinds.map((suffix) => `${found[1] as string}${suffix}`)
  }
  return []
}

export function sidecarsOf(root: string, pagePath: string): readonly string[] {
  if (stemOfPage(pagePath) === null) return []
  const dir = dirname(pagePath)
  let names: readonly string[]
  try {
    names = readdirSync(dir === "." ? root : `${root}/${dir}`)
  } catch {
    return []
  }
  const beside: string[] = []
  for (const name of names) {
    const relPath = dir === "." ? name : join(dir, name)
    if (pagesOfSidecar(relPath).includes(pagePath)) beside.push(relPath)
  }
  return beside.sort()
}

/**
 * Where a file standing beside a page lands when that page moves.
 *
 * A path naming no page is REFUSED rather than answered. Taking a fixed `.md` off both ends meant an
 * akasha page's sessions file was answered `day-2026-03-06.daily-trackingssions.jsonl` — a name
 * built by slicing the wrong number of characters, which no check downstream would have caught.
 * Either end may be either kind, so a page moving from markdown to akasha carries its files across.
 */
export function sidecarCarriedTo(sidecarPath: string, from: string, to: string): string {
  const fromStem = stemOfPage(from)
  const toStem = stemOfPage(to)
  if (fromStem === null || toStem === null) {
    const said = fromStem === null ? from : to
    throw new Error(`a file stands beside a page, and '${said}' is not one`)
  }
  const suffix = basename(sidecarPath).slice(basename(fromStem).length)
  return `${toStem}${suffix}`
}

export function sidecarsBeside(root: string, paths: readonly string[]): readonly string[] {
  const named = new Set(paths)
  const beside = new Set<string>()
  for (const one of paths) {
    for (const each of sidecarsOf(root, one)) if (!named.has(each)) beside.add(each)
  }
  return [...beside].sort()
}
