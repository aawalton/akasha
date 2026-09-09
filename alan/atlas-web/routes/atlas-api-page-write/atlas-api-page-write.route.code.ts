import { answerPageWrite } from "../../.server/atlas-answer-page-write/atlas-answer-page-write.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request)
}
