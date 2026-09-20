import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageTypes } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

const READS_ARCHIVE_OF_WORLDS = handoverReader(ARCHIVE_OF_WORLDS_SITE)

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request, READS_ARCHIVE_OF_WORLDS)
}
