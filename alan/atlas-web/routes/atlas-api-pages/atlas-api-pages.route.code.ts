import { answerPages } from "../../.server/atlas-answer-pages/atlas-answer-pages.module.code.ts"

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug)
}
