const hexOf = (byte: number): string => byte.toString(16).padStart(2, "0")

const BYTE = 256

export const idAt = (now: number, random: () => number): string => {
  const ms = Math.floor(now)
  const bytes = new Uint8Array(16)
  bytes[0] = Math.floor(ms / 1099511627776) % BYTE
  bytes[1] = Math.floor(ms / 4294967296) % BYTE
  bytes[2] = Math.floor(ms / 16777216) % BYTE
  bytes[3] = Math.floor(ms / 65536) % BYTE
  bytes[4] = Math.floor(ms / BYTE) % BYTE
  bytes[5] = ms % BYTE
  for (let at = 6; at < 16; at += 1) bytes[at] = Math.floor(random() * BYTE) % BYTE
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x70
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const held = [...bytes].map(hexOf).join("")
  return [
    held.slice(0, 8),
    held.slice(8, 12),
    held.slice(12, 16),
    held.slice(16, 20),
    held.slice(20),
  ].join("-")
}
