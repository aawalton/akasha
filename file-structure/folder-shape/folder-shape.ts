import { type BuildContext, KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import { frontmatterAt } from "../../graph/frontmatter-at/frontmatter-at.ts"
import { nameOf, pageIndexIn, pagesOfType } from "../../graph/page-index/page-index.ts"
import type { PageAt } from "../../page/page.ts"
import { AKASHA, akashaRoot } from "../../repo/roots/roots.ts"

const PAGE_TYPE = "folder-shape"

const CHECK_PAGE_TYPE = "check"

const CHECK_SLUG = "check-slug"

export const HYPOTHESIS = "hypothesis"

export const CODED = "coded"

export const ENFORCED = "enforced"

export type FolderShapeStatus = typeof HYPOTHESIS | typeof CODED | typeof ENFORCED

function checkNamedBy(ctx: BuildContext, at: PageAt): PageAt | null {
  const fm = frontmatterAt(ctx, at.repo, at.key)
  if (fm === null) {
    throw new Error(
      `${at.key} is a folder shape page and nothing at that path reads as frontmatter, so the check ` +
        "it names cannot be known. Where the path is right and the file is not, the tree is " +
        "mid-repair; where the file is right, write the page index again with `ops index refresh`"
    )
  }
  const said = fm.fields.get(CHECK_SLUG)
  if (typeof said !== "string" || said.trim() === "") return null
  const found = pageIndexIn(ctx).byName.get(nameOf(CHECK_PAGE_TYPE, said.trim()))
  return found === undefined || found.length === 0 ? null : (found[0] as PageAt)
}

export function statusOf(ctx: BuildContext, at: PageAt): FolderShapeStatus {
  return checkNamedBy(ctx, at) === null ? HYPOTHESIS : CODED
}

export function statusesOver(ctx: BuildContext): ReadonlyMap<string, FolderShapeStatus> {
  const made = new Map<string, FolderShapeStatus>()
  const pages = [...pagesOfType(ctx, PAGE_TYPE)].sort((one, two) => (one.stem < two.stem ? -1 : 1))
  for (const at of pages) made.set(at.stem, statusOf(ctx, at))
  return made
}

export function statusesIn(root: string = akashaRoot()): ReadonlyMap<string, FolderShapeStatus> {
  return statusesOver({ roots: { [AKASHA]: root }, said: KEEPS_NOTHING })
}

const HELD = new Map<string, ReadonlyMap<string, FolderShapeStatus>>()

export function statusOfShape(slug: string, root: string = akashaRoot()): FolderShapeStatus {
  const held = HELD.get(root) ?? statusesIn(root)
  HELD.set(root, held)
  return held.get(slug) ?? HYPOTHESIS
}
