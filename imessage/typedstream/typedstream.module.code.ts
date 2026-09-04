const NSSTRING_MARKER = Buffer.from("NSString", "ascii")
const PAYLOAD_MARKER = Buffer.from([0x84, 0x01, 0x2b])

export function decodeAttributedBody(hex: string): string | undefined {
  const bytes = Buffer.from(hex, "hex")
  const classAt = bytes.indexOf(NSSTRING_MARKER)
  if (classAt === -1) return undefined
  const markerAt = bytes.indexOf(PAYLOAD_MARKER, classAt + NSSTRING_MARKER.length)
  if (markerAt === -1) return undefined
  const lengthAt = markerAt + PAYLOAD_MARKER.length
  if (lengthAt >= bytes.length) return undefined
  const lengthByte = bytes[lengthAt]
  if (lengthByte === undefined) return undefined
  let length: number
  let dataAt: number
  if (lengthByte < 0x80) {
    length = lengthByte
    dataAt = lengthAt + 1
  } else if (lengthByte === 0x81) {
    if (lengthAt + 3 > bytes.length) return undefined
    length = bytes.readUInt16LE(lengthAt + 1)
    dataAt = lengthAt + 3
  } else if (lengthByte === 0x82) {
    if (lengthAt + 5 > bytes.length) return undefined
    length = bytes.readUInt32LE(lengthAt + 1)
    dataAt = lengthAt + 5
  } else {
    return undefined
  }
  if (dataAt + length > bytes.length) return undefined
  return bytes.subarray(dataAt, dataAt + length).toString("utf8")
}
