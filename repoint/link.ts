import { dirOf, relativeBetween, resolves } from "@akasha/code-system/code-path-between"
import { fileStemOf } from "@akasha/file-page-identity"
import { proseOnly } from "@akasha/markdown-pages/prose"
import type { Patch } from "./mention.ts"

const LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g

function retarget(
  href: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>
): string | null {
  const absolute = resolves(href, hostBefore)
  if (absolute === null) return null
  const cut = href.search(/[#?]/)
  const pathPart = cut === -1 ? href : href.slice(0, cut)
  const target = moved.get(absolute)
  if (target === undefined && hostBefore === hostAfter) return null
  const next = pathPart.startsWith("/")
    ? (target ?? absolute)
    : relativeBetween(dirOf(hostAfter), target ?? absolute)
  return next === pathPart ? null : next + (cut === -1 ? "" : href.slice(cut))
}

export function linkPatches(
  body: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>,
  taken: ReadonlySet<string>
): readonly Patch[] {
  const projected = proseOnly(body).split("\n")
  const patches: Patch[] = []
  let offset = 0
  body.split("\n").forEach((line, index) => {
    const prose = projected[index]
    if (prose !== undefined && prose.length === line.length) {
      for (const match of prose.matchAll(LINK_RE)) {
        const label = match[1] ?? ""
        const href = match[2] ?? ""
        const at = offset + (match.index ?? 0)
        const hrefAt = at + label.length + 3
        const next = retarget(href, hostBefore, hostAfter, moved)
        const mark = next === null ? -1 : next.search(/[#?]/)
        const bare = next === null ? "" : mark === -1 ? next : next.slice(0, mark)
        const spelled = next !== null && taken.has(bare) ? `./${next}` : next
        if (spelled !== null && spelled !== href) {
          patches.push({ start: hrefAt, end: hrefAt + href.length, text: spelled, was: href })
        }
        const target = resolves(href, hostBefore)
        const lands = target === null ? undefined : moved.get(target)
        if (lands === undefined || target === null) continue
        const named = fileStemOf(target)
        if (label !== named || fileStemOf(lands) === named) continue
        patches.push({
          start: at + 1,
          end: at + 1 + label.length,
          text: fileStemOf(lands),
          was: label,
        })
      }
    }
    offset += line.length + 1
  })
  return patches
}
