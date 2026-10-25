import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageWrite } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

const JENNY_WRITER = "smilingjenny-web"

const READS_JENNY = handoverReader(JENNY_SITE)

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, JENNY_WRITER, READS_JENNY)
}
