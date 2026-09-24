"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { ImagePlus, X } from "lucide-react"
import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react"

const SEND_AT = "/api/seat/message"

const KEEP_AT = "/api/seat/image"

const JPEG = "image/jpeg"

const JPEG_QUALITY = 0.88

const LONGEST_EDGE = 2048

const IMAGES_HELD = 8

type Attached = { readonly key: number; readonly file: File; readonly url: string }

type Posted = { readonly said: unknown } | { readonly refused: string }

function refusalIn(said: unknown): string | null {
  if (typeof said !== "object" || said === null || !("error" in said)) return null
  return typeof said.error === "string" && said.error !== "" ? said.error : null
}

function imageIn(said: unknown): string | null {
  if (typeof said !== "object" || said === null || !("image" in said)) return null
  return typeof said.image === "string" ? said.image : null
}

async function posted(at: string, type: string, body: BodyInit): Promise<Posted> {
  let answered: Response
  try {
    answered = await fetch(at, {
      method: "POST",
      headers: { accept: "application/json", "content-type": type },
      body,
    })
  } catch (cause) {
    return { refused: `${at} gave no answer (${String(cause)})` }
  }
  let said: unknown = null
  try {
    said = await answered.json()
  } catch {
    said = null
  }
  if (answered.ok) return { said }
  return { refused: refusalIn(said) ?? `${at} answered ${answered.status}` }
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
  file: File
): Promise<{ readonly image: string } | { readonly refused: string }> {
  let bytes: Blob
  try {
    bytes = await jpegOf(file)
  } catch (cause) {
    return { refused: `${file.name} would not open as an image (${String(cause)})` }
  }
  const held = await posted(KEEP_AT, JPEG, bytes)
  if ("refused" in held) return held
  const image = imageIn(held.said)
  return image === null ? { refused: `${KEEP_AT} named no image kept` } : { image }
}

export async function sentToSeat(
  seat: string,
  body: string,
  files: readonly File[] = []
): Promise<string | null> {
  const images: string[] = []
  for (const file of files) {
    const kept = await keptImage(file)
    if ("refused" in kept) return kept.refused
    images.push(kept.image)
  }
  const held = await posted(SEND_AT, "application/json", JSON.stringify({ seat, body, images }))
  return "refused" in held ? held.refused : null
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

function sendsNow(event: KeyboardEvent<HTMLTextAreaElement>): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing
}

export function SeatComposer({
  onSend,
}: {
  onSend: (text: string, images: readonly File[]) => void
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
  return (
    <div className="mx-auto flex w-full max-w-[710px] flex-col gap-2 px-4 py-2">
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
        <Button variant="accent" className="h-10" disabled={empty} onClick={send}>
          Send
        </Button>
      </div>
    </div>
  )
}
