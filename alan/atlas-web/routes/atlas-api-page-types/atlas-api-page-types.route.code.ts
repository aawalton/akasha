import { answerPageTypes } from "../../.server/atlas-answer-page-types/atlas-answer-page-types.module.code.ts"

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request)
}
