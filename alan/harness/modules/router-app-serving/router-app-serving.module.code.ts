import {
  readingFor,
  type WhoIsReading,
} from "akasha/alan/harness/modules/reading-in-flight/reading-in-flight.module.code.ts"
import {
  type AppCspConfig,
  buildSecurityHeaders,
} from "akasha/alan/harness/modules/security-headers/security-headers.module.code.ts"
import {
  htmlCacheControl,
  serveClientStatic,
} from "akasha/alan/harness/web-static-asset/modules/serve-static/serve-static.module.code.ts"
import { randomId } from "akasha/page/id/modules/random-id/random-id.module.code.ts"

const HTML = "text/html"

type RoutesReached = (request: Request, context: { readonly nonce: string }) => Promise<Response>

export const noReader: WhoIsReading = async () => ({ user: null })

export function readerNamed(personSlug: string): WhoIsReading {
  return async () => ({ user: { person: personSlug } })
}

export type RouterAppServing = {
  readonly clientDir: string
  readonly csp: AppCspConfig
  readonly whoIsReading: WhoIsReading
  readonly heldToGrants?: boolean
  readonly routes: RoutesReached
}

export function headed(answered: Response, csp: AppCspConfig, nonce: string): Response {
  if (!(answered.headers.get("content-type") ?? "").startsWith(HTML)) return answered
  const headers = new Headers(answered.headers)
  for (const [name, value] of Object.entries(buildSecurityHeaders(csp, nonce))) {
    headers.set(name, value)
  }
  headers.set("Cache-Control", htmlCacheControl(headers.get("cache-control")))
  return new Response(answered.body, {
    status: answered.status,
    statusText: answered.statusText,
    headers,
  })
}

export async function servedBy(
  serving: RouterAppServing,
  request: Request,
  pathname: string
): Promise<Response> {
  const asset = await serveClientStatic(pathname, serving.clientDir)
  if (asset) return asset
  const nonce = randomId()
  const reached = (): Promise<Response> => serving.routes(request, { nonce })
  const answered =
    serving.heldToGrants === true
      ? await readingFor(serving.whoIsReading, request, reached)
      : await reached()
  return headed(answered, serving.csp, nonce)
}
