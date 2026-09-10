import { answerPageTypes as answerFrom, pageTypesDeps } from "@akasha/pages-access/answer"
import { resolveRequestUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import {
  capacitorCorsHeaders,
  corsAnswered,
  corsPreflight,
} from "../../capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "GET, OPTIONS"

const DEPS = pageTypesDeps(resolveRequestUser)

export async function answerPageTypes(request: Request): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") return corsPreflight(cors)
  return corsAnswered(await answerFrom(request, DEPS), cors)
}
