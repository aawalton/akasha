import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageWrite } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"

const ATLAS_WRITER = "atlas-web"

const READS_ATLAS = handoverReader(ATLAS_SITE)

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, ATLAS_WRITER, READS_ATLAS)
}
