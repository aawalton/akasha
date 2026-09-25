import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import {
  type Caller,
  CONFIG,
} from "akasha/infrastructure/network/auth-proxy/modules/config/auth-proxy-config.module.code.ts"

const SESSION_KEY_ENV = "AUTH_PROXY_SESSION_KEY"

const LANDING_PATH = "/handover"

export function siteForHost(host: string): HandoverSite | null {
  if (CONFIG.ROUTE_MAP[host] === undefined) return null
  const label = host.split(".")[0]
  if (label === undefined || label === "") return null
  return {
    name: label,
    origin: `https://${host}`,
    sessionKeyEnv: SESSION_KEY_ENV,
    landingPath: LANDING_PATH,
    signInPath: LANDING_PATH,
    homePath: "/",
  }
}

type Admission =
  | { readonly admitted: true; readonly caller: Caller }
  | { readonly admitted: false; readonly aStranger: boolean }

export async function admissionOf(site: HandoverSite, request: Request): Promise<Admission> {
  const contributor = await signedInAs(site, request)
  if (contributor === null) return { admitted: false, aStranger: true }
  const caller = CONFIG.ADMITTED[contributor]
  if (caller === undefined) return { admitted: false, aStranger: false }
  return { admitted: true, caller }
}
