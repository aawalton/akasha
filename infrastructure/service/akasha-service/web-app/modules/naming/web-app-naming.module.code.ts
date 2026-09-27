import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"

export const WEB_APP = "web-app"

export async function webAppTitle(slug: string): Promise<string> {
  const [found] = await collectPages({
    pageTypeSlug: WEB_APP,
    where: [{ key: "slug", eq: slug }],
    max: 1,
  })
  return stringIn(found?.title) ?? slug
}
