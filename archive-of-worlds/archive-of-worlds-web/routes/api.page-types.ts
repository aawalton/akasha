import { answerPageTypes } from "@akasha/web-page-answers/answer-page-types"
import type { Route } from "./+types/api.page-types"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerPageTypes(request)
}
