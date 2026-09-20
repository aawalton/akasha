import { resolveRequestUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import {
  answerPageTypes as answerFrom,
  pageTypesDeps,
  type ReadUser,
} from "akasha/page/access/modules/answer/answer.module.code.ts"

const DEPS = pageTypesDeps(resolveRequestUser)

export function answerPageTypes(request: Request, readUser?: ReadUser): Promise<Response> {
  return answerFrom(request, readUser === undefined ? DEPS : pageTypesDeps(readUser))
}
