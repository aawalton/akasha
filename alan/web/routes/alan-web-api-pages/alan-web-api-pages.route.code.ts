import { answerPages } from "../../.server/alan-answer-pages/alan-answer-pages.module.code.ts"

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug)
}
