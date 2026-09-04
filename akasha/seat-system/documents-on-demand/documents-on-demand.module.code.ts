import { readFileSync } from "node:fs"
import { fileStemOf } from "@akasha/file-page-identity"
import { diskFileTree } from "@akasha/markdown-pages/file-tree"
import { type Frontmatter, parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import { slugNamed } from "@akasha/markdown-pages/page-address"
import { domainKinds, domainKindTest } from "@akasha/markdown-pages/page-types"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { AKASHA, isDirty } from "@akasha/pages-system/checkout-roots"
import { listDocuments } from "../../checks/modules/check-view/check-view.module.code.ts"
import {
  DOMAIN_SLUG_KEY,
  type Documents,
} from "../../domain-system/domain-documents/domain-documents.module.code.ts"

export function documentsOnDemand(root: string): Documents {
  const parsed = new Map<string, Frontmatter | null>()
  let byStem: ReadonlyMap<string, readonly string[]> | null = null
  let bySlug: ReadonlyMap<string, string> | null = null
  let domainKind: ((relPath: string) => boolean) | null = null
  let kindAsked = false
  const read = (relPath: string): Frontmatter | null => {
    if (parsed.has(relPath)) return parsed.get(relPath) ?? null
    let held: Frontmatter | null = null
    try {
      held = parseFrontmatter(readFileSync(`${root}/${relPath}`, "utf8"))
    } catch {
      held = null
    }
    parsed.set(relPath, held)
    return held
  }
  const stems = (): ReadonlyMap<string, readonly string[]> => {
    if (byStem !== null) return byStem
    const out = new Map<string, string[]>()
    for (const at of listDocuments(root)) {
      if (isDirty(at)) continue
      const stem = fileStemOf(at)
      out.set(stem, [...(out.get(stem) ?? []), at])
    }
    byStem = out
    return out
  }
  const isDomain = (): ((relPath: string) => boolean) | null => {
    if (kindAsked) return domainKind
    kindAsked = true
    const types = registryOf(diskFileTree({ [AKASHA]: root }))
    if (domainKinds(types).size === 0) return domainKind
    domainKind = domainKindTest(types)
    return domainKind
  }
  const domainHere = (at: string): Frontmatter | null => {
    const held = read(at)
    if (held === null) return null
    const kind = isDomain()
    return kind === null || kind(at) ? held : null
  }
  const declared = (): ReadonlyMap<string, string> => {
    if (bySlug !== null) return bySlug
    const out = new Map<string, string>()
    for (const at of listDocuments(root)) {
      if (isDirty(at)) continue
      const held = domainHere(at)
      if (held === null) continue
      const slug = textField(held, DOMAIN_SLUG_KEY)
      if (slug !== null && !out.has(slug)) out.set(slug, at)
    }
    bySlug = out
    return out
  }
  return {
    frontmatterOf: read,
    domainAt: (named) => {
      const slug = slugNamed(named)
      for (const at of stems().get(slug) ?? []) {
        const held = domainHere(at)
        if (held !== null && textField(held, DOMAIN_SLUG_KEY) === slug) return at
      }
      return declared().get(slug) ?? null
    },
  }
}
