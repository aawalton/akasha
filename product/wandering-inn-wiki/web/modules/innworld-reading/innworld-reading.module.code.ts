import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"

const PAGE_TYPE = "page-type"

const TYPES_AT_ONCE = 500

export type ShownType = {
  readonly slug: string
  readonly definition: string | null
}

export async function shownTypesRead(): Promise<readonly ShownType[]> {
  const { rows } = await getPages({
    pageTypeSlug: PAGE_TYPE,
    select: ["id", "slug", "definition"],
    limit: TYPES_AT_ONCE,
  })
  const held: ShownType[] = []
  for (const one of rows) {
    const slug = textIn(one["slug"])
    if (slug === null) continue
    held.push({ slug, definition: textIn(one["definition"]) })
  }
  return held
}
