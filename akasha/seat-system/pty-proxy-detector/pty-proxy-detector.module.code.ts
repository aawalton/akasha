export interface RisingEdgeDetector {
  push: (chunk: Uint8Array) => boolean
}

export const DEV_CHANNEL_MARKER = "I am using this for local development"

export const INJECT_DELAY_MS = 150

const ESC = String.fromCharCode(0x1b)
const CSI = new RegExp(`${ESC}\\[[\\x30-\\x3f]*[\\x20-\\x2f]*[\\x40-\\x7e]`, "g")
const SIMPLE_ESC = new RegExp(`${ESC}[\\x20-\\x2f]*[\\x30-\\x7e]`, "g")

function normalize(s: string): string {
  return s.replace(CSI, "").replace(SIMPLE_ESC, "").replace(/\s+/g, "")
}

export function createRisingEdgeDetector(marker: string): RisingEdgeDetector {
  const SLACK = 256
  const keep = marker.length + SLACK
  const decoder = new TextDecoder()
  const wanted = normalize(marker)
  let tail = ""
  let present = false

  return {
    push(chunk: Uint8Array): boolean {
      const grown = tail + decoder.decode(chunk, { stream: true })
      const arrived = normalize(grown).includes(wanted)
      tail = grown.length > keep ? grown.slice(grown.length - keep) : grown
      const rising = arrived && !present
      present = normalize(tail).includes(wanted)
      return rising
    },
  }
}
