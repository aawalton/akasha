import { answerPageWrite } from "akasha/alan/harness/web-page-answers/.server/answer-page-write/answer-page-write.module.code.ts"

const ARCHIVE_OF_WORLDS_WRITER = "archive-of-worlds-web"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, ARCHIVE_OF_WORLDS_WRITER)
}
