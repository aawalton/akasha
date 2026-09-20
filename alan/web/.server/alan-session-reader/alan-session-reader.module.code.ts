import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  parseBearerToken,
  resolveRequestUser,
} from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"

export type AlanReader = {
  readonly contributor: string
}

export async function alanContributor(request: Request): Promise<string | null> {
  const signed = await signedInAs(request)
  return signed === null ? null : signed.contributor
}

export async function readAlanUser(
  request: Request
): Promise<{ user: object | null; headers: Headers }> {
  if (parseBearerToken(request.headers.get("authorization")) === null) {
    const contributor = await alanContributor(request)
    if (contributor !== null) {
      const reader: AlanReader = { contributor }
      return { user: reader, headers: new Headers() }
    }
  }
  return resolveRequestUser(request)
}
