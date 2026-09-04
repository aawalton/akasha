import { answerPageTypes } from "../.server/alan-answer-page-types/alan-answer-page-types.module.code.ts"
import type { Route } from "./+types/api.page-types"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerPageTypes(request)
}
