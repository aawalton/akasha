import { appHandoverPlugin } from "akasha/alan/harness/better-auth-rr/modules/app-handover-session/app-handover-session.module.code.ts"
import { GOOGLE } from "akasha/alan/harness/better-auth-rr/modules/sign-in-naming/sign-in-naming.module.code.ts"
import { reachSignIn } from "akasha/alan/harness/better-auth-rr/modules/sign-in-reaching/sign-in-reaching.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { betterAuth } from "better-auth"
import type { OAuth2Tokens, OAuth2UserInfo } from "better-auth/oauth2"
import type { GoogleProfile } from "better-auth/social-providers"
import { decodeJwt } from "jose"

export const BASE_URL = "https://alanwalton.com"

export const BASE_PATH = "/api/auth"

export const UPDATE_USER_AT = "/update-user"

const SESSION_KEY = "ALANWALTON_SESSION_KEY"

const CLIENT_ID = "GOOGLE_OAUTH_CLIENT_ID"

const CLIENT_SECRET = "GOOGLE_OAUTH_CLIENT_SECRET"

export type GoogleUserInfo = {
  readonly user: OAuth2UserInfo & Record<string, unknown>
  readonly data: GoogleProfile
}

export function claimsIn(idToken: unknown): GoogleProfile | null {
  const text = textIn(idToken)
  if (text === null) return null
  try {
    return decodeJwt(text) as GoogleProfile
  } catch {
    return null
  }
}

export function markedVerified(said: unknown): boolean {
  return said === true || said === "true"
}

export async function googleUserInfo(token: OAuth2Tokens): Promise<GoogleUserInfo | null> {
  const claims = claimsIn(token.idToken)
  if (claims === null) {
    console.error("google handed back no id token this could read")
    return null
  }

  const email = textIn(claims.email)
  if (email === null) {
    console.error("google handed back an id token naming no address")
    return null
  }
  if (!markedVerified(claims.email_verified)) {
    console.error(
      `google has not marked \`${email}\` verified, and such an address signs nobody in`
    )
    return null
  }

  const subject = textIn(claims.sub)
  if (subject === null) {
    console.error("google handed back an id token naming no person")
    return null
  }

  const reached = await reachSignIn({
    provider: GOOGLE,
    subject,
    email,
    emailVerified: true,
  })
  if ("refused" in reached) {
    console.error(`a google sign-in was refused: ${reached.refused}`)
    return null
  }

  return {
    user: {
      name: textIn(claims.name) ?? email,
      email,
      image: textIn(claims.picture) ?? undefined,
      emailVerified: true,
      contributor: reached.contributor,
      subjectHash: reached.subjectHash,
    },
    data: claims,
  }
}

function makeAuthServer() {
  return betterAuth({
    appName: "alanwalton",
    baseURL: BASE_URL,
    basePath: BASE_PATH,
    secret: requireEnv(SESSION_KEY),
    emailAndPassword: { enabled: false },
    disabledPaths: [UPDATE_USER_AT],
    socialProviders: {
      google: {
        clientId: requireEnv(CLIENT_ID),
        clientSecret: requireEnv(CLIENT_SECRET),
        getUserInfo: googleUserInfo,
      },
    },
    user: {
      additionalFields: {
        contributor: { type: "string", required: false, input: true },
        subjectHash: { type: "string", required: false, input: true },
      },
    },
    plugins: [appHandoverPlugin()],
  })
}

export type AuthServer = ReturnType<typeof makeAuthServer>

let held: AuthServer | null = null

export function authServer(): AuthServer {
  held ??= makeAuthServer()
  return held
}

export async function handleAuthRequest(request: Request): Promise<Response> {
  return authServer().handler(request)
}
