import { renderToReadableStream } from "react-dom/server"
import type { EntryContext } from "react-router"
import { ServerRouter } from "react-router"

export async function renderRouterApp(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  carriedNonce: unknown,
  streamTimeout: number,
  isBot: (userAgent: string) => boolean
): Promise<Response> {
  let shellRendered = false
  const userAgent = request.headers.get("user-agent")

  let statusCode = responseStatusCode

  const nonce = typeof carriedNonce === "string" ? carriedNonce : undefined

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
    {
      nonce,
      signal: AbortSignal.timeout(streamTimeout + 1000),
      onError(error: unknown) {
        statusCode = 500
        if (shellRendered) {
          console.error(error)
        }
      },
    }
  )
  shellRendered = true

  const isBotRequest = userAgent != null && isBot(userAgent)
  if (isBotRequest || routerContext.isSpaMode) {
    await body.allReady
  }

  responseHeaders.set("Content-Type", "text/html")
  return new Response(body, {
    headers: responseHeaders,
    status: statusCode,
  })
}
