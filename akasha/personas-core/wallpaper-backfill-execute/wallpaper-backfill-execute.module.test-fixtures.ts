export const pngHeaderBytes = (width: number, height: number): Uint8Array => {
  const bytes = new Uint8Array(24)
  bytes.set([137, 80, 78, 71, 13, 10, 26, 10], 0)
  bytes.set([0, 0, 0, 13], 8)
  bytes.set([73, 72, 68, 82], 12)
  const view = new DataView(bytes.buffer)
  view.setUint32(16, width, false)
  view.setUint32(20, height, false)
  return bytes
}

export const notAPngBytes = (): Uint8Array => new Uint8Array(24)

export const truncatedBytes = (): Uint8Array => pngHeaderBytes(10, 10).slice(0, 20)
