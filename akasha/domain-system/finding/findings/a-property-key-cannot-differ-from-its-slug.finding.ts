import type { Finding } from "../finding.page-type.ts"

export const aPropertyKeyCannotDifferFromItsSlug = {
  id: "01a05433-f109-7cea-a649-fe9c6f49dd12",
  pageTypeSlug: "finding",
  slug: "a-property-key-cannot-differ-from-its-slug",
  domainSlug: "domain/pages-system",
  claim:
    "A property states both a slug and a propertySlug so that the two may differ, and the index files them apart, but a page carrying its value under a propertySlug that differs is refused. So a property's key is in practice its slug camelised, and a slug long enough to stand alone across a page type is the key every page of that type must carry.",
  evidence:
    "`page-matches-its-type.check.code.ts` works the key it expects out of the declaration's slug, as `slug.replace(/-([a-z0-9])/g, ...)`, and never reads the property page's `propertySlug`; `slugFor(key)` inverts the same assumption when judging what a page states. `index-schema.index.code.ts` files `propertySlug` faithfully, so the index and the check disagree about what a page carries. Three properties already split: `proxy-port`/`port`, `proxy-process`/`process` and `proxy-version`/`version`, all sub-properties of `proxy` on `seat`. None has ever been exercised, because no `.seat.ts` page stands. Found landing `person-access` and `person-authority`, whose seven properties were given slugs qualified by their page type and short keys; all 25 pages were refused, each with `states `personSlug`, which `page-type/person-authority` does not declare` beside `does not state `person-authority-person-slug``. They landed with each key equal to its slug instead, so a page reads `personAccessPersonSlug` where `personSlug` was meant.",
} as const satisfies Finding
