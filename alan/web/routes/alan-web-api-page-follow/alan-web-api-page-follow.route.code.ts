import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, readAlanUser)
}
