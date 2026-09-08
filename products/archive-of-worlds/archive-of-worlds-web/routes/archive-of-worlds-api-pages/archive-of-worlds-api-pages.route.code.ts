import { answerPages } from "@akasha/web-page-answers/answer-pages"

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug)
}
