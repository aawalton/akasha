const STRICT = new TextDecoder("utf-8", { fatal: true })

const LEADING = 8

export function decodeUtf8(bytes: Uint8Array): string | null {
  try {
    return STRICT.decode(bytes)
  } catch {
    return null
  }
}

export function leadingBytes(bytes: Uint8Array): string {
  return [...bytes.subarray(0, LEADING)].map((one) => one.toString(16).padStart(2, "0")).join("")
}
