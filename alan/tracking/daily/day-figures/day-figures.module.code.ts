import { exportedAs } from "@akasha/pages-system/page-export-name"
import {
  type Barred,
  type Declared,
  FORMULA,
  type Working,
  workingOver,
} from "@akasha/pages-system/page-formulas"

export type Stated = {
  readonly slug: string
  readonly propertySlug?: string
  readonly formula?: string
  readonly holds?: string
}

export type Carried = {
  readonly pagePropertySlug: string
  readonly many: boolean
}

export type Declaring = {
  readonly partSlugs: readonly string[]
  readonly properties?: readonly Carried[]
}

export function declaredFrom(pageType: Declaring, stated: readonly Stated[]): readonly Declared[] {
  const said = new Map(stated.map((one) => [one.slug, one]))
  const many = new Map((pageType.properties ?? []).map((one) => [one.pagePropertySlug, one.many]))
  const declared: Declared[] = []
  for (const part of pageType.partSlugs) {
    const at = part.indexOf("/")
    if (at < 0) throw new Error(`\`${part}\` names no sort of property, so its kind is unknown`)
    const sort = part.slice(0, at)
    const slug = part.slice(at + 1)
    const one = said.get(slug)
    const propertySlug = one?.propertySlug ?? slug
    declared.push({
      slug: propertySlug,
      key: exportedAs(propertySlug),
      sort,
      many: many.get(slug) === true,
      formula: one?.formula ?? null,
      holds: one?.holds ?? null,
    })
  }
  return declared
}

export function figuresIn(pageType: Declaring, stated: readonly Stated[]): Working | Barred {
  const declared = declaredFrom(pageType, stated)
  const working = workingOver("wake-day", declared)
  if (working !== null) return working
  return {
    barred: `no part of this page type is a \`${FORMULA}\`, so there is no figure to judge`,
    keys: [],
  }
}
