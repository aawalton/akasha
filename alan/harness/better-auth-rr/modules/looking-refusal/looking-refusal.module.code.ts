import { sessionOf } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const LOOKING_METHODS: ReadonlySet<string> = new Set(["GET", "HEAD", "OPTIONS"])

export const LOOKING_ONLY = "A browser signed in only to look sends nothing."

const FORBIDDEN = 403

export async function looksOnly(request: Request): Promise<boolean> {
  return objectIn(objectIn(await sessionOf(request))?.session)?.look === true
}

export async function lookingRefused(
  request: Request,
  readByPost: ReadonlySet<string>
): Promise<Response | null> {
  if (LOOKING_METHODS.has(request.method.toUpperCase())) return null
  if (readByPost.has(new URL(request.url).pathname)) return null
  if (!(await looksOnly(request))) return null
  return Response.json({ ok: false, error: LOOKING_ONLY }, { status: FORBIDDEN })
}
