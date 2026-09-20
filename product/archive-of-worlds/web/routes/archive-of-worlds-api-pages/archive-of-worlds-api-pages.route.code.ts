import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPages } from "akasha/alan/harness/web-page-answer/.server/answer-pages/answer-pages.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

const READS_ARCHIVE_OF_WORLDS = handoverReader(ARCHIVE_OF_WORLDS_SITE)

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug, READS_ARCHIVE_OF_WORLDS)
}
