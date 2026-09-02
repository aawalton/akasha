import { answerPages as answerFrom, pagesDeps } from "@akasha/pages-access/answer"
import { getUser } from "@akasha/supabase-rr/auth-server"

const DEPS = pagesDeps(getUser)

export function answerPages(request: Request, pageTypeSlug: string): Promise<Response> {
  return answerFrom(request, pageTypeSlug, DEPS)
}
