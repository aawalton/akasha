import http2 from "node:http2"

export const APNS_AUTH_KEY_ENV = "APNS_AUTH_KEY_P8"

export const APNS_KEY_ID = "3KCWQ4M92H"

export const APNS_TEAM_ID = "M6AN6NM6FL"

export const APNS_HOST = "api.push.apple.com"

const APNS_PORT = 443

const JWT_LIFE_SECONDS = 50 * 60

const SEND_CEILING_MS = 20_000

export type ApnsPayload = Readonly<Record<string, unknown>>

export type ApnsOutcome =
  | { readonly kind: "delivered"; readonly apnsId: string | null }
  | { readonly kind: "prune"; readonly status: number; readonly reason: string }
  | { readonly kind: "error"; readonly status: number; readonly reason: string | null }

export interface ApnsSender {
  readonly send: (deviceToken: string, payload: ApnsPayload, topic: string) => Promise<ApnsOutcome>
  readonly close: () => undefined
}

export function classifyApnsResponse(said: {
  readonly status: number
  readonly reason: string | null
  readonly apnsId: string | null
}): ApnsOutcome {
  if (said.status === 200) return { kind: "delivered", apnsId: said.apnsId }
  if (said.status === 410)
    return { kind: "prune", status: 410, reason: said.reason ?? "Unregistered" }
  if (said.status === 400 && said.reason === "BadDeviceToken") {
    return { kind: "prune", status: 400, reason: "BadDeviceToken" }
  }
  return { kind: "error", status: said.status, reason: said.reason }
}

export function reasonIn(body: string): string | null {
  if (body === "") return null
  let held: unknown
  try {
    held = JSON.parse(body)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object") return null
  const reason = (held as Record<string, unknown>).reason
  return typeof reason === "string" ? reason : null
}

function base64Url(bytes: ArrayBuffer | Uint8Array | string): string {
  const held =
    typeof bytes === "string"
      ? Buffer.from(bytes)
      : bytes instanceof Uint8Array
        ? Buffer.from(bytes)
        : Buffer.from(new Uint8Array(bytes))
  return held.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}

export function pkcs8In(pem: string): Uint8Array<ArrayBuffer> {
  const body = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")
  if (body === "") {
    throw new Error(
      `${APNS_AUTH_KEY_ENV} carries no PEM body, so no provider token can be signed with it`
    )
  }
  const raw = Buffer.from(body, "base64")
  const der = new Uint8Array(raw.byteLength)
  der.set(raw)
  return der
}

export async function buildApnsJwt(args: {
  readonly pem: string
  readonly keyId: string
  readonly teamId: string
  readonly nowSeconds: number
}): Promise<string> {
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pkcs8In(args.pem),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  )
  const header = base64Url(JSON.stringify({ alg: "ES256", kid: args.keyId }))
  const claims = base64Url(JSON.stringify({ iss: args.teamId, iat: args.nowSeconds }))
  const signing = `${header}.${claims}`
  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    new TextEncoder().encode(signing)
  )
  return `${signing}.${base64Url(signature)}`
}

export function apnsSender(pem: string): ApnsSender {
  let signed: { readonly jwt: string; readonly atSeconds: number } | null = null
  let session: http2.ClientHttp2Session | null = null

  async function token(): Promise<string> {
    const nowSeconds = Math.floor(Date.now() / 1000)
    if (signed !== null && nowSeconds - signed.atSeconds < JWT_LIFE_SECONDS) return signed.jwt
    const jwt = await buildApnsJwt({
      pem,
      keyId: APNS_KEY_ID,
      teamId: APNS_TEAM_ID,
      nowSeconds,
    })
    signed = { jwt, atSeconds: nowSeconds }
    return jwt
  }

  function open(): http2.ClientHttp2Session {
    if (session !== null && !session.closed && !session.destroyed) return session
    const next = http2.connect(`https://${APNS_HOST}:${APNS_PORT}`)
    const forget = (): undefined => {
      if (session === next) session = null
      return undefined
    }
    next.on("error", forget)
    next.on("close", forget)
    session = next
    return next
  }

  async function send(
    deviceToken: string,
    payload: ApnsPayload,
    topic: string
  ): Promise<ApnsOutcome> {
    const jwt = await token()
    const body = JSON.stringify(payload)
    const client = open()
    return await new Promise<ApnsOutcome>((resolve, reject) => {
      const request = client.request({
        ":method": "POST",
        ":path": `/3/device/${deviceToken}`,
        authorization: `bearer ${jwt}`,
        "apns-topic": topic,
        "apns-push-type": "alert",
        "apns-priority": "10",
        "content-type": "application/json",
        "content-length": Buffer.byteLength(body),
      })
      let status = 0
      let apnsId: string | null = null
      const chunks: Buffer[] = []
      request.setTimeout(SEND_CEILING_MS, () => {
        request.close(http2.constants.NGHTTP2_CANCEL)
        reject(
          new Error(
            `APNs gave no answer for a push to ${topic} within ${SEND_CEILING_MS}ms, which is the ceiling one send is held to`
          )
        )
      })
      request.on("response", (headers) => {
        status = Number(headers[":status"])
        const said = headers["apns-id"]
        apnsId = typeof said === "string" ? said : null
      })
      request.on("data", (chunk: Buffer) => chunks.push(chunk))
      request.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf8")
        resolve(classifyApnsResponse({ status, reason: reasonIn(raw), apnsId }))
      })
      request.on("error", (err) => reject(err))
      request.write(body)
      request.end()
    })
  }

  function close(): undefined {
    if (session !== null && !session.closed && !session.destroyed) session.close()
    session = null
    return undefined
  }

  return { send, close }
}

export interface SenderRead {
  readonly sender: ApnsSender | null
  readonly why: string | null
}

export function apnsSenderFromEnv(): SenderRead {
  const pem = process.env[APNS_AUTH_KEY_ENV] ?? ""
  if (pem === "") {
    return {
      sender: null,
      why: `${APNS_AUTH_KEY_ENV} is unset, so no provider token can be signed — every push is a logged no-op until it stands in ~/.secrets.env`,
    }
  }
  return { sender: apnsSender(pem), why: null }
}
