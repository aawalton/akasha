import { answerPageWrite as answerFrom } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"

const ALANWALTON_WRITER = "alanwalton-web"

export function answerPageWrite(request: Request): Promise<Response> {
  return answerFrom(request, ALANWALTON_WRITER, readAlanUser)
}
