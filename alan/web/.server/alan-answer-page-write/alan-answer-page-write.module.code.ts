import { answerPageWrite as answerFrom } from "akasha/alan/harness/web-page-answers/.server/answer-page-write/answer-page-write.module.code.ts"

const ALANWALTON_WRITER = "alanwalton-web"

export function answerPageWrite(request: Request): Promise<Response> {
  return answerFrom(request, ALANWALTON_WRITER)
}
