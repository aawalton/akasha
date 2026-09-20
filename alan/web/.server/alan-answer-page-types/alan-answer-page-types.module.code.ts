import { answerPageTypes as answerFrom } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import {
  capacitorCorsHeaders,
  corsAnswered,
  corsPreflight,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "GET, OPTIONS"

export async function answerPageTypes(request: Request): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") return corsPreflight(cors)
  return corsAnswered(await answerFrom(request, readAlanUser), cors)
}
