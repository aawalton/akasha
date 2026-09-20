import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageWrite } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

const ARCHIVE_OF_WORLDS_WRITER = "archive-of-worlds-web"

const READS_ARCHIVE_OF_WORLDS = handoverReader(ARCHIVE_OF_WORLDS_SITE)

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, ARCHIVE_OF_WORLDS_WRITER, READS_ARCHIVE_OF_WORLDS)
}
