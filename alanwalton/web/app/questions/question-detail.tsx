"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Button } from "@shared/design-primitives/components/button"
import { Textarea } from "@shared/design-primitives/components/textarea"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { formatRelativeTime } from "@shared/design-primitives/utils/format-relative-time"
import {
  OPEN_QUESTION_STATUS,
  QUESTION_PAGE_TYPE_SLUG,
  type QuestionLink,
} from "@shared/open-questions"
import { usePage } from "@shared/pages-ui/supabase/use-page"
import { PageTypeSlug } from "@shared/pages-url"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router"
import { SignedOutNotice } from "~/components/signed-out-notice"
import { API_ORIGIN } from "~/lib/api-origin"
import { isNativeShell } from "~/lib/capacitor-bridge"
import { dispatchOpenQuestionsResync } from "~/lib/open-questions-resync"
import { decideLinkTarget } from "./lib/link-target"
import { type ResolveAction, resolveQuestion } from "./lib/resolve-question"

const QUESTION_TYPE = PageTypeSlug(QUESTION_PAGE_TYPE_SLUG)

function toAbsoluteMediaUrl(url: string): string {
  return url.startsWith("/") ? `${API_ORIGIN}${url}` : url
}

function initials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => p !== "")
  if (parts.length === 0) return "?"
  const first = parts[0]?.[0] ?? ""
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : ""
  const initials = (first + second).toUpperCase()
  return initials === "" ? "?" : initials
}

type QuestionDetailProps = {
  question: {
    id: string
    title: string
    context: string | null
    options: readonly string[]
    links: readonly QuestionLink[]
    status: string
    askedAtMs: number
  }
  persona: {
    id: string
    handle: string | null
    name: string
    avatarUrl: string | null
    chatHref: string | null
  } | null
}

export default function QuestionDetail(props: QuestionDetailProps) {
  return <QuestionDetailBody key={props.question.id} {...props} />
}

