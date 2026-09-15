import { answerPages } from "akasha/alan/harness/web-page-answers/.server/answer-pages/answer-pages.module.code.ts"

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug)
}
