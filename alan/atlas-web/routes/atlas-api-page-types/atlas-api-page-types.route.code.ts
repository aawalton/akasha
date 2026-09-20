import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageTypes } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"

const READS_ATLAS = handoverReader(ATLAS_SITE)

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request, READS_ATLAS)
}
