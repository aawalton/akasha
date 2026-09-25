import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageTypes } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

const READS_JENNY = handoverReader(JENNY_SITE)

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request, READS_JENNY)
}
