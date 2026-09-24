import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"

const READS_REQUESTS = handoverReader(REQUESTS_SITE)

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, READS_REQUESTS)
}
