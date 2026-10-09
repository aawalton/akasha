export const LIVE_MODEL = "models/gemini-3.8-live"

export const LIVE_AT =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained"

export const ASK_SEAT = "ask_seat"

const HEARD_RATE = 16_000

export const SAID_RATE = 24_000

const INT16_TOP = 0x7fff

type Entry = { readonly kind: string; readonly text?: string }

function briefFor(brief: string, persona: string): string {
  return brief.replaceAll("{persona}", persona).replaceAll("{tool}", ASK_SEAT).trim()
}

export function voiceSetupFor(brief: string, persona: string, voice: string | null) {
  return {
    model: LIVE_MODEL,
    generationConfig: {
      responseModalities: ["AUDIO"],
      ...(voice === null
        ? {}
        : { speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } }),
    },
    sessionResumption: {},
    contextWindowCompression: { slidingWindow: {} },
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    systemInstruction: { parts: [{ text: briefFor(brief, persona) }] },
    tools: [
      {
        functionDeclarations: [
          {
            name: ASK_SEAT,
            description: `Send Alan's words to ${persona} and wait for ${persona}'s reply.`,
            behavior: "NON_BLOCKING",
            parameters: {
              type: "OBJECT",
              properties: { message: { type: "STRING", description: "What Alan said." } },
              required: ["message"],
            },
          },
        ],
      },
    ],
  }
}

export function timesSent(entries: readonly Entry[], message: string): number {
  const said = message.trim()
  return entries.filter((one) => one.kind === "person" && one.text?.trim() === said).length
}

export function replyAfter(
  entries: readonly Entry[],
  message: string,
  seen: number
): string | null {
  const said = message.trim()
  let found = 0
  let from = -1
  for (const [at, one] of entries.entries()) {
    if (one.kind !== "person" || one.text?.trim() !== said) continue
    if (found === seen) {
      from = at
      break
    }
    found += 1
  }
  if (from < 0) return null
  const replies: string[] = []
  for (const one of entries.slice(from + 1)) {
    if (one.kind === "turn-end") return replies.join("\n\n")
    if (one.kind === "agent" && one.text !== undefined && one.text.trim() !== "") {
      replies.push(one.text.trim())
    }
  }
  return null
}

export function pcm16Of(samples: Float32Array, fromRate: number): Int16Array {
  const step = fromRate / HEARD_RATE
  const made = new Int16Array(Math.floor(samples.length / step))
  for (let at = 0; at < made.length; at += 1) {
    const start = Math.floor(at * step)
    const end = Math.max(start + 1, Math.floor((at + 1) * step))
    let sum = 0
    for (let one = start; one < end; one += 1) sum += samples[one] ?? 0
    const mean = Math.max(-1, Math.min(1, sum / (end - start)))
    made[at] = Math.round(mean * INT16_TOP)
  }
  return made
}

export function floatsOf(bytes: Uint8Array): Float32Array<ArrayBuffer> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const made = new Float32Array(Math.floor(bytes.byteLength / 2))
  for (let at = 0; at < made.length; at += 1) made[at] = view.getInt16(at * 2, true) / INT16_TOP
  return made
}

export function base64Of(bytes: Uint8Array): string {
  return btoa(Array.from(bytes, (one) => String.fromCharCode(one)).join(""))
}

export function bytesOf(said: string): Uint8Array {
  return Uint8Array.from(atob(said), (one) => one.charCodeAt(0))
}
