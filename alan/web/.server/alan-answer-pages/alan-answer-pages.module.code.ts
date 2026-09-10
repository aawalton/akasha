import { answerPages as answerFrom } from "akasha/alan/harness/web-page-answers/.server/answer-pages/answer-pages.module.code.ts"
import {
  capacitorCorsHeaders,
  corsAnswered,
  corsPreflight,
} from "../../capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "GET, OPTIONS"

export async function answerPages(request: Request, pageTypeSlug: string): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") return corsPreflight(cors)
  return corsAnswered(await answerFrom(request, pageTypeSlug), cors)
}
