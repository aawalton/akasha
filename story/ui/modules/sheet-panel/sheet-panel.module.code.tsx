"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"

import type {
  ClientLedgerLine,
  ClientSheet,
} from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import {
  useDerived,
  type Working,
} from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.18em]">{title}</div>
      {children}
    </div>
  )
}

function Rows({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

function NoteName({ name, note }: { name: string; note: string | undefined }) {
  if (note == null || note.trim() === "") {
    return <span className="break-words text-primary">{name}</span>
  }
  return (
    <Popover>
      <PopoverTrigger className="break-words text-left text-primary hover:text-accent">
        {name}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col gap-1 font-sans text-[13px] text-secondary leading-relaxed"
      >
        <div className="font-mono text-[11px] text-accent uppercase tracking-wide">{name}</div>
        {note}
      </PopoverContent>
    </Popover>
  )
}

function LadderRow({
  name,
  note,
  right,
}: {
  name: string
  note: string | undefined
  right: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 font-mono text-[12.5px]">
      <span className="min-w-0 flex-1 break-words">
        <NoteName name={name} note={note} />
      </span>
      <span className="flex flex-none items-baseline gap-[6px] text-accent">{right}</span>
    </div>
  )
}

const SHOWN_NUMBER: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }

function shownOf(value: number | string): string {
  return typeof value === "number" ? value.toLocaleString(undefined, SHOWN_NUMBER) : value
}

function ScalarRows({
  record,
  single = false,
}: {
  record: Readonly<Record<string, number | string>>
  single?: boolean
}) {
  const entries = Object.entries(record)
  return (
    <div
      className={`grid ${single ? "grid-cols-1" : "grid-cols-2"} gap-x-[14px] gap-y-[7px] font-mono text-[12.5px]`}
    >
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-baseline justify-between gap-2 border-surface-3 border-b border-dotted py-[2px]"
        >
          <span className="flex-none text-tertiary">{key}</span>
          <b className="min-w-0 break-words text-right font-bold text-accent">{shownOf(value)}</b>
        </div>
      ))}
    </div>
  )
}

const SPENT = "−"

function LedgerLines({ name, lines }: { name: string; lines: readonly ClientLedgerLine[] }) {
  return (
    <PopoverContent
      align="start"
      className="flex max-h-[60vh] w-[min(22rem,90vw)] flex-col gap-1 overflow-y-auto font-mono text-[12px]"
    >
      <div className="text-[11px] text-accent uppercase tracking-wide">{name}</div>
      {lines.map((line, i) => (
        <div
          key={`${String(line.turn)}-${String(i)}`}
          className="flex flex-col gap-[1px] border-surface-3 border-b border-dotted py-[3px]"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="flex-none text-tertiary">Turn {line.turn}</span>
            <span
              className={`min-w-0 break-words text-right ${line.change.startsWith(SPENT) ? "text-secondary" : "text-accent"}`}
            >
              {line.change}
            </span>
          </div>
          <div className="min-w-0 break-words text-right text-tertiary">{line.total}</div>
        </div>
      ))}
    </PopoverContent>
  )
}

function PurseRows({
  purse,
  ledgers,
}: {
  purse: Readonly<Record<string, number | string>>
  ledgers: Readonly<Record<string, readonly ClientLedgerLine[]>> | undefined
}) {
  return (
    <div className="flex flex-col gap-y-[7px] font-mono text-[12.5px]">
      {Object.entries(purse).map(([name, value]) => {
        const lines = ledgers?.[name] ?? []
        const row = (
          <>
            <span className="flex-none text-tertiary">{name}</span>
            <b className="min-w-0 break-words text-right font-bold text-accent">{shownOf(value)}</b>
          </>
        )
        const rowClass =
          "flex w-full items-baseline justify-between gap-2 border-surface-3 border-b border-dotted py-[2px]"
        if (lines.length === 0) {
          return (
            <div key={name} className={rowClass}>
              {row}
            </div>
          )
        }
        return (
          <Popover key={name}>
            <PopoverTrigger className={`${rowClass} text-left hover:text-accent`}>
              {row}
            </PopoverTrigger>
            <LedgerLines name={name} lines={lines} />
          </Popover>
        )
      })}
    </div>
  )
}

type Counted = { readonly name?: string; readonly value?: number; readonly note?: string }

function CountedRows({ title, held }: { title: string; held: readonly Counted[] }) {
  if (held.length === 0) return null
  return (
    <Section title={title}>
      <Rows>
        {[...held]
          .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
          .map((one, i) => (
            <LadderRow
              key={one.name != null ? one.name : `${title}-${i}`}
              name={one.name ?? ""}
              note={one.note}
              right={
                one.value != null ? (
                  <span className="text-accent tabular-nums">{one.value}</span>
                ) : null
              }
            />
          ))}
      </Rows>
    </Section>
  )
}

function StatsTab({
  sheet,
  game,
  workings,
}: {
  sheet: ClientSheet
  game: string | undefined
  workings: readonly Working[] | undefined
}) {
  const attributes = sheet.attributes
  const resources = sheet.resources
  const derived = useDerived(game, workings) ?? {}
  const profile: Record<string, string> = {
    ...(sheet.kind != null ? { Species: sheet.kind } : {}),
    ...(sheet.class != null ? { Class: sheet.class } : {}),
    ...(sheet.rank != null ? { Rank: sheet.rank } : {}),
    ...(sheet.status != null ? { Status: sheet.status } : {}),
  }
  return (
    <div className="flex flex-col gap-3">
      {Object.keys(profile).length > 0 ? (
        <Section title="Profile">
          <ScalarRows record={profile} single />
        </Section>
      ) : null}
      {resources !== undefined ? (
        <Section title="Resources">
          <ScalarRows record={resources} single />
        </Section>
      ) : null}
      {attributes !== undefined ? (
        <Section title="Attributes">
          <ScalarRows record={attributes} />
        </Section>
      ) : null}

      {Object.keys(derived).length > 0 ? (
        <Section title="Derived">
          <ScalarRows record={derived} />
        </Section>
      ) : null}
    </div>
  )
}

