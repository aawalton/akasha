import { answerEvents } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerEvents(request)
}
