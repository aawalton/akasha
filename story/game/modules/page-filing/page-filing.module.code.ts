import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { bodyOf, importedFrom } from "akasha/page/modules/body/page-body.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const HERE = "story/game/modules/page-filing"
const TS = "ts"
const TYPES = "types"
const TYPE = "type"
const SLUG = "slug"

export type Filed = { readonly at: string; readonly body: string }

export type Filing = {
  readonly root: string
  readonly folder: string
  readonly pageTypeSlug: string
  readonly plural: string
  readonly slug: string
  readonly keys: readonly string[]
  readonly values: Record<string, unknown>
}

export type Composed = { readonly answered: Filed } | { readonly refused: string }

export function typesAt(root: string, pageTypeSlug: string): string | null {
  const listed = listedAt(root, pageType.slug, pageTypeSlug)[0]
  if (listed === undefined) return null
  return besideAt(listed.path, TYPES, TS)
}

export function filedAt(filing: Filing): Composed {
  const types = typesAt(filing.root, filing.pageTypeSlug)
  if (types === null) {
    return { refused: `\`${filing.pageTypeSlug}\` is no page type here, ${HERE}` }
  }
  const body = bodyOf({
    pageTypeSlug: filing.pageTypeSlug,
    slug: filing.slug,
    importFrom: importedFrom(types),
    keys: [TYPE, SLUG, ...filing.keys],
    values: {
      ...filing.values,
      [TYPE]: namedAs(pageType.slug, filing.pageTypeSlug, null),
      [SLUG]: filing.slug,
    },
  })
  const named = `${filing.slug}.${filing.pageTypeSlug}.${TS}`
  return { answered: { at: join(filing.folder, filing.plural, named), body } }
}
