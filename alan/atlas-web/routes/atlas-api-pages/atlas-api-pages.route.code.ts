import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPages } from "akasha/alan/harness/web-page-answer/.server/answer-pages/answer-pages.module.code.ts"

const READS_ATLAS = handoverReader(ATLAS_SITE)

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug, READS_ATLAS)
}
