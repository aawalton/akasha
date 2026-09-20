import {
  SIGN_IN_PATH,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  APP_AUDIENCE,
  appLandingAt,
  appMintingAt,
  CHALLENGE_PARAM,
  challengeShown,
} from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import { handoverCodeFor } from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import { redirect } from "react-router"

const NO_CHALLENGE = "a code for the app names the hash of a secret that app keeps"

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)

  const challenge = challengeShown(url.searchParams.get(CHALLENGE_PARAM))
  if (challenge === null) {
    throw new Response(NO_CHALLENGE, { status: 400 })
  }

  const held = await signedInAs(request)
  if (held === null) {
    const here = appMintingAt(challenge)
    throw redirect(`${SIGN_IN_PATH}?next=${encodeURIComponent(here)}`)
  }

  const code = await handoverCodeFor({
    audience: APP_AUDIENCE,
    contributor: held.contributor,
    challenge,
  })
  throw redirect(appLandingAt(code))
}
