import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"
import { APP_AUDIENCE } from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import {
  challengeFor,
  handoverCodeFor,
} from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import { exportPKCS8, exportSPKI, generateKeyPair } from "jose"

export const ALAN = "contributor-alan"

export const JENNY = "contributor-jenny"

const VERIFIER = "a-secret-the-driver-keeps-and-never-sends"

export const SEND_AT = "https://alanwalton.com/api/seat/message"

const pair = await generateKeyPair("EdDSA", { crv: "Ed25519", extractable: true })

process.env.HANDOVER_SIGNING_KEY = await exportPKCS8(pair.privateKey)

process.env.HANDOVER_PUBLIC_KEY = await exportSPKI(pair.publicKey)

process.env.ALANWALTON_SESSION_KEY = "a-session-key-for-this-test-alone-and-long-enough"

process.env.GOOGLE_OAUTH_CLIENT_ID = "a-client-id"

process.env.GOOGLE_OAUTH_CLIENT_SECRET = "a-client-secret"

const opened = await authServer().$context

for (const contributor of [ALAN, JENNY]) {
  await opened.internalAdapter.createUser(
    {
      name: contributor,
      email: `${contributor}@handover.invalid`,
      emailVerified: true,
      contributor,
    },
    { method: "app-handover" }
  )
}

export async function cookieFor(contributor: string, look: boolean): Promise<string> {
  const challenge = await challengeFor(VERIFIER)
  const code = await handoverCodeFor({ audience: APP_AUDIENCE, contributor, challenge, look })
  const traded = await authServer().api.appHandoverExchange({
    body: { code, verifier: VERIFIER },
    headers: new Headers(),
    returnHeaders: true,
  })
  return traded.headers
    .getSetCookie()
    .map((one) => one.split(";")[0] ?? "")
    .join("; ")
}

export function asked(method: string, cookie: string, at: string = SEND_AT): Request {
  return new Request(at, { method, headers: { cookie } })
}