function SkillsTab({ sheet, showsBonds }: { sheet: ClientSheet; showsBonds: boolean }) {
  const skills = sheet.skills ?? []
  const traits = sheet.traits ?? []
  const titles = sheet.titles ?? []
  return (
    <div className="flex flex-col gap-3">
      <Section title="Skills">
        {skills.length === 0 ? (
          <div className="font-mono text-[12px] text-tertiary">none yet</div>
        ) : (
          <Rows>
            {[...skills]
              .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
              .map((s, i) => (
                <LadderRow
                  key={s.name != null ? s.name : `skill-${i}`}
                  name={s.name ?? ""}
                  note={s.note}
                  right={
                    <>
                      {s.rank != null ? (
                        <span className="font-semibold text-secondary">{s.rank}</span>
                      ) : null}
                      {s.score != null ? (
                        <span className="text-accent tabular-nums">{s.score}</span>
                      ) : null}
                    </>
                  }
                />
              ))}
          </Rows>
        )}
      </Section>
      {traits.length > 0 ? (
        <Section title="Traits">
          <Rows>
            {[...traits]
              .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
              .map((t, i) => (
                <LadderRow
                  key={t.name != null ? t.name : `trait-${i}`}
                  name={t.name ?? ""}
                  note={t.note}
                  right={
                    t.score != null ? (
                      <span className="text-accent tabular-nums">{t.score}</span>
                    ) : null
                  }
                />
              ))}
          </Rows>
        </Section>
      ) : null}
      <CountedRows
        title="Legacies"
        held={(sheet.legacies ?? []).map((one) => ({
          ...(one.name != null ? { name: one.name } : {}),
          ...(one.score != null ? { value: one.score } : {}),
          ...(one.note != null ? { note: one.note } : {}),
        }))}
      />
      {titles.length > 0 ? (
        <Section title="Titles">
          <div className="flex flex-wrap gap-1.5">
            {titles.map((t, i) => (
              <span
                key={i}
                className={`rounded-full ${surfaceClass(2)} px-2 py-[2px] font-mono text-[11px] text-secondary`}
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
      ) : null}
      <CountedRows title="Affinities" held={sheet.affinities ?? []} />
      {showsBonds ? <CountedRows title="Bonds" held={sheet.bonds ?? []} /> : null}
    </div>
  )
}

function ItemsTab({ sheet }: { sheet: ClientSheet }) {
  const items = sheet.items ?? []
  const equipment = Object.entries(sheet.equipment ?? {})
  const purse = sheet.purse
  return (
    <div className="flex flex-col gap-3">
      {purse !== undefined ? (
        <Section title="Purse">
          <PurseRows purse={purse} ledgers={sheet.ledgers} />
        </Section>
      ) : null}
      <Section title="Inventory">
        {items.length === 0 ? (
          <div className="font-mono text-[12px] text-tertiary">none yet</div>
        ) : (
          <Rows>
            {items.map((it, i) => (
              <div
                key={it.name != null ? it.name : `item-${i}`}
                className="font-mono text-[12.5px]"
              >
                <NoteName name={it.name ?? ""} note={it.note} />
              </div>
            ))}
          </Rows>
        )}
      </Section>
      {equipment.length > 0 ? (
        <Section title="Equipped">
          <Rows>
            {equipment.map(([slot, item]) => (
              <div
                key={slot}
                className="flex items-baseline justify-between gap-3 font-mono text-[12.5px]"
              >
                <span className="min-w-0 flex-1 break-words text-primary">{item.name ?? ""}</span>
                <span className="flex-none text-tertiary">{slot}</span>
              </div>
            ))}
          </Rows>
        </Section>
      ) : null}
    </div>
  )
}

export function statsShownIn(sheet: ClientSheet | null | undefined): boolean {
  return (
    sheet?.attributes !== undefined ||
    sheet?.resources !== undefined ||
    sheet?.kind !== undefined ||
    sheet?.class !== undefined ||
    sheet?.rank !== undefined ||
    sheet?.status !== undefined
  )
}

export type SheetShown = {
  readonly sheet: ClientSheet | null
  readonly game?: string | undefined
  readonly workings?: readonly Working[] | undefined
  readonly showsStats?: boolean | undefined
  readonly showsBonds?: boolean | undefined
}

export function SheetTabs({
  sheet,
  game,
  workings,
  showsStats = true,
  showsBonds = true,
}: SheetShown & { readonly sheet: ClientSheet }) {
  return (
    <Tabs defaultValue={showsStats ? "stats" : "skills"} className="gap-3">
      <TabsList>
        {showsStats ? <TabsTrigger value="stats">Stats</TabsTrigger> : null}
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
      </TabsList>
      {showsStats ? (
        <TabsContent value="stats">
          <StatsTab sheet={sheet} game={game} workings={workings} />
        </TabsContent>
      ) : null}
      <TabsContent value="skills">
        <SkillsTab sheet={sheet} showsBonds={showsBonds} />
      </TabsContent>
      <TabsContent value="items">
        <ItemsTab sheet={sheet} />
      </TabsContent>
    </Tabs>
  )
}
