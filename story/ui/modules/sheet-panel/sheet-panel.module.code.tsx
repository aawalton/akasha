"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Progress } from "akasha/design/interface/primitive/modules/progress-bar/progress-bar.module.code.tsx"
import type { ClientSheet } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import {
  type Act,
  byName,
  Entry,
  NoneFound,
  Rows,
  Searched,
  Section,
  type SheetActing,
  searched,
} from "akasha/story/ui/modules/sheet-entries/sheet-entries.module.code.tsx"
import {
  InventoryTab,
  inventoryShownIn,
  shownOf,
} from "akasha/story/ui/modules/sheet-inventory/sheet-inventory.module.code.tsx"
import {
  useDerived,
  type Working,
} from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"
import { type ReactNode, useState } from "react"

const STATS = "stats"

const INVENTORY = "inventory"

const SKILLS = "skills"

const TRAITS = "traits"

const XP = "XP"

const TAB = "px-1 font-mono text-[12px]"

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

type Experience = NonNullable<ClientSheet["experience"]>[number]

function earnedOf(one: Experience): string {
  if (one.words !== undefined) return one.words
  return one.max === undefined ? shownOf(one.value) : `${shownOf(one.value)} / ${shownOf(one.max)}`
}

function ExperienceBars({ experience }: { experience: readonly Experience[] }) {
  return (
    <div className="flex flex-col gap-2">
      {experience.map((one, i) => (
        <div key={`${one.name ?? XP}-${String(i)}`} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2 font-mono text-[11px]">
            <span className="text-tertiary uppercase tracking-[0.18em]">{one.name ?? XP}</span>
            <span className="text-accent tabular-nums">{earnedOf(one)}</span>
          </div>
          {one.words === undefined && one.max !== undefined && one.max > 0 ? (
            <Progress
              value={Math.min(100, Math.max(0, (one.value / one.max) * 100))}
              className="h-1.5"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}

function LevelUp({ points }: { points: NonNullable<ClientSheet["points"]> }) {
  return (
    <Entry
      name="Level Up Choices Available"
      right={<span>{points.length} ready</span>}
      detail={
        <div className="flex flex-col gap-1 font-mono text-[12.5px] text-accent">
          {points.map((one) => (
            <div key={one.label}>
              {one.value} {one.label} Available
            </div>
          ))}
        </div>
      }
    />
  )
}

export type SheetHead = {
  readonly caption: ReactNode
  readonly cover: ReactNode
}

function StatsTab({
  sheet,
  head,
  game,
  workings,
  showsStats,
}: {
  sheet: ClientSheet
  head: SheetHead
  game: string | undefined
  workings: readonly Working[] | undefined
  showsStats: boolean
}) {
  const derived = useDerived(game, workings) ?? {}
  const titles = sheet.titles ?? []
  const points = sheet.points ?? []
  const profile: Record<string, string> = {
    ...(sheet.kind != null ? { Species: sheet.kind } : {}),
    ...(sheet.class != null ? { Class: sheet.class } : {}),
    ...(sheet.rank != null ? { Rank: sheet.rank } : {}),
    ...(sheet.status != null ? { Status: sheet.status } : {}),
  }
  return (
    <div className="flex flex-col gap-3">
      {head.caption}
      {titles.length === 0 ? null : (
        <div className="-mt-2 font-mono text-[11px] text-secondary">{titles.join(" · ")}</div>
      )}
      {(sheet.experience ?? []).length === 0 ? null : (
        <ExperienceBars experience={sheet.experience ?? []} />
      )}
      {head.cover}
      {points.length === 0 ? null : <LevelUp points={points} />}
      {showsStats && Object.keys(profile).length > 0 ? (
        <Section title="Profile">
          <ScalarRows record={profile} single />
        </Section>
      ) : null}
      {showsStats && sheet.resources !== undefined ? (
        <Section title="Resources">
          <ScalarRows record={sheet.resources} single />
        </Section>
      ) : null}
      {showsStats && sheet.attributes !== undefined ? (
        <Section title="Attributes">
          <ScalarRows record={sheet.attributes} />
        </Section>
      ) : null}
      {showsStats && Object.keys(derived).length > 0 ? (
        <Section title="Derived">
          <ScalarRows record={derived} single />
        </Section>
      ) : null}
    </div>
  )
}

type Held = NonNullable<ClientSheet["skills"]>[number]

type Counted = NonNullable<ClientSheet["bonds"]>[number]

function counted(one: Counted): Held {
  return {
    ...(one.name === undefined ? {} : { name: one.name }),
    ...(one.value === undefined ? {} : { score: one.value }),
    ...(one.note === undefined ? {} : { note: one.note }),
  }
}

type Part = { readonly title: string; readonly held: readonly Held[]; readonly usable?: boolean }

function skillPartsOf(held: readonly Held[]): readonly Part[] {
  const governed = [...new Set(held.flatMap((one) => one.attribute ?? []))].sort()
  return [
    ...governed.map((title) => ({
      title,
      held: held.filter((one) => one.attribute === title),
      usable: true,
    })),
    {
      title: governed.length === 0 ? "Skills" : "Other",
      held: held.filter((one) => one.attribute === undefined),
      usable: true,
    },
  ]
}

function usingOf(name: string): readonly Act[] {
  return [{ label: "Use", text: `I use ${name}`, tone: "use" }]
}

function HeldRows({
  title,
  held,
  query,
  acting,
  usable = false,
}: {
  title: string
  held: readonly Held[]
  query: string
  acting?: SheetActing | undefined
  usable?: boolean
}) {
  const shown = searched(byName(held), query)
  if (shown.length === 0) return null
  return (
    <Section title={title}>
      <Rows>
        {shown.map((one, i) => (
          <Entry
            key={one.name ?? `${title}-${String(i)}`}
            name={one.name ?? ""}
            right={
              <>
                {one.rank == null ? null : (
                  <span className="font-semibold text-secondary">{one.rank}</span>
                )}
                {one.experience === undefined ? (
                  one.score == null ? null : (
                    <span>{one.score}</span>
                  )
                ) : (
                  <span>
                    {one.score == null ? "" : `Level ${String(one.score)} / `}
                    {one.experience} XP
                  </span>
                )}
              </>
            }
            note={one.note}
            acts={usable ? usingOf(one.name ?? "") : undefined}
            acting={acting}
          />
        ))}
      </Rows>
    </Section>
  )
}

function HeldTab({
  label,
  parts,
  acting,
}: {
  label: string
  parts: readonly Part[]
  acting: SheetActing | undefined
}) {
  return (
    <Searched label={label}>
      {(query) =>
        parts.every((part) => searched(part.held, query).length === 0) ? (
          <NoneFound />
        ) : (
          <div className="flex flex-col gap-3">
            {parts.map((part) => (
              <HeldRows
                key={part.title}
                title={part.title}
                held={part.held}
                query={query}
                acting={acting}
                usable={part.usable ?? false}
              />
            ))}
          </div>
        )
      }
    </Searched>
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
  readonly acting?: SheetActing | undefined
}

export function SheetTabs({
  sheet,
  head,
  game,
  workings,
  showsStats = true,
  showsBonds = true,
  acting,
}: SheetShown & { readonly sheet: ClientSheet; readonly head: SheetHead }) {
  const [picked, setPicked] = useState<string>(STATS)
  const skills = [
    ...skillPartsOf(sheet.skills ?? []),
    { title: "Affinities", held: (sheet.affinities ?? []).map(counted) },
  ].filter((part) => part.held.length > 0)
  const traits = [
    { title: "Traits", held: sheet.traits ?? [] },
    { title: "Legacies", held: sheet.legacies ?? [] },
    { title: "Bonds", held: showsBonds ? (sheet.bonds ?? []).map(counted) : [] },
  ].filter((part) => part.held.length > 0)
  const tabs = [
    STATS,
    ...(inventoryShownIn(sheet) ? [INVENTORY] : []),
    ...(skills.length > 0 ? [SKILLS] : []),
    ...(traits.length > 0 ? [TRAITS] : []),
  ]
  const value = tabs.includes(picked) ? picked : STATS
  return (
    <Tabs value={value} onValueChange={setPicked} className="gap-3">
      <TabsList>
        <TabsTrigger value={STATS} className={TAB}>
          Stats
        </TabsTrigger>
        {tabs.includes(INVENTORY) ? (
          <TabsTrigger value={INVENTORY} className={TAB}>
            Inventory
          </TabsTrigger>
        ) : null}
        {tabs.includes(SKILLS) ? (
          <TabsTrigger value={SKILLS} className={TAB}>
            Skills
          </TabsTrigger>
        ) : null}
        {tabs.includes(TRAITS) ? (
          <TabsTrigger value={TRAITS} className={TAB}>
            Traits
          </TabsTrigger>
        ) : null}
      </TabsList>
      <TabsContent value={STATS}>
        <StatsTab
          sheet={sheet}
          head={head}
          game={game}
          workings={workings}
          showsStats={showsStats}
        />
      </TabsContent>
      {tabs.includes(INVENTORY) ? (
        <TabsContent value={INVENTORY}>
          <InventoryTab sheet={sheet} acting={acting} />
        </TabsContent>
      ) : null}
      {tabs.includes(SKILLS) ? (
        <TabsContent value={SKILLS}>
          <HeldTab label="skills" parts={skills} acting={acting} />
        </TabsContent>
      ) : null}
      {tabs.includes(TRAITS) ? (
        <TabsContent value={TRAITS}>
          <HeldTab label="traits" parts={traits} acting={acting} />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
