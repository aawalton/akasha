import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"

const PAGE_TYPE = "page-type"

const TYPES_AT_ONCE = 500

const UNNAMED: readonly string[] = [PAGE_TYPE]

export type Collection = {
  readonly slug: string
  readonly name: string
  readonly definition: string | null
}

export async function collectionsRead(): Promise<readonly Collection[]> {
  const { rows } = await getPages({
    pageTypeSlug: PAGE_TYPE,
    select: ["id", "slug", "definition", "pluralSlug"],
    limit: TYPES_AT_ONCE,
  })
  const held: Collection[] = []
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
