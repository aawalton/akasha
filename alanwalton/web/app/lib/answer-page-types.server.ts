import { answerPageTypes as answerFrom, pageTypesDeps } from "@akasha/pages-access/answer"
import { getUser } from "@shared/supabase-rr/auth/server"

const DEPS = pageTypesDeps(getUser)

export function answerPageTypes(request: Request): Promise<Response> {
  return answerFrom(request, DEPS)
}
