import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"

type HandoverReader = {
  readonly contributor: string
}

type ReadsHandover = (
  request: Request
) => Promise<{ user: HandoverReader | null; headers: Headers }>

export function handoverReader(site: HandoverSite): ReadsHandover {
  return async (request) => {
    const contributor = await signedInAs(site, request)
    return {
      user: contributor === null ? null : { contributor },
      headers: new Headers(),
    }
  }
}
