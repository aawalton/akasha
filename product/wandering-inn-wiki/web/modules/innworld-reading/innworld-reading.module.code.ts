import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"

const PAGE_TYPE = "page-type"

const VIEW = "view"

const TYPES_AT_ONCE = 500

const UNNAMED: readonly string[] = [PAGE_TYPE, VIEW]

export type ShownType = {
  readonly slug: string
  readonly name: string
  readonly definition: string | null
}

export async function shownTypesRead(): Promise<readonly ShownType[]> {
  const { rows } = await getPages({
    pageTypeSlug: PAGE_TYPE,
    select: ["id", "slug", "definition", "pluralSlug"],
    limit: TYPES_AT_ONCE,
  })
  const held: ShownType[] = []
  for (const one of rows) {
    const slug = textIn(one["slug"])
    if (slug === null || UNNAMED.includes(slug)) continue
    held.push({
      slug,
      name: titledAs(textIn(one["pluralSlug"]) ?? slug),
      definition: textIn(one["definition"]),
    })
  }
  return held.sort((one, two) => (one.name < two.name ? -1 : 1))
}
