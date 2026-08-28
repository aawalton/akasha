import { answerPages as answerFrom, pagesDeps } from "@shared/pages-access/answer"
import { getUser } from "@shared/supabase-rr/auth/server"

const DEPS = pagesDeps(getUser)

export function answerPages(request: Request, pageTypeSlug: string): Promise<Response> {
  return answerFrom(request, pageTypeSlug, DEPS)
}
