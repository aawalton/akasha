import { answerPages as answerFrom, pagesDeps } from "@akasha/pages/access/answer"
import { resolveRequestUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import {
  capacitorCorsHeaders,
  corsAnswered,
  corsPreflight,
} from "../../capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "GET, OPTIONS"

const DEPS = pagesDeps(resolveRequestUser)

export async function answerPages(request: Request, pageTypeSlug: string): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") return corsPreflight(cors)
  return corsAnswered(await answerFrom(request, pageTypeSlug, DEPS), cors)
}
