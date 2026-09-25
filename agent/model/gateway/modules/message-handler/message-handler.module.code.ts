import { buildAnthropicErrorEnvelope } from "akasha/agent/model/gateway/modules/anthropic-error-envelope/anthropic-error-envelope.module.code.ts"
import type { ObserverSlot } from "akasha/agent/model/gateway/modules/observer-slot/observer-slot.module.code.ts"

export const BAD_GATEWAY = 502

const BAD_GATEWAY_TEXT = "Bad Gateway"

const POST = "POST"

const API_ERROR = "api_error"

const JSON_CONTENT_TYPE = "application/json"

export class ClientNamedError extends Error {}

export function handlerErrorSaid(thrown: unknown): string {
  if (thrown instanceof ClientNamedError) return thrown.message
  const kind = thrown instanceof Error ? thrown.name : typeof thrown
  return `the gateway failed on this request with ${kind}`
}

export function badGatewayResponse(thrown: unknown): Response {
  const envelope = buildAnthropicErrorEnvelope(API_ERROR, handlerErrorSaid(thrown))
  return new Response(JSON.stringify(envelope), {
    status: BAD_GATEWAY,
    statusText: BAD_GATEWAY_TEXT,
    headers: { "content-type": JSON_CONTENT_TYPE },
  })
}

export type MessageTurn = {
  readonly req: Request
  readonly observerSlot: ObserverSlot
  readonly originalBody: ArrayBuffer | null
  readonly method: string
  readonly pathname: string
}

export type HandlerDoors = {
  readonly queued: (turn: MessageTurn) => Promise<Response>
  readonly said: (line: string) => undefined
  readonly threw: (line: string, thrown: unknown) => undefined
}

export type MessageHandler = (req: Request, observerSlot: ObserverSlot) => Promise<Response>

export function fallthroughLine(logPrefix: string, method: string, pathname: string): string {
  return `${logPrefix} res ${method} ${pathname} account=- status=502 fallthrough=handler-error`
}

export function buildMessageHandler(logPrefix: string, doors: HandlerDoors): MessageHandler {
  return async function handleMessages(req, observerSlot) {
    const pathname = new URL(req.url).pathname
    const method = req.method
    try {
      const originalBody = method === POST ? await req.arrayBuffer() : null
      return await doors.queued({ req, observerSlot, originalBody, method, pathname })
    } catch (thrown) {
      doors.threw(`${logPrefix} handler error:`, thrown)
      doors.said(fallthroughLine(logPrefix, method, pathname))
      return badGatewayResponse(thrown)
    }
  }
}
