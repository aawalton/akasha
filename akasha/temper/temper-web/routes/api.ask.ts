import { answerAsk } from "../.server/answer-ask/answer-ask.module.code.ts"
import type { Route } from "./+types/api.ask"

// `action` is this module's only export on purpose. React Router strips just
// `loader`, `action`, `middleware` and `headers`; anything else exported here
// would hold `answer-ask.server` — and the store it reaches — into the client
// bundle.
export async function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerAsk(request)
}
