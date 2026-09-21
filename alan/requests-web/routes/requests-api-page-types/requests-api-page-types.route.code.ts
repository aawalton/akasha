import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageTypes } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"

const READS_REQUESTS = handoverReader(REQUESTS_SITE)

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request, READS_REQUESTS)
}
