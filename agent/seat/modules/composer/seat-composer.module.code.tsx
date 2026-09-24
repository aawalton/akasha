"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { type KeyboardEvent, useState } from "react"

const SEND_AT = "/api/seat/message"

function refusalIn(said: unknown): string | null {
  if (typeof said !== "object" || said === null || !("error" in said)) return null
  return typeof said.error === "string" && said.error !== "" ? said.error : null
}

export async function sentToSeat(seat: string, body: string): Promise<string | null> {
  let answered: Response
  try {
    answered = await fetch(SEND_AT, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ seat, body }),
    })
  } catch (cause) {
    return `${SEND_AT} gave no answer (${String(cause)})`
  }
  if (answered.ok) return null
  try {
    return refusalIn(await answered.json()) ?? `${SEND_AT} answered ${answered.status}`
  } catch {
    return `${SEND_AT} answered ${answered.status}`
  }
}

function sendsNow(event: KeyboardEvent<HTMLTextAreaElement>): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing
}

export function SeatComposer({ onSend }: { onSend: (text: string) => void }) {
  const [draft, setDraft] = useState("")
  const empty = draft.trim() === ""
  const send = () => {
    if (empty) return
    onSend(draft.trim())
    setDraft("")
  }
  return (
    <div className="mx-auto flex w-full max-w-[710px] items-end gap-2 px-4 py-2">
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
  )
}
