const TEXT = new TextDecoder()

export function textIn(bytes: Uint8Array): string {
  return TEXT.decode(bytes)
}

export function textOf(bytes: Uint8Array | null): string | null {
  return bytes === null ? null : textIn(bytes)
}
