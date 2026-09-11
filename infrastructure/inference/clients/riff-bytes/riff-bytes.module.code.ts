const RIFF_HEADER = 44

const RIFF = [0x52, 0x49, 0x46, 0x46]

export function isRiff(bytes: Uint8Array): boolean {
  return bytes.length > RIFF_HEADER && RIFF.every((one, at) => bytes[at] === one)
}
