"use client"

import type { Voice } from "akasha/agent/seat/voice/modules/live/seat-voice-live.module.code.ts"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  sendsNow,
  Textarea,
  useReturnSends,
} from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { ImagePlus, LoaderCircle, Mic, MicOff, X } from "lucide-react"
import { type ChangeEvent, useEffect, useRef, useState } from "react"

const SEND_AT = "/api/seat/message"

const KEEP_AT = "/api/seat/image"

const JPEG = "image/jpeg"

const JPEG_QUALITY = 0.88

const LONGEST_EDGE = 2048

const IMAGES_HELD = 8

type Attached = { readonly key: number; readonly file: File; readonly url: string }

type Posted =
  | { readonly said: unknown }
  | { readonly refused: string; readonly unanswered: boolean }

export type Unsent = { readonly why: string; readonly unanswered: boolean }

const WAITS_MS = [1_000, 2_000, 4_000, 8_000]

const UNANSWERED: ReadonlySet<number> = new Set([502, 503, 504, 520, 521, 522, 523, 524])

function refusalIn(said: unknown): string | null {
  if (typeof said !== "object" || said === null || !("error" in said)) return null
  return typeof said.error === "string" && said.error !== "" ? said.error : null
}

function imageIn(said: unknown): string | null {
  if (typeof said !== "object" || said === null || !("image" in said)) return null
  return typeof said.image === "string" ? said.image : null
}

async function postedOnce(at: string, type: string, body: BodyInit): Promise<Posted> {
  let answered: Response
  try {
    answered = await fetch(at, {
      method: "POST",
      headers: { accept: "application/json", "content-type": type },
      body,
    })
  } catch (cause) {
    return { refused: `${at} gave no answer (${String(cause)})`, unanswered: true }
  }
  let said: unknown = null
  try {
    said = await answered.json()
  } catch {
    said = null
  }
  if (answered.ok) return { said }
  return {
    refused: refusalIn(said) ?? `${at} answered ${answered.status}`,
    unanswered: UNANSWERED.has(answered.status),
  }
}

async function posted(at: string, type: string, body: BodyInit): Promise<Posted> {
  let held = await postedOnce(at, type, body)
  for (const wait of WAITS_MS) {
    if (!("refused" in held) || !held.unanswered) return held
    await new Promise((settle) => setTimeout(settle, wait))
    held = await postedOnce(at, type, body)
  }
  return held
}

async function jpegOf(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, LONGEST_EDGE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const drawing = canvas.getContext("2d")
  if (drawing === null) throw new Error("this browser draws on no canvas")
  drawing.fillStyle = "white"
  drawing.fillRect(0, 0, canvas.width, canvas.height)
  drawing.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return await new Promise((settle, fail) => {
    canvas.toBlob(
      (blob) => (blob === null ? fail(new Error("no jpg came out")) : settle(blob)),
      JPEG,
      JPEG_QUALITY
    )
  })
}

async function keptImage(
  seat: string,
  file: File
): Promise<{ readonly image: string } | { readonly refused: string }> {
  let bytes: Blob
  try {
    bytes = await jpegOf(file)
  } catch (cause) {
    return { refused: `${file.name} would not open as an image (${String(cause)})` }
  }
  const held = await posted(`${KEEP_AT}?seat=${encodeURIComponent(seat)}`, JPEG, bytes)
  if ("refused" in held) return held
  const image = imageIn(held.said)
  return image === null ? { refused: `${KEEP_AT} named no image kept` } : { image }
}

export async function sentToSeat(
  seat: string,
  body: string,
  files: readonly File[] = [],
  id: string = uuidVersion7()
): Promise<Unsent | null> {
  const images: string[] = []
  for (const file of files) {
    const kept = await keptImage(seat, file)
    if ("refused" in kept) return { why: kept.refused, unanswered: false }
    images.push(kept.image)
  }
  const sent = JSON.stringify({ id, seat, body, images })
  const held = await posted(SEND_AT, "application/json", sent)
  return "refused" in held ? { why: held.refused, unanswered: held.unanswered } : null
}

