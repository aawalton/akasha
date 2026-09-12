import { resolveRequestUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import {
  answerPageTypes as answerFrom,
  pageTypesDeps,
} from "akasha/pages/access/modules/answer/answer.module.code.ts"

const DEPS = pageTypesDeps(resolveRequestUser)

export function answerPageTypes(request: Request): Promise<Response> {
  return answerFrom(request, DEPS)
}
