import { answerPageTypes } from "../.server/atlas-answer-page-types/atlas-answer-page-types.module.code.ts"
import type { Route } from "./+types/api.page-types"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerPageTypes(request)
}
