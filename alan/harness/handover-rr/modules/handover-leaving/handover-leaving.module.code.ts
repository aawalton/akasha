import { signedOutCookie } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { redirect } from "react-router"

export async function leaveHandover(site: HandoverSite): Promise<Response> {
  return redirect(site.signInPath, { headers: { "set-cookie": await signedOutCookie(site) } })
}

export function leavingShown(site: HandoverSite): Response {
  return redirect(site.homePath)
}
