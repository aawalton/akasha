import { isAttachmentFile } from "../../../page/attachment-file.ts"
import { claimant, type PageType, placesOf, reposOf } from "../../../page/page-types.ts"
import { globFor } from "../../../page/glob/glob.ts"
import type { FileTree } from "../../../page/file-tree.ts"
import { compiledPageTypeFor, vocabularyFor } from "../../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../../page/property/judge.ts"
import { registryOf } from "../../../page/property/registry.ts"
import { aboveOf, shapeFor } from "../../../page/shape/chain.ts"
import { hold } from "../../../page/shape/shape.ts"
import { partOutsideShape } from "../../../page/shape/words.ts"
import { isRowsFile } from "../../../page/rows-file.ts"
import { locate } from "../../../repo/roots/roots.ts"
import { refusalText } from "../../../refusal/refusal.ts"
import type { Check, CheckFailure } from "../check-shape.ts"
import { rowsHeldBy, rowsOutside } from "./rows.ts"
import { treeOver } from "./staged-tree.ts"

const MARKDOWN = ".md"

const ROWS = ".jsonl"

function outsideShape(relPath: string, body: string, type: PageType, tree: FileTree): readonly string[] {
  const shape = shapeFor(type, tree)
  if (shape.compiled === null) return []
  const { above } = aboveOf(relPath, body, tree)
  if (above === null) return []
  const verdict = hold(shape, relPath, body, above)
  if (verdict.ok) return []
  return verdict.refusals.map((one) => partOutsideShape(one, `line ${one.span.start.line}`))
}

/**
 * The keys nothing here could judge, said to the writer rather than counted somewhere else.
 *
 * A KEY NOTHING JUDGED READS EXACTLY LIKE A KEY THAT WAS JUDGED AND HELD, which is why this is a
 * refusal rather than a number. `unjudged` names the keys whose type rule could not be armed. The
 * keys whose value stands beside the page or in its sops file are `elsewhere` instead, judged
 * where they stand, so nothing here is missing for them and they are not reported.
 *
 * WHERE NOTHING NAMED THE TYPES AT ALL, EVERY KEY IS UNJUDGED AND NO ONE OF THEM IS THE FAULT.
 * An unread vocabulary would otherwise reach the writer as a refusal per key on every page the
 * write touches, each naming its key rather than the one thing that went wrong. That is a fault
 * about the whole tree, so it is left to the checks that weigh the whole tree.
 */
function unjudgedHere(unjudged: readonly string[], tree: FileTree): readonly string[] {
  if (unjudged.length === 0 || vocabularyFor(tree).why !== null) return []
  return unjudged.map(
    (one) =>
      `nothing here could judge ${one}. A key admitted because nothing judged it reads exactly ` +
      `like a key that was judged and held.`
  )
}

function outsideProperties(body: string, type: PageType, tree: FileTree): readonly string[] {
  const held = compiledPageTypeFor(type, tree)
  const { properties } = held
  if (properties === null || properties.length === 0) return []
  const verdict = judgeFrontmatter(body, type.slug, properties, null, held)
  if (verdict.why !== null) return [verdict.why]
  return [...verdict.refusals, ...unjudgedHere(verdict.unjudged, tree)]
}

function claimedElsewhere(
  relPath: string,
  repo: string,
  types: readonly PageType[]
): readonly string[] {
  if (isAttachmentFile(relPath) || isRowsFile(relPath)) return []
  const found: string[] = []
  for (const one of types) {
    const claimed = reposOf(one)
    if (claimed.length === 0 || claimed.includes(repo)) continue
    const glob = placesOf(one).find((each) => globFor(each).match(relPath))
    if (glob === undefined) continue
    found.push(
      refusalText("claimed-by-another-repo", {
        path: relPath,
        type: one.slug,
        claimed: claimed.join(", "),
        glob,
        addressed: repo,
      })
    )
  }
  return found
}

export const pageHoldsToItsType: Check = {
  slug: "page-holds-to-its-type",
  needs: "tree",
  run: (batch) => {
    const judged = batch.paths.filter((one) => one.endsWith(MARKDOWN) || one.endsWith(ROWS))
    if (judged.length === 0) return []
    const tree = treeOver(batch)
    if (tree === null) return []
    const types = registryOf(tree)
    if (types.length === 0) return []
    const failures: CheckFailure[] = []
    for (const path of judged) {
      const body = batch.tree.at(path)
      if (body === null) continue
      const at = locate(path)
      if (at === null) continue
      const text = body.toString("utf8")
      if (path.endsWith(ROWS)) {
        const { slug, properties, unheld } = rowsHeldBy(at.relPath, types, tree)
        // A SIDECAR NOTHING SETTLES A TYPE FOR IS REPORTED, NOT WALKED PAST. `unheld` is null only
        // where the path is no rows sidecar at all, which is the one case there is nothing to say.
        if (slug === null) {
          if (unheld !== null) failures.push({ path, reason: unheld })
          continue
        }
        for (const reason of rowsOutside(text, slug, properties)) failures.push({ path, reason })
        continue
      }
      const type = claimant(at.relPath, types).type
      if (type === null) {
        for (const reason of claimedElsewhere(at.relPath, at.repo, types)) failures.push({ path, reason })
        continue
      }
      for (const reason of outsideShape(at.relPath, text, type, tree)) failures.push({ path, reason })
      for (const reason of outsideProperties(text, type, tree)) failures.push({ path, reason })
    }
    return failures
  },
}

export default pageHoldsToItsType
