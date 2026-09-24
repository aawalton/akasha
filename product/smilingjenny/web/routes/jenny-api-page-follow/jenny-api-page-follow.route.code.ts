import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

const READS_JENNY = handoverReader(JENNY_SITE)

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, READS_JENNY)
}
