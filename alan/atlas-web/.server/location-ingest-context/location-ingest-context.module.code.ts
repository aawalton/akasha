import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"

type LocationIngestContext = {
  readonly authenticated: boolean
  readonly headers: Headers
}

export async function resolveLocationIngestContext(
  request: Request
): Promise<LocationIngestContext> {
  const reader = await signedInAs(ATLAS_SITE, request)
  return { authenticated: reader !== null, headers: new Headers() }
}
