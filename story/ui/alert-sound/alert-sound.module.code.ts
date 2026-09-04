import type { AlertSound } from "@akasha/story-engine-core/game-schema"

interface Note {
  readonly freq: number
  readonly type: OscillatorType
  readonly startOffset: number
  readonly duration: number
  readonly gain: number
}

const PRESET_NOTES: Record<Exclude<AlertSound, "off">, readonly Note[]> = {
  chime: [
    { freq: 660, type: "sine", startOffset: 0, duration: 0.18, gain: 0.09 },
    { freq: 988, type: "sine", startOffset: 0.11, duration: 0.24, gain: 0.09 },
  ],
  bell: [{ freq: 880, type: "triangle", startOffset: 0, duration: 0.5, gain: 0.08 }],
  pip: [{ freq: 1180, type: "square", startOffset: 0, duration: 0.08, gain: 0.05 }],
}

let audioContext: AudioContext | undefined

function ensureContext(): AudioContext | undefined {
  if (audioContext !== undefined) return audioContext
  if (typeof window === "undefined" || typeof window.AudioContext !== "function") return undefined
  audioContext = new window.AudioContext()
  return audioContext
}

export function primeAudio(): undefined {
  const ctx = ensureContext()
  if (ctx === undefined) return
  if (ctx.state === "suspended") void ctx.resume()
}

export function playAlertSound(preset: AlertSound): undefined {
  if (preset === "off") return
  const ctx = ensureContext()
  if (ctx === undefined) return
  if (ctx.state !== "running") {
    if (ctx.state === "suspended") void ctx.resume()
    return
  }
  const now = ctx.currentTime
  for (const note of PRESET_NOTES[preset]) {
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    osc.type = note.type
    osc.frequency.value = note.freq
    const start = now + note.startOffset
    const end = start + note.duration
    gainNode.gain.setValueAtTime(0, start)
    gainNode.gain.linearRampToValueAtTime(note.gain, start + 0.01)
    gainNode.gain.linearRampToValueAtTime(0, end)
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    osc.start(start)
    osc.stop(end)
  }
}
