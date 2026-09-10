import { resolveRequestUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import {
  answerPages as answerFrom,
  pagesDeps,
} from "akasha/pages/access/answer/answer.module.code.ts"

const DEPS = pagesDeps(resolveRequestUser)

export function answerPages(request: Request, pageTypeSlug: string): Promise<Response> {
  return answerFrom(request, pageTypeSlug, DEPS)
}
