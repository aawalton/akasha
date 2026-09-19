import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { handoverCodeFor } from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import {
  handoverLandingAt,
  MINT_PATH,
  PERIPHERAL_PARAM,
  peripheralNamed,
  RETURN_PARAM,
} from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { safeInternalPath } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { redirect } from "react-router"

const SIGN_IN_PATH = "/sign-in"

const NO_SUCH_PERIPHERAL = "no site of that name borrows this sign-in"

function mintingAt(name: string, back: string): string {
  const asking = new URLSearchParams()
  asking.set(PERIPHERAL_PARAM, name)
  asking.set(RETURN_PARAM, back)
  return `${MINT_PATH}?${asking.toString()}`
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)

  const name = url.searchParams.get(PERIPHERAL_PARAM)
  const peripheral = peripheralNamed(name)
  if (name === null || peripheral === null) {
    throw new Response(NO_SUCH_PERIPHERAL, { status: 400 })
  }

  const asked = url.searchParams.get(RETURN_PARAM)
  const back = asked === null || asked === "" ? "/" : (safeInternalPath(asked) ?? "/")

  const held = await signedInAs(request)
  if (held === null) {
    const here = mintingAt(name, back)
    throw redirect(`${SIGN_IN_PATH}?next=${encodeURIComponent(here)}`)
  }

  const code = await handoverCodeFor({
    audience: peripheral.origin,
    contributor: held.contributor,
  })
  throw redirect(handoverLandingAt(peripheral, code, back))
}
