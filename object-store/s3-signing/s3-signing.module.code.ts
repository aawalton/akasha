import { createHash, createHmac } from "node:crypto"

const SIGNED_HEADERS = ["host", "x-amz-content-sha256", "x-amz-date"]

function hex(buf: Buffer | Uint8Array): string {
  return Buffer.from(buf).toString("hex")
}

function sha256Hex(data: string | Uint8Array): string {
  return createHash("sha256").update(data).digest("hex")
}

function hmac(key: Buffer | string, data: string): Buffer {
  return createHmac("sha256", key).update(data).digest()
}

function amzDate(now: Date): { amzDate: string; dateStamp: string } {
  const iso = now.toISOString().replace(/[:-]|\.\d{3}/g, "")
  return { amzDate: iso, dateStamp: iso.slice(0, 8) }
}

export function signS3Request(opts: {
  method: string
  url: string
  body: Uint8Array | string
  accessKey: string
  secretKey: string
  region: string
  now?: Date
}): Record<string, string> {
  const { method, body, accessKey, secretKey, region } = opts
  const url = new URL(opts.url)
  const now = opts.now ?? new Date()
  const { amzDate: amzDateStr, dateStamp } = amzDate(now)

  const payloadHash = sha256Hex(body)

  const canonicalUri = url.pathname
    .split("/")
    .map((seg) => encodeURIComponent(seg).replace(/%2F/g, "/"))
    .join("/")
  const canonicalQuery = [...url.searchParams.entries()]
    .map(
      ([k, v]) =>
        `${encodeURIComponent(k).replace(/%2F/g, "/")}=${encodeURIComponent(v).replace(/%2F/g, "/")}`
    )
    .sort()
    .join("&")

  const host = url.host
  const headers: Record<string, string> = {
    host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDateStr,
  }
  const canonicalHeaders = SIGNED_HEADERS.map((h) => `${h}:${headers[h]}\n`).join("")
  const signedHeaders = SIGNED_HEADERS.join(";")

  const canonicalRequest = [
    method.toUpperCase(),
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n")

  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDateStr,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n")

  const kDate = hmac(`AWS4${secretKey}`, dateStamp)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, "s3")
  const kSigning = hmac(kService, "aws4_request")
  const signature = hex(hmac(kSigning, stringToSign))

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  return {
    ...headers,
    Authorization: authorization,
  }
}
