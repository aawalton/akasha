import { answerPageTypes as answerFrom, pageTypesDeps } from "@akasha/pages-access/answer"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"

const DEPS = pageTypesDeps(getUser)

export function answerPageTypes(request: Request): Promise<Response> {
  return answerFrom(request, DEPS)
}
