import { basename, dirname, join } from "node:path"
import type { Listed } from "@akasha/indexes"
import { addressIn } from "@akasha/pages-system/page-address"
import { besideRenamed } from "../../../command-system/commands/move/renaming/move-renaming.module.code.ts"
import { MESSAGE, MESSAGE_FILE } from "../../write/write.command.code.ts"
import { FROM, TO } from "../arguing/refactor-arguing.module.code.ts"

const PAGE_TYPE = "page-type"

export type Pair = {
  readonly from: string
  readonly to: string
  readonly was: string
}

export type Asked = { readonly pair: Pair } | { readonly refused: string }

export function pairFor(
  named: string,
  now: string,
  listing: (pageTypeSlug: string, slug: string) => readonly Listed[]
): Asked {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    return {
      refused:
        `\`${named}\` names no page type — one slug is carried under many page types, so a page ` +
        "slug rename takes the page type and the slug parted by `/`",
    }
  }
  const pageTypeSlug = address.pageTypeSlug
  const slug = address.slug
  if (pageTypeSlug === PAGE_TYPE) {
    return {
      refused: `\`${named}\` names a page type, whose slug is renamed by \`rename ${PAGE_TYPE}\``,
    }
  }
  let listed: readonly Listed[]
  try {
    listed = listing(pageTypeSlug, slug)
  } catch (cause) {
    return { refused: cause instanceof Error ? cause.message : String(cause) }
  }
  const one = listed[0]
  if (one === undefined) return { refused: `no \`${pageTypeSlug}\` carries the slug \`${slug}\`` }
  if (listed.length > 1) {
    return {
      refused: `${listed.length} pages carry \`${named}\`, so which one to rename is unanswered`,
    }
  }
  const renaming = { id: one.id, was: slug, now, pageTypeSlug }
  const to = join(dirname(one.path), besideRenamed(basename(one.path), renaming))
  return { pair: { from: one.path, to, was: slug } }
}

export function passedOn(pair: Pair, now: string, rest: readonly string[]): readonly string[] {
  const said = [FROM, pair.from, TO, pair.to]
  for (let at = 0; at < rest.length; at = at + 1) {
    const one = rest[at]
    if (one === undefined) break
    if (one === FROM || one === TO) {
      at = at + 1
      continue
    }
    said.push(one)
  }
  if (said.includes(MESSAGE) || said.includes(MESSAGE_FILE)) return said
  return [...said, MESSAGE, `rename the page \`${pair.was}\` to \`${now}\``]
}
