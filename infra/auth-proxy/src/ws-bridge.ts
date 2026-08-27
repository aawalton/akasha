import type { ServerWebSocket } from "bun"

export interface WsBridgeData {
  targetUrl: string
  outbound: WebSocket | null
  outboundOpen: boolean
  buffer: readonly (string | ArrayBuffer)[]
}

export function buildTargetUrl(req: Request, target: string, stripPrefix?: string): string {
  const url = new URL(req.url)
  const remainder =
    stripPrefix != null && url.pathname.startsWith(stripPrefix)
      ? url.pathname.slice(stripPrefix.length)
      : url.pathname
  const base = target.endsWith("/") ? target.slice(0, -1) : target
  const path = remainder.startsWith("/") ? remainder : `/${remainder}`
  return `${base}${path}${url.search}`
}

export function openOutbound(ws: ServerWebSocket<WsBridgeData>): undefined {
  const outbound = new WebSocket(ws.data.targetUrl)
  outbound.binaryType = "arraybuffer"
  ws.data.outbound = outbound

  outbound.addEventListener("open", () => {
    ws.data.outboundOpen = true
    for (const msg of ws.data.buffer) {
      outbound.send(msg)
    }
    ws.data.buffer = []
  })

  outbound.addEventListener("message", (ev) => {
    if (typeof ev.data === "string") {
      ws.send(ev.data)
    } else if (ev.data instanceof ArrayBuffer) {
      ws.send(ev.data)
    } else {
      ws.send(String(ev.data))
    }
  })

  outbound.addEventListener("close", (ev) => {
    ws.close(ev.code !== 0 ? ev.code : 1000, ev.reason !== "" ? ev.reason : "")
  })

  outbound.addEventListener("error", () => {
    ws.close(1011, "upstream error")
  })
}

export function forwardToOutbound(
  ws: ServerWebSocket<WsBridgeData>,
  message: string | Buffer
): undefined {
  let payload: string | ArrayBuffer
  if (typeof message === "string") {
    payload = message
  } else {
    const copy = new ArrayBuffer(message.byteLength)
    new Uint8Array(copy).set(message)
    payload = copy
  }

  if (ws.data.outboundOpen && ws.data.outbound?.readyState === WebSocket.OPEN) {
    ws.data.outbound.send(payload)
  } else {
    ws.data.buffer = [...ws.data.buffer, payload]
  }
}

export function closeOutbound(ws: ServerWebSocket<WsBridgeData>): undefined {
  if (ws.data.outbound && ws.data.outbound.readyState === WebSocket.OPEN) {
    ws.data.outbound.close(1000, "client closed")
  }
}
