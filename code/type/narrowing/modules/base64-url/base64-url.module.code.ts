export function base64Url(bytes: ArrayBuffer | Uint8Array | string): string {
  const held =
    typeof bytes === "string"
      ? Buffer.from(bytes)
      : bytes instanceof Uint8Array
        ? Buffer.from(bytes)
        : Buffer.from(new Uint8Array(bytes))
  return held.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}
