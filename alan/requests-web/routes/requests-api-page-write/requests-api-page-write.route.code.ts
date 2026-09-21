import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageWrite } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"

const REQUESTS_WRITER = "requests-web"

const READS_REQUESTS = handoverReader(REQUESTS_SITE)

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, REQUESTS_WRITER, READS_REQUESTS)
}
