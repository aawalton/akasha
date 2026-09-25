import { pageTypesFor } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { spelledIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import {
  type Facing,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  pageNamed,
  uncommittedHeld,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { lowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"

const SAID =
  "a page is reached by importing that page and reading its slug, which a rename carries; a plain string is followed by nothing"

export type Judging = {
  readonly pageTypes: ReadonlySet<string>
  readonly generated: (path: string) => boolean
  readonly listed: (pageTypeSlug: string, slug: string) => boolean
}

type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

function judgedAt(judging: Judging, path: string): boolean {
  if (pageNamed(path, judging.pageTypes)) return false
  if (uncommittedHeld(path)) return false
  return !judging.generated(path)
}

export function addressed(pageTypes: ReadonlySet<string>, text: string): Named | null {
  const said = addressIn(text)
  if (said.kind === "id" || said.kind === "bare") return null
  if (!pageTypes.has(said.pageTypeSlug) || !lowerKebabCase(said.slug)) return null
  if (said.kind === "scoped" && !lowerKebabCase(said.scope)) return null
  return { pageTypeSlug: said.pageTypeSlug, slug: said.slug }
}

export function found(judging: Judging, path: string, text: string): readonly string[] {
  if (!judgedAt(judging, path)) return []
  const said: string[] = []
  for (const one of spelledIn(path, text)) {
    const named = addressed(judging.pageTypes, one.text)
    if (named === null) continue
    if (!judging.listed(named.pageTypeSlug, named.slug)) continue
    said.push(`\`${one.text}\` spells a page's address as a plain string — ${SAID}`)
  }
  return said
}

function facingIn(shadow: Shadow): Facing {
  const index = shadow.index
  return {
    kindsUnder: (of) => index.kindsUnder(of),
    everyOfType: (kind) => index.everyOfType(kind),
    valueAt: (path) => index.pageByPath(path),
    carryingOf: (named) => index.carryingOf(named),
    root: shadow.root,
  }
}

export const judgingFor = heldPerShadow((shadow: Shadow): Judging => {
  const facing = facingIn(shadow)
  return {
    pageTypes: pageTypesFor(shadow),
    generated: (path) => generatedIn(facing, path),
    listed: (pageTypeSlug, slug) => shadow.index.listedAt(pageTypeSlug, slug).length > 0,
  }
})
