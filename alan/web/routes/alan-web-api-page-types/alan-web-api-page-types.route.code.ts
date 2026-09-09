import { answerPageTypes } from "../../.server/alan-answer-page-types/alan-answer-page-types.module.code.ts"

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request)
}
