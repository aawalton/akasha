import { answerAsk } from "akasha/alan/web/.server/alan-answer-ask/alan-answer-ask.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerAsk(request)
}
