import { answerPages as answerFrom, pagesDeps } from "@shared/pages-access/answer"
import { getUser } from "@shared/supabase-rr/auth/server"

/**
 * This stands apart from the route module rather than in it. React Router strips
 * only `loader`, `action`, `middleware` and `headers` from a route, so any other
 * export there holds its imports into the client bundle — and these are
 * server-only. The route is its `loader` and nothing else.
 */

const DEPS = pagesDeps(getUser)

export function answerPages(request: Request, pageTypeSlug: string): Promise<Response> {
  return answerFrom(request, pageTypeSlug, DEPS)
}
