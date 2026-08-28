import { Popover, PopoverContent, PopoverTrigger } from "@shared/design-primitives/components/popover"
import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/design-patterns/components/tabs"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { ClientSheet } from "../lib/client-session"

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

function ScalarRows({ record }: { record: Record<string, number | string> }) {
  const entries = Object.entries(record)
  return (
    <div className="grid grid-cols-2 gap-x-[14px] gap-y-[7px] font-mono text-[12.5px]">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-baseline justify-between gap-2 border-surface-3 border-b border-dotted py-[2px]"
        >
          <span className="min-w-0 break-words text-tertiary">{key}</span>
          <b className="flex-none font-bold text-accent">{value}</b>
        </div>
      ))}
    </div>
  )
}

function StatsTab({ sheet }: { sheet: ClientSheet }) {
  const attributes = sheet.attributes ?? {}
  const derived = sheet.derived ?? {}
  const hasAttributes = Object.keys(attributes).length > 0
  const hasDerived = Object.keys(derived).length > 0
  return (
    <div className="flex flex-col gap-3">
      <Section title="Attributes">
        {hasAttributes ? (
          <ScalarRows record={attributes} />
        ) : (
          <div className="font-mono text-[12px] text-tertiary">none yet</div>
        )}
      </Section>
      <Section title="Class">
        <div className="flex justify-between font-mono text-[12.5px]">
          <span className="text-tertiary">Class</span>
          <b className="font-bold text-accent">{sheet.class ?? "None"}</b>
        </div>
      </Section>
      {hasDerived ? (
        <Section title="Derived">
          <ScalarRows record={derived} />
        </Section>
      ) : null}
    </div>
  )
}

function SkillsTab({ sheet }: { sheet: ClientSheet }) {
  const skills = sheet.skills ?? []
  const affinities = sheet.affinities ?? []
  const bonds = sheet.bonds ?? []
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
      <Section title="Affinities">
        {affinities.length === 0 ? (
          <div className="font-mono text-[12px] text-tertiary">none yet</div>
        ) : (
          <Rows>
            {[...affinities]
              .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
              .map((a, i) => (
                <LadderRow
                  key={a.name != null ? a.name : `affinity-${i}`}
                  name={a.name ?? ""}
                  note={a.note}
                  right={
                    a.value != null ? (
                      <span className="text-accent tabular-nums">{a.value}</span>
                    ) : null
                  }
                />
              ))}
          </Rows>
        )}
      </Section>
      {bonds.length > 0 ? (
        <Section title="Bonds">
          <Rows>
            {[...bonds]
              .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
              .map((b, i) => (
                <LadderRow
                  key={b.name != null ? b.name : `bond-${i}`}
                  name={b.name ?? ""}
                  note={b.note}
                  right={
                    b.value != null ? (
                      <span className="text-accent tabular-nums">{b.value}</span>
                    ) : null
                  }
                />
              ))}
          </Rows>
        </Section>
      ) : null}
    </div>
  )
}

function ItemsTab({ sheet }: { sheet: ClientSheet }) {
  const items = sheet.items ?? []
  const equipment = Object.entries(sheet.equipment ?? {})
  return (
    <div className="flex flex-col gap-3">
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

function SheetHeader({ sheet }: { sheet: ClientSheet }) {
  const name = sheet.name ?? sheet.kind
  if (name == null && sheet.level == null) return null
  return (
    <div className="flex items-baseline justify-between font-mono">
      <div className="flex min-w-0 flex-col">
        {name != null ? (
          <span className="break-words font-semibold text-primary text-sm">{name}</span>
        ) : null}
        {sheet.kind != null && sheet.name != null ? (
          <span className="break-words text-[11px] text-tertiary">{sheet.kind}</span>
        ) : null}
      </div>
      {sheet.level != null ? (
        <span className="flex-none font-semibold text-secondary text-sm">Lv {sheet.level}</span>
      ) : null}
    </div>
  )
}

export function SheetPanel({ sheet }: { sheet: ClientSheet | null }) {
  if (sheet === null) {
    return (
      <SurfaceProvider
        level={1}
        className="rounded-xl p-4 font-mono text-[12px] text-tertiary shadow-sm"
      >
        No sheet revealed yet.
      </SurfaceProvider>
    )
  }
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      <SheetHeader sheet={sheet} />
      <Tabs defaultValue="stats" className="gap-3">
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
        </TabsList>
        <TabsContent value="stats">
          <StatsTab sheet={sheet} />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsTab sheet={sheet} />
        </TabsContent>
        <TabsContent value="items">
          <ItemsTab sheet={sheet} />
        </TabsContent>
      </Tabs>
    </SurfaceProvider>
  )
}
