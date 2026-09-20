import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import {
  type HandoverSite,
  RETURN_PARAM,
} from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { safeInternalPath } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { redirect } from "react-router"

export type HandoverGuardConfig = {
  signInPaths: readonly string[]
  openPaths: readonly RegExp[]
  externalReturnPattern?: RegExp
  atRoot?: {
    reader?: string
    stranger?: string
  }
}

function sentOnTo(site: HandoverSite, asked: string | null, external?: RegExp): string {
  if (asked === null || asked === "") return site.homePath
  if (external?.test(asked) === true) return asked
  return safeInternalPath(asked) ?? site.homePath
}

export async function handoverGuard(
  site: HandoverSite,
  request: Request,
  config: HandoverGuardConfig
): Promise<Response | null> {
  const url = new URL(request.url)
  const pathname = url.pathname
  const reader = (await signedInAs(site, request)) !== null
  const atSignIn = config.signInPaths.includes(pathname)

  if (pathname === "/" && config.atRoot !== undefined) {
    const target = reader ? config.atRoot.reader : config.atRoot.stranger
    if (target !== undefined) return redirect(target)
  }

  if (reader && atSignIn) {
    return redirect(
      sentOnTo(site, url.searchParams.get(RETURN_PARAM), config.externalReturnPattern)
    )
  }

  if (!reader && !atSignIn && !config.openPaths.some((open) => open.test(pathname))) {
    const asked = `${pathname}${url.search}`
    return redirect(
      asked === "/"
        ? site.signInPath
        : `${site.signInPath}?${RETURN_PARAM}=${encodeURIComponent(asked)}`
    )
  }

  return null
}
