import { answerPageWrite } from "akasha/alan/web/.server/alan-answer-page-write/alan-answer-page-write.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request)
}
