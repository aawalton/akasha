"use client"

import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { PenLine } from "lucide-react"
import { useState } from "react"

const CHAPTER_WRITE_AT = "/api/chapter-write"

const NO_ANSWER = "The story did not respond. Try again."

const UNAUTHORIZED = 401

const SIGNED_OUT = "Sign in to start a chapter."

type Sent =
  | { readonly ok: true; readonly slug: string }
  | { readonly ok: false; readonly error: string }

async function chapterStarted(story: string): Promise<Sent> {
  try {
    const answered = await apiFetch(CHAPTER_WRITE_AT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story }),
    })
    if (answered.status === UNAUTHORIZED) return { ok: false, error: SIGNED_OUT }
    const held: unknown = await answered.json()
    const body = typeof held === "object" && held !== null ? (held as Record<string, unknown>) : {}
    const slug = textIn(body["slug"])
    if (body["ok"] === true && slug !== null) return { ok: true, slug }
    return { ok: false, error: textIn(body["error"]) ?? NO_ANSWER }
  } catch {
    return { ok: false, error: NO_ANSWER }
  }
}

export function ChapterWriteButton({ story }: { readonly story: string }) {
  const [sending, setSending] = useState(false)
  const [said, setSaid] = useState<string | null>(null)
  const pressed = () => {
    if (sending) return
    setSending(true)
    setSaid(null)
    void chapterStarted(story).then((sent) => {
      setSaid(sent.ok ? `Chapter ${sent.slug} is started.` : sent.error)
      setSending(false)
    })
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <Button variant="secondary" disabled={sending} aria-busy={sending} onClick={pressed}>
        <PenLine aria-hidden />
        Write next chapter
      </Button>
      {said === null ? null : (
        <p role="status" className="text-[12px] text-secondary">
          {said}
        </p>
      )}
    </div>
  )
}
