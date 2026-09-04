import { answerPageWrite } from "../.server/atlas-answer-page-write/atlas-answer-page-write.module.code.ts"
import type { Route } from "./+types/api.page-write"

// `action` is this module's only export on purpose. React Router strips just
// `loader`, `action`, `middleware` and `headers`; anything else exported here
// would hold `answer-page-write.server` — and the server client it reaches —
// into the client bundle.
export async function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerPageWrite(request)
}
