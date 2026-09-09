import { renderToReadableStream } from "react-dom/server"
import type { EntryContext } from "react-router"
import { ServerRouter } from "react-router"

export const streamTimeout = 15_000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
): Promise<Response> {
  let statusCode = responseStatusCode

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: AbortSignal.timeout(streamTimeout + 1000),
      onError(error: unknown) {
        statusCode = 500
        console.error(error)
      },
    }
  )

  await body.allReady

  responseHeaders.set("Content-Type", "text/html")
  return new Response(body, {
    headers: responseHeaders,
    status: statusCode,
  })
}
