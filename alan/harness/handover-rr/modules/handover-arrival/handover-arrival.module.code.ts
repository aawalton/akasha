import { contributorInCode } from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import { signedInCookie } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import {
  CODE_PARAM,
  type HandoverSite,
  handoverStartAt,
  RETURN_PARAM,
} from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { safeInternalPath } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { redirect } from "react-router"

export function returnPathIn(site: HandoverSite, asked: string | null): string {
  if (asked === null || asked === "") return site.homePath
  const inside = safeInternalPath(asked)
  if (inside === null) return site.homePath
  const at = inside.split("?")[0] ?? inside
  if (at === site.landingPath || at === site.signInPath) return site.homePath
  return inside
}

export function signInAt(site: HandoverSite, request: Request): string {
  const url = new URL(request.url)
  const bouncing = url.pathname === site.landingPath || url.pathname === site.signInPath
  const asked = bouncing ? url.searchParams.get(RETURN_PARAM) : `${url.pathname}${url.search}`
  return handoverStartAt(site, returnPathIn(site, asked))
}

export async function landFromHandover(site: HandoverSite, request: Request): Promise<Response> {
  const url = new URL(request.url)
  const back = returnPathIn(site, url.searchParams.get(RETURN_PARAM))
  const code = url.searchParams.get(CODE_PARAM)
  if (code === null || code === "") return redirect(handoverStartAt(site, back))
  const contributor = await contributorInCode({ code, audience: site.origin, verifier: null })
  if (contributor === null) return redirect(handoverStartAt(site, back))
  return redirect(back, { headers: { "set-cookie": await signedInCookie(site, contributor) } })
}
