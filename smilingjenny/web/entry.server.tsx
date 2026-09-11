import { renderRouterApp } from "akasha/code/router-apps/rendering/router-app-rendering.module.code.tsx"
import { isbot } from "isbot"
import type { AppLoadContext, EntryContext } from "react-router"

export const streamTimeout = 5_000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
): Promise<Response> {
  return renderRouterApp(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    loadContext.nonce,
    streamTimeout,
    isbot
  )
}
