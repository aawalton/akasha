import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
import type { AppLoadContext, EntryContext } from "react-router"
import { ServerRouter } from "react-router"

const STREAM_TIMEOUT = 5_000

const STREAM_GRACE = 1_000

export { STREAM_TIMEOUT as streamTimeout }

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
): Promise<Response> {
  let shellRendered = false
  const userAgent = request.headers.get("user-agent")

  let statusCode = responseStatusCode

  const nonce = typeof loadContext.nonce === "string" ? loadContext.nonce : undefined

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
    {
      nonce,
      signal: AbortSignal.timeout(STREAM_TIMEOUT + STREAM_GRACE),
      onError(error: unknown) {
        statusCode = 500
        if (shellRendered) {
          console.error(error)
        }
      },
    }
  )
  shellRendered = true

  const isBotRequest = userAgent != null && isbot(userAgent)
  if (isBotRequest || routerContext.isSpaMode) {
    await body.allReady
  }

  responseHeaders.set("Content-Type", "text/html")
  return new Response(body, {
    headers: responseHeaders,
    status: statusCode,
  })
}
