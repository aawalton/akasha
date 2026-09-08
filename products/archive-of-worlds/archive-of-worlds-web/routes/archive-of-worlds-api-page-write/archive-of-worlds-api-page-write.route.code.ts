import { answerPageWrite } from "@akasha/web-page-answers/answer-page-write"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, "archive-of-worlds-web")
}
