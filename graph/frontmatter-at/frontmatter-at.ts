import { type Frontmatter, parseFrontmatter } from "../../page/frontmatter.ts"
import { textAt } from "../../page/text/text.ts"
import type { BuildContext, SaidName } from "../build-context/build-context.ts"

export const FRONTMATTER_SAID: SaidName = {
  name: "frontmatter",
  entry: "graph/frontmatter-at/frontmatter-at.ts",
}

type Block = {
  readonly present?: boolean
  readonly error?: string | null
  readonly lineCount?: number
  readonly fields?: Record<string, unknown>
}

function blockAt(root: string, key: string): Block | null {
  const text = textAt(root, key)
  if (text === null) return null
  const fm = parseFrontmatter(text)
  return {
    present: fm.present,
    error: fm.error,
    lineCount: fm.lineCount,
    fields: Object.fromEntries(fm.fields),
  }
}

export function frontmatterAt(ctx: BuildContext, repo: string, key: string): Frontmatter | null {
  const root = ctx.roots[repo]
  if (root === undefined) return null
  const held = ctx.said.of(FRONTMATTER_SAID, repo, key, () => blockAt(root, key))
  if (held === null || typeof held !== "object") return null
  const block = held as Block
  if (block.present !== true || (block.error ?? null) !== null) return null
  const fields = block.fields ?? {}
  return {
    present: true,
    fields: new Map(Object.entries(fields)),
    keys: Object.keys(fields),
    error: null,
    lineCount: block.lineCount ?? 0,
  }
}
