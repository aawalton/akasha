import { answerPageTypes } from "../.server/answer-page-types/answer-page-types.module.code.ts"
import type { Route } from "./+types/api.page-types"

// `loader` is this module's only export on purpose. React Router strips just
// `loader`, `action`, `middleware` and `headers`; anything else exported here
// would hold `answer-page-types.server` into the client bundle.
export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerPageTypes(request)
}
