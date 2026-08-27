export const CFG = {
  filerUrl: "http://filer.local:8888",
  s3Endpoint: "http://s3.local:8333",
  bucket: "agent-sessions",
  accessKey: "AK",
  secretKey: "SK",
  region: "us-east-1",
}

export type RecordedInit = {
  method?: string
  headers: Record<string, string>
  body?: Uint8Array<ArrayBuffer>
}
export type FetchCall = { url: string; init: RecordedInit }

export function recordInit(init: RequestInit | undefined): RecordedInit {
  const rawHeaders = init?.headers
  let headers: Record<string, string> = {}
  if (rawHeaders instanceof Headers) {
    rawHeaders.forEach((v, k) => {
      headers[k] = v
    })
  } else if (Array.isArray(rawHeaders)) {
    headers = Object.fromEntries(rawHeaders)
  } else if (rawHeaders) {
    headers = { ...rawHeaders }
  }
  const rawBody = init?.body
  const body =
    rawBody instanceof Uint8Array
      ? Uint8Array.from(rawBody)
      : typeof rawBody === "string"
        ? new TextEncoder().encode(rawBody)
        : undefined
  return { method: init?.method, headers, body }
}