function useAttached() {
  const [attached, setAttached] = useState<readonly Attached[]>([])
  const keyed = useRef(0)
  const held = useRef(attached)
  held.current = attached
  useEffect(
    () => () => {
      for (const one of held.current) URL.revokeObjectURL(one.url)
    },
    []
  )
  const add = (event: ChangeEvent<HTMLInputElement>) => {
    const room = Math.max(0, IMAGES_HELD - held.current.length)
    const added = [...(event.target.files ?? [])].slice(0, room).map((file) => {
      keyed.current += 1
      return { key: keyed.current, file, url: URL.createObjectURL(file) }
    })
    event.target.value = ""
    setAttached([...held.current, ...added])
  }
  const remove = (key: number) => {
    for (const one of held.current) if (one.key === key) URL.revokeObjectURL(one.url)
    setAttached(held.current.filter((one) => one.key !== key))
  }
  const clear = () => {
    for (const one of held.current) URL.revokeObjectURL(one.url)
    setAttached([])
  }
  return { attached, add, remove, clear }
}

function Thumbnail({ one, remove }: { one: Attached; remove: (key: number) => void }) {
  return (
    <li className="relative shrink-0">
      <img src={one.url} alt={one.file.name} className="size-16 rounded-md object-cover" />
      <button
        type="button"
        aria-label={`Remove ${one.file.name}`}
        onClick={() => remove(one.key)}
        className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-black/70 text-white"
      >
        <X className="size-3.5" />
      </button>
    </li>
  )
}

function VoiceButton({ voice }: { voice: Voice }) {
  const kind = voice.state.kind
  const talking = kind === "live" || kind === "connecting"
  return (
    <Button
      variant={talking ? "accent" : "tertiary"}
      size="icon-lg"
      aria-label={talking ? "Stop talking" : "Talk by voice"}
      aria-pressed={talking}
      onClick={voice.toggle}
    >
      {kind === "connecting" ? (
        <LoaderCircle className="size-5 animate-spin" />
      ) : kind === "live" ? (
        <MicOff className="size-5" />
      ) : (
        <Mic className="size-5" />
      )}
    </Button>
  )
}

export function SeatComposer({
  onSend,
  voice,
}: {
  onSend: (text: string, images: readonly File[]) => void
  voice?: Voice
}) {
  const [draft, setDraft] = useState("")
  const { attached, add, remove, clear } = useAttached()
  const picker = useRef<HTMLInputElement | null>(null)
  const empty = draft.trim() === "" && attached.length === 0
  const send = () => {
    if (empty) return
    onSend(
      draft.trim(),
      attached.map((one) => one.file)
    )
    setDraft("")
    clear()
  }
  const returnSends = useReturnSends(send)
  return (
    <div className="mx-auto flex w-full max-w-[710px] flex-col gap-2 px-4 py-2">
      {voice?.state.kind === "failed" && (
        <p className="font-mono text-secondary text-xs" role="alert">
          Voice stopped: {voice.state.why}
        </p>
      )}
      {attached.length > 0 && (
        <ul className="flex gap-3 overflow-x-auto pt-1.5" aria-label="Images attached">
          {attached.map((one) => (
            <Thumbnail key={one.key} one={one} remove={remove} />
          ))}
        </ul>
      )}
      <div className="flex items-end gap-2">
        <input
          ref={picker}
          type="file"
          accept="image/*"
          multiple
          hidden
          aria-label="Images to attach"
          onChange={add}
        />
        <Button
          variant="tertiary"
          size="icon-lg"
          aria-label="Attach an image"
          disabled={attached.length >= IMAGES_HELD}
          onClick={() => picker.current?.click()}
        >
          <ImagePlus className="size-5" />
        </Button>
        <Textarea
          ref={returnSends}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (!sendsNow(event)) return
            event.preventDefault()
            send()
          }}
          rows={1}
          enterKeyHint="send"
          placeholder="Message"
          aria-label="Message to this seat"
          className="max-h-48 min-h-10 flex-1 resize-none"
        />
        {voice !== undefined && <VoiceButton voice={voice} />}
        <Button
          variant="accent"
          className="hidden h-10 min-[584px]:inline-flex"
          disabled={empty}
          onClick={send}
        >
          Send
        </Button>
      </div>
    </div>
  )
}
