"use client"

import {
  ASK_SEAT,
  base64Of,
  bytesOf,
  floatsOf,
  LIVE_AT,
  LIVE_MODEL,
  pcm16Of,
  replyAfter,
  SAID_RATE,
  timesSent,
} from "akasha/agent/seat/voice/modules/setup/seat-voice-setup.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"

type VoiceState =
  | { readonly kind: "off" }
  | { readonly kind: "connecting" }
  | { readonly kind: "live" }
  | { readonly kind: "failed"; readonly why: string }

export type Voice = { readonly state: VoiceState; readonly toggle: () => undefined }

type Entry = { readonly kind: string; readonly text?: string }

type Asked = { readonly message: string; readonly seen: number }

type Live = {
  ws: WebSocket | null
  readonly context: AudioContext
  stream: MediaStream | null
  heard: Int16Array[]
  heardLength: number
  nextAt: number
  readonly sounding: Set<AudioBufferSourceNode>
  handle: string | null
  readonly asked: Map<string, Asked>
  ended: boolean
  reconnects: number
}

const TOKEN_AT = "/api/seat/voice"

const HEARD_EVERY_SAMPLES = 1600

const RECONNECTS = 3

const HEARD_BLOCK = 4096

function audioSessionAs(type: string): undefined {
  const said = (navigator as { audioSession?: { type: string } }).audioSession
  if (said !== undefined) said.type = type
}

async function tokenFor(seat: string): Promise<string> {
  const answered = await fetch(TOKEN_AT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ seat }),
  })
  const said: unknown = await answered.json().catch(() => null)
  const held = (said ?? {}) as { token?: unknown; error?: unknown }
  if (answered.ok && typeof held.token === "string") return held.token
  throw new Error(
    typeof held.error === "string" ? held.error : `${TOKEN_AT} answered ${answered.status}`
  )
}

function sent(live: Live, said: unknown): undefined {
  if (live.ws?.readyState === WebSocket.OPEN) live.ws.send(JSON.stringify(said))
}

function hush(live: Live): undefined {
  for (const one of live.sounding) one.stop()
  live.sounding.clear()
  live.nextAt = 0
}

function sound(live: Live, bytes: Uint8Array): undefined {
  const floats = floatsOf(bytes)
  if (floats.length === 0) return
  const buffer = live.context.createBuffer(1, floats.length, SAID_RATE)
  buffer.copyToChannel(floats, 0)
  const source = live.context.createBufferSource()
  source.buffer = buffer
  source.connect(live.context.destination)
  const at = Math.max(live.context.currentTime, live.nextAt)
  source.start(at)
  live.nextAt = at + buffer.duration
  live.sounding.add(source)
  source.onended = () => live.sounding.delete(source)
}

function heardFrom(live: Live, samples: Float32Array): undefined {
  const made = pcm16Of(samples, live.context.sampleRate)
  live.heard.push(made)
  live.heardLength += made.length
  if (live.heardLength < HEARD_EVERY_SAMPLES) return
  const joined = new Int16Array(live.heardLength)
  let at = 0
  for (const one of live.heard) {
    joined.set(one, at)
    at += one.length
  }
  live.heard = []
  live.heardLength = 0
  const data = base64Of(new Uint8Array(joined.buffer))
  sent(live, { realtimeInput: { audio: { data, mimeType: "audio/pcm;rate=16000" } } })
}

