import { answerPageWrite } from "akasha/alan/harness/web-page-answers/.server/answer-page-write/answer-page-write.module.code.ts"

const ATLAS_WRITER = "atlas-web"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, ATLAS_WRITER)
}
