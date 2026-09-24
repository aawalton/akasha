import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

const READS_ARCHIVE_OF_WORLDS = handoverReader(ARCHIVE_OF_WORLDS_SITE)

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, READS_ARCHIVE_OF_WORLDS)
}