export function useSeatVoice(
  seat: string,
  entries: readonly Entry[],
  send: (text: string) => undefined
): Voice {
  const [state, setState] = useState<VoiceState>({ kind: "off" })
  const living = useRef<Live | null>(null)
  const heldEntries = useRef(entries)
  heldEntries.current = entries
  const sending = useRef(send)
  sending.current = send

  const stop = useCallback((why: string | null): undefined => {
    const live = living.current
    living.current = null
    if (live !== null) {
      live.ended = true
      live.ws?.close()
      for (const track of live.stream?.getTracks() ?? []) track.stop()
      hush(live)
      void live.context.close().catch(() => undefined)
    }
    audioSessionAs("auto")
    setState(why === null ? { kind: "off" } : { kind: "failed", why })
  }, [])

  const heardSaid = useCallback((live: Live, said: Record<string, unknown>): undefined => {
    const content = said.serverContent as
      | { modelTurn?: { parts?: { inlineData?: { data?: string } }[] }; interrupted?: boolean }
      | undefined
    if (said.setupComplete !== undefined) {
      live.reconnects = 0
      setState({ kind: "live" })
    }
    if (content?.interrupted === true) hush(live)
    for (const part of content?.modelTurn?.parts ?? []) {
      const data = part.inlineData?.data
      if (data !== undefined) sound(live, bytesOf(data))
    }
    const calls = (
      said.toolCall as {
        functionCalls?: { id: string; name: string; args?: { message?: unknown } }[]
      }
    )?.functionCalls
    for (const call of calls ?? []) {
      const message = call.args?.message
      if (call.name !== ASK_SEAT || typeof message !== "string" || message.trim() === "") continue
      live.asked.set(call.id, { message, seen: timesSent(heldEntries.current, message) })
      sending.current(message.trim())
    }
    const cancelled = (said.toolCallCancellation as { ids?: string[] } | undefined)?.ids
    for (const id of cancelled ?? []) live.asked.delete(id)
    const update = said.sessionResumptionUpdate as
      | { newHandle?: string; resumable?: boolean }
      | undefined
    if (update?.resumable === true && update.newHandle) live.handle = update.newHandle
    if (said.goAway !== undefined) live.ws?.close()
    return undefined
  }, [])

  const connect = useCallback(
    async (live: Live): Promise<undefined> => {
      let token: string
      try {
        token = await tokenFor(seat)
      } catch (cause) {
        stop(String(cause instanceof Error ? cause.message : cause))
        return
      }
      if (live.ended) return
      const ws = new WebSocket(`${LIVE_AT}?access_token=${encodeURIComponent(token)}`)
      live.ws = ws
      ws.onopen = () => {
        const resumed = live.handle === null ? {} : { sessionResumption: { handle: live.handle } }
        ws.send(JSON.stringify({ setup: { model: LIVE_MODEL, ...resumed } }))
      }
      ws.onmessage = async (event) => {
        const text =
          typeof event.data === "string" ? event.data : await new Response(event.data).text()
        let said: unknown
        try {
          said = JSON.parse(text)
        } catch {
          return
        }
        if (said !== null && typeof said === "object")
          heardSaid(live, said as Record<string, unknown>)
      }
      ws.onclose = (event) => {
        if (live.ended || live.ws !== ws) return
        if (live.reconnects >= RECONNECTS) {
          stop(`The voice connection closed (${event.code} ${event.reason})`.trim())
          return
        }
        live.reconnects += 1
        setState({ kind: "connecting" })
        void connect(live)
      }
      return undefined
    },
    [seat, stop, heardSaid]
  )

  const start = useCallback(async (): Promise<undefined> => {
    const context = new AudioContext()
    const live: Live = {
      ws: null,
      context,
      stream: null,
      heard: [],
      heardLength: 0,
      nextAt: 0,
      sounding: new Set(),
      handle: null,
      asked: new Map(),
      ended: false,
      reconnects: 0,
    }
    living.current = live
    setState({ kind: "connecting" })
    try {
      audioSessionAs("play-and-record")
      await context.resume()
      live.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      })
      if (live.ended) return
      const node = context.createScriptProcessor(HEARD_BLOCK, 1, 1)
      node.onaudioprocess = (event) => heardFrom(live, event.inputBuffer.getChannelData(0).slice())
      const quiet = context.createGain()
      quiet.gain.value = 0
      context.createMediaStreamSource(live.stream).connect(node)
      node.connect(quiet).connect(context.destination)
    } catch (cause) {
      stop(
        `The microphone would not open (${cause instanceof Error ? cause.message : String(cause)})`
      )
      return
    }
    await connect(live)
    return undefined
  }, [connect, stop])

  const toggle = useCallback((): undefined => {
    if (living.current === null) void start()
    else stop(null)
  }, [start, stop])

  useEffect(() => {
    const live = living.current
    if (live === null) return
    for (const [id, asked] of live.asked) {
      const reply = replyAfter(entries, asked.message, asked.seen)
      if (reply === null) continue
      live.asked.delete(id)
      sent(live, {
        toolResponse: {
          functionResponses: [
            {
              id,
              name: ASK_SEAT,
              response: { reply: reply || "(no words)", scheduling: "WHEN_IDLE" },
            },
          ],
        },
      })
    }
  }, [entries])

  useEffect(() => () => stop(null), [stop])

  return { state, toggle }
}
