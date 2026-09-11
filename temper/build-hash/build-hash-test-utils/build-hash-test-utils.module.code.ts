import { bytesToBase64url } from "akasha/temper/build-hash/build-hash-base64url/build-hash-base64url.module.code.ts"

export function stampedWith(bytes: Uint8Array, version: number): string {
  const held = new Uint8Array(bytes)
  held[1] = version
  return bytesToBase64url(held)
}
