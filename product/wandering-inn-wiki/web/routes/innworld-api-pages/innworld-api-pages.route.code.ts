import { answerPages } from "akasha/alan/harness/web-page-answer/.server/answer-pages/answer-pages.module.code.ts"
import { readsInnworld } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reader/innworld-reader.module.code.ts"

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug, readsInnworld)
}
