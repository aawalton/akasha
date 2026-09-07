import { answerPageTypes as answerFrom, pageTypesDeps } from "@akasha/pages-access/answer"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
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
