import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"

const READS_ATLAS = handoverReader(ATLAS_SITE)

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, READS_ATLAS)
}