function QuestionDetailBody(props: QuestionDetailProps) {
  const { question, persona } = props
  const navigate = useNavigate()

  const { page } = usePage({ pageTypeSlug: QUESTION_TYPE, id: question.id })
  const liveStatus =
    typeof page?.properties.status === "string" ? page.properties.status : question.status
  const isOpen = liveStatus === OPEN_QUESTION_STATUS

  const [text, setText] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signedOut, setSignedOut] = useState(false)
  const [caughtUp, setCaughtUp] = useState(false)

  async function resolve(action: ResolveAction, content?: string, answeredOptionIndex?: number) {
    if (pending) return
    setPending(true)
    setError(null)
    setSignedOut(false)
    const result = await resolveQuestion({
      questionId: question.id,
      action,
      content,
      answeredOptionIndex,
    })
    if (!result.ok) {
      setSignedOut(result.signedOut === true)
      setError(result.error)
      setPending(false)
      return
    }
    dispatchOpenQuestionsResync()
    if (result.nextHref !== null) {
      navigate(result.nextHref)
      return
    }
    setCaughtUp(true)
    setPending(false)
  }

  function onOption(option: string, index: number) {
    void resolve("answer", option, index)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === "") return
    void resolve("answer", trimmed)
  }

  function onDismiss() {
    void resolve("dismiss")
  }

  if (caughtUp) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-1 px-6 text-center">
        <p className="font-display font-semibold text-lg text-secondary">All caught up</p>
        <p className="font-read text-[15px] text-tertiary">No open questions.</p>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-1 px-6 text-center">
        <p className="font-display font-semibold text-lg text-secondary">Already resolved</p>
        <p className="font-read text-[15px] text-tertiary">
          This question was answered or dismissed elsewhere.
        </p>
      </div>
    )
  }

  const age = formatRelativeTime(question.askedAtMs)
  const hasContext = question.context != null && question.context.trim() !== ""

  const canChat = persona?.chatHref != null && persona.chatHref !== ""
  const personaRowInner = (
    <>
      {persona?.avatarUrl != null && persona.avatarUrl !== "" ? (
        <img
          src={toAbsoluteMediaUrl(persona.avatarUrl)}
          alt=""
          className="size-9 rounded-full object-cover"
        />
      ) : (
        <span
          className={`flex size-9 items-center justify-center rounded-full font-mono text-[12px] text-tertiary ${surfaceClass(2)}`}
        >
          {persona != null ? initials(persona.name) : "?"}
        </span>
      )}
      <div className="flex flex-col">
        <span className="font-read text-[15px] text-secondary">
          {persona != null ? persona.name : "Someone"}
        </span>
        {age != null ? (
          <span className="font-mono text-[12px] text-tertiary">asked {age} ago</span>
        ) : null}
      </div>
    </>
  )

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 px-4 pt-4 pb-[var(--content-clearance-bottom-nav)] min-[584px]:pb-8">
      {canChat ? (
        <a href={persona?.chatHref ?? undefined} className="flex items-center gap-3">
          {personaRowInner}
        </a>
      ) : (
        <div className="flex items-center gap-3">{personaRowInner}</div>
      )}

      <h1 className="font-display font-semibold text-primary text-xl">{question.title}</h1>

      {hasContext ? (
        <div className={`rounded-lg px-3 py-2 ${surfaceClass(1)}`}>
          <p className="whitespace-pre-wrap font-read text-[15px] text-secondary">
            {question.context}
          </p>
        </div>
      ) : null}

      {question.links.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[12px] text-tertiary uppercase tracking-wide">
            Review
          </span>
          {question.links.map((link, i) => (
            <ReviewLinkCard key={`link-${i}`} link={link} />
          ))}
        </div>
      ) : null}

      {question.options.length > 0 ? (
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => (
            <Button
              key={`option-${i}`}
              type="button"
              variant="secondary"
              disabled={pending}
              onClick={() => onOption(option, i)}
              className="justify-start whitespace-normal text-left"
            >
              {option}
            </Button>
          ))}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a response…"
          aria-label="Response"
          disabled={pending}
        />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" disabled={pending || text.trim() === ""}>
            {pending ? "Sending…" : "Answer"}
          </Button>
          <Button type="button" variant="secondary" disabled={pending} onClick={onDismiss}>
            Dismiss
          </Button>
        </div>
      </form>

      {signedOut ? (
        <SignedOutNotice />
      ) : error != null ? (
        <p className="font-mono text-[12px] text-red">⚠ {error}</p>
      ) : null}
    </div>
  )
}

function ReviewLinkCard({ link }: { link: QuestionLink }) {
  const navigate = useNavigate()
  const target = decideLinkTarget(link, { inNativeShell: isNativeShell() })

  const leavesApp =
    target.kind === "browser-tab" ||
    target.kind === "system-browser" ||
    target.kind === "app-scheme"
  const inner = (
    <>
      <Badge variant={link.platform === "web" ? "blue" : "purple"}>
        {`${link.platform === "web" ? "Web" : "Native"} ${leavesApp ? "↗" : "→"}`}
      </Badge>
      <span className="font-read text-[15px] text-secondary">{link.label}</span>
    </>
  )
  const base = `flex items-center gap-3 rounded-lg border border-transparent p-3 text-left transition-colors ${surfaceClass(1)}`
  const tappable = `${base} hover:border-accent`

  switch (target.kind) {
    case "browser-tab":
      return (
        <a href={target.href} target="_blank" rel="noopener noreferrer" className={tappable}>
          {inner}
        </a>
      )
    case "system-browser":
      return (
        <a
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault()
            window.open(target.href, "_system")
          }}
          className={tappable}
        >
          {inner}
        </a>
      )
    case "in-app-nav":
      return (
        <button type="button" onClick={() => navigate(target.path)} className={tappable}>
          {inner}
        </button>
      )
    case "app-scheme":
      return (
        <a href={target.url} className={tappable}>
          {inner}
        </a>
      )
    case "unresolvable":
      return (
        <div aria-disabled="true" title="Link unavailable" className={`${base} opacity-50`}>
          {inner}
        </div>
      )
    default:
      return assertNever(target)
  }
}
