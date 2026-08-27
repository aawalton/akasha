import { answerPageTypes } from "~/lib/answer-page-types.server"
import type { Route } from "./+types/api.page-types"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerPageTypes(request)
}
