import type { FileTree } from "../file-tree.ts"
import { chainOf } from "../property/frontmatter.ts"
import { shapeOf, type Forebear, type Shape } from "./shape.ts"
import { globsIn, matchesAny, PAGE_BODY_SHAPE_GLOBS, PAGE_TYPE_GLOBS, pageTypeAt, type PageType } from "../page-types.ts"
import { NONE, blockOf, stringAt } from "../text/text.ts"
import { pageStemOf } from "../name/name.ts"

export const BODY_SHAPE_KEY = "body-shape-slug"

export interface Above {
  readonly above: readonly Forebear[] | null
  readonly why: string | null
}

const no = (why: string | null): Shape => ({
  compiled: null,
  why,
  pagesDeclareShapes: false,
  pagesHoldFreeText: false,
  bindsHoles: false,
})

function opened(relPaths: readonly string[], tree: FileTree): Above {
  const above: Forebear[] = []
  for (const relPath of relPaths) {
    const text = tree.open(relPath)
    if (text === null) return { above: null, why: `\`${relPath}\` is not in the repo this call would produce` }
    above.push({ relPath, text })
  }
  return { above, why: null }
}

export function aboveOf(relPath: string, text: string, tree: FileTree): Above {
  if (!matchesAny(relPath, globsIn(tree.roots, PAGE_TYPE_GLOBS))) return { above: [], why: null }
  const type = pageTypeAt(relPath, text)
  if (type === null) return { above: [], why: null }
  const { relPaths, why } = chainOf(type, tree)
  if (relPaths === null) return { above: null, why }
  return opened(relPaths.slice(1), tree)
}

function shapeAt(slug: string, tree: FileTree): string | null {
  for (const relPath of tree.paths(globsIn(tree.roots, PAGE_BODY_SHAPE_GLOBS))) if (pageStemOf(relPath) === slug) return relPath
  return null
}

function shapeChain(from: string, tree: FileTree): { relPaths: readonly string[] | null; why: string | null } {
  const relPaths: string[] = []
  const seen = new Set<string>()
  let at = from
  for (;;) {
    if (seen.has(at))
      return { relPaths: null, why: `the \`extends-slug\` chain above \`${pageStemOf(from)}\` returns to \`${pageStemOf(at)}\`` }
    seen.add(at)
    relPaths.push(at)
    const text = tree.open(at)
    if (text === null) return { relPaths: null, why: `\`${at}\` is not in the repo this call would produce` }
    const { fm, why } = blockOf(text)
    if (why !== null) return { relPaths: null, why: `\`${at}\` — ${why}` }
    const above = stringAt(fm, "extends-slug")
    if (above === null)
      return { relPaths: null, why: `\`${at}\` declares no \`extends-slug\`, so what it extends is unstated` }
    if (above === NONE) return { relPaths, why: null }
    const next = shapeAt(above, tree)
    if (next === null)
      return { relPaths: null, why: `\`${at}\` extends \`${above}\`, which is the slug of no body shape here` }
    at = next
  }
}

function shapeStated(type: PageType, slug: string, tree: FileTree): Shape {
  const at = shapeAt(slug, tree)
  if (at === null)
    return no(`\`${type.relPath}\` states \`${BODY_SHAPE_KEY}: ${slug}\`, which is the slug of no body shape here`)
  const { relPaths, why } = shapeChain(at, tree)
  if (relPaths === null) return no(why)
  const { above, why: unopened } = opened(relPaths.slice(1), tree)
  if (above === null) return no(unopened)
  const text = tree.open(at)
  if (text === null) return no(`\`${at}\` is not in the repo this call would produce`)
  return shapeOf(type.slug, at, text, above)
}

function shapeWorkedOut(type: PageType, tree: FileTree): Shape {
  const text = tree.open(type.relPath)
  if (text === null) return no(`\`${type.relPath}\` is not in the repo this call would produce`)
  const { fm, why: unread } = blockOf(text)
  if (unread !== null) return no(`\`${type.relPath}\` — ${unread}`)
  const stated = stringAt(fm, BODY_SHAPE_KEY)
  if (stated === null || stated === NONE)
    return no(`\`${type.relPath}\` states no \`${BODY_SHAPE_KEY}\`, so nothing says what a body of this kind may hold`)
  return shapeStated(type, stated, tree)
}

const shapes = new WeakMap<FileTree, Map<string, Shape>>()

/**
 * The shape the bodies of one page type are held to.
 *
 * WORKING ONE OUT WALKS THE WHOLE TREE. `shapeAt` turns a body-shape slug into a file by scanning
 * every path the tree holds, and `shapeChain` scans again for each `extends-slug` above it, so one
 * shape costs several passes over ninety thousand paths — twenty-four milliseconds measured here.
 * The answer depends on the type and the tree and on nothing else, yet `page-holds-to-its-type`
 * asked for one per page: fifty-nine thousand pages carry a page type and three hundred and one
 * distinct shapes answer for all of them, which is twenty-four minutes spent to learn the same
 * three hundred and one things over and over. That is why an audit of that check never returned.
 *
 * HELD AGAINST THE TREE OBJECT, NOT A NAME FOR IT. A gate and an audit run against different trees
 * inside one call, and a staged tree carries bodies that stand on no disk, so no mark names one; the
 * object is the only identity a tree has. An entry therefore cannot outlive the tree it was worked
 * out against, and the tree is the only thing that could change the answer. The type is keyed by
 * both its path and its slug because `shapeOf` is handed the slug and reads the file at the path.
 */
export function shapeFor(type: PageType, tree: FileTree): Shape {
  let held = shapes.get(tree)
  if (held === undefined) {
    held = new Map<string, Shape>()
    shapes.set(tree, held)
  }
  const key = `${type.relPath}\n${type.slug}`
  const standing = held.get(key)
  if (standing !== undefined) return standing
  const made = shapeWorkedOut(type, tree)
  held.set(key, made)
  return made
}
