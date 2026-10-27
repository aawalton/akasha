"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "akasha/design/interface/primitive/modules/collapsible/collapsible.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { ChevronDown } from "lucide-react"
import { type ReactNode, useState } from "react"

export type SheetActing = {
  readonly gameExternalId: string | undefined
  readonly submitPlayerAction: SubmitPlayerAction | undefined
}

export type Act = {
  readonly label: string
  readonly text: string
  readonly tone: "drop" | "plain" | "use"
}

const NO_ACTS: readonly Act[] = []

const SENT = "Sent as your next turn."

const ROW =
  "flex w-full items-baseline justify-between gap-3 border-surface-3 border-b border-dotted py-[3px] font-mono text-[12.5px]"

const TONES: Record<Act["tone"], string> = {
  drop: "text-red",
  plain: "",
  use: "",
}

const VARIANTS = { drop: "secondary", plain: "secondary", use: "accent" } as const

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.18em]">{title}</div>
      {children}
    </div>
  )
}

export function Rows({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>
}

type Said = { readonly name?: string | undefined; readonly note?: string | undefined }

export function searched<Held extends Said>(held: readonly Held[], query: string): Held[] {
  const asked = query.trim().toLowerCase()
  if (asked === "") return [...held]
  return held.filter(
    (one) =>
      (one.name ?? "").toLowerCase().includes(asked) ||
      (one.note ?? "").toLowerCase().includes(asked)
  )
}

export function byName<Held extends Said>(held: readonly Held[]): Held[] {
  return [...held].sort((one, other) => (one.name ?? "").localeCompare(other.name ?? ""))
}

export function Searched({
  label,
  children,
}: {
  label: string
  children: (query: string) => ReactNode
}) {
  const [query, setQuery] = useState("")
  return (
    <div className="flex flex-col gap-3">
      <Input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Search ${label}`}
        aria-label={`Search ${label}`}
        className="h-8 font-mono text-[12.5px]"
      />
      {children(query)}
    </div>
  )
}

export function NoneFound() {
  return <div className="font-mono text-[12px] text-tertiary">nothing matches</div>
}

function actableBy(userId: string | null, acting: SheetActing | undefined): boolean {
  return (
    userId !== null &&
    acting?.gameExternalId !== undefined &&
    acting.submitPlayerAction !== undefined
  )
}

function ActButton({ act, busy, onAct }: { act: Act; busy: boolean; onAct: (act: Act) => void }) {
  return (
    <Button
      type="button"
      size="xs"
      variant={VARIANTS[act.tone]}
      className={TONES[act.tone]}
      disabled={busy}
      onClick={() => onAct(act)}
    >
      {act.label}
    </Button>
  )
}

function ActRow({ acts, acting }: { acts: readonly Act[]; acting: SheetActing }) {
  const [busy, setBusy] = useState(false)
  const [said, setSaid] = useState<{ readonly ok: boolean; readonly text: string } | null>(null)
  async function onAct(act: Act) {
    const game = acting.gameExternalId
    const submit = acting.submitPlayerAction
    if (busy || game === undefined || submit === undefined) return
    setBusy(true)
    setSaid(null)
    const result = await submit({ gameExternalId: game, text: act.text })
    setSaid(result.ok ? { ok: true, text: SENT } : { ok: false, text: result.error })
    setBusy(false)
  }
  const dropping = acts.filter((act) => act.tone === "drop")
  const rest = acts.filter((act) => act.tone !== "drop")
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {dropping.map((act) => (
            <ActButton key={act.label} act={act} busy={busy} onAct={onAct} />
          ))}
        </div>
        <div className="flex gap-2">
          {rest.map((act) => (
            <ActButton key={act.label} act={act} busy={busy} onAct={onAct} />
          ))}
        </div>
      </div>
      {said === null ? null : (
        <span className={`font-mono text-[11px] ${said.ok ? "text-tertiary" : "text-red"}`}>
          {said.text}
        </span>
      )}
    </div>
  )
}

type EntryProps = {
  readonly name: string
  readonly right?: ReactNode
  readonly note?: string | undefined
  readonly detail?: ReactNode
  readonly acts?: readonly Act[] | undefined
  readonly acting?: SheetActing | undefined
}

export function Entry({ name, right, note, detail, acts = NO_ACTS, acting }: EntryProps) {
  const userId = useUserId()
  const said = note === undefined || note.trim() === "" ? null : note
  const actable = acts.length > 0 && acting !== undefined && actableBy(userId, acting)
  const line = (
    <>
      <span className="min-w-0 flex-1 break-words text-left text-primary">{name}</span>
      <span className="flex flex-none items-baseline gap-[6px] text-accent tabular-nums">
        {right}
      </span>
    </>
  )
  if (said === null && detail === undefined && !actable) return <div className={ROW}>{line}</div>
  return (
    <Collapsible className="group/entry flex flex-col">
      <CollapsibleTrigger className={`${ROW} hover:text-accent`}>
        {line}
        <ChevronDown className="size-3 flex-none self-center text-tertiary transition-transform group-data-[state=open]/entry:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`mt-1 mb-2 flex flex-col gap-2 rounded-lg ${surfaceClass(2)} p-3`}
      >
        {detail}
        {said === null ? null : (
          <p className="font-sans text-[13px] text-secondary leading-relaxed">{said}</p>
        )}
        {actable ? <ActRow acts={acts} acting={acting} /> : null}
      </CollapsibleContent>
    </Collapsible>
  )
}
