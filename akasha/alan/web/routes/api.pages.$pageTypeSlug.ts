import { answerPages } from "../.server/alan-answer-pages/alan-answer-pages.module.code.ts"
import type { Route } from "./+types/api.pages.$pageTypeSlug"

// `loader` is this module's only export on purpose. React Router strips just
// `loader`, `action`, `middleware` and `headers`; anything else exported here
// would hold `answer-pages.server` — and the service-role client it reaches —
// into the client bundle.
export async function loader({ request, params }: Route.LoaderArgs): Promise<Response> {
  return answerPages(request, params.pageTypeSlug)
}
