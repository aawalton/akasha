"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "akasha/design/interface/primitive/modules/toggle-group/toggle-group.module.code.tsx"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import type {
  ClientItem,
  ClientLedgerLine,
  ClientSheet,
} from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
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
import { useState } from "react"

const SPENT = "−"

const SHOWN_NUMBER: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }

const ALL = "all"

const EQUIPPED = "equipped"

const CURRENCY = "currency"

const OTHER = "other"

const SORTS = ["armor", "consumable", "material", "tool", "weapon"]

const CHIP = "h-7 flex-none rounded-full px-2.5 font-mono text-[11px] data-[state=on]:text-accent"

export function shownOf(value: number | string): string {
  return typeof value === "number" ? value.toLocaleString(undefined, SHOWN_NUMBER) : value
}

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

function countOf(item: ClientItem) {
  return item.quantity === undefined ? null : <span>×{item.quantity}</span>
}

function actsOf(name: string, worn: boolean): readonly Act[] {
  return [
    { label: "Drop", text: `I drop ${name}`, tone: "drop" },
    worn
      ? { label: "Unequip", text: `I unequip ${name}`, tone: "plain" }
      : { label: "Equip", text: `I equip ${name}`, tone: "plain" },
    { label: "Use", text: `I use ${name}`, tone: "use" },
  ]
}

function sortOf(item: ClientItem): string {
  return item.category ?? OTHER
}

function CarriedRows({
  carried,
  acting,
}: {
  carried: readonly ClientItem[]
  acting: SheetActing | undefined
}) {
  return (
    <Rows>
      {carried.map((item, i) => (
        <Entry
          key={item.name ?? `item-${String(i)}`}
          name={item.name ?? ""}
          right={countOf(item)}
          note={item.note}
          acts={actsOf(item.name ?? "", false)}
          acting={acting}
        />
      ))}
    </Rows>
  )
}

function GroupedRows({
  carried,
  sorts,
  query,
  acting,
}: {
  carried: readonly ClientItem[]
  sorts: readonly string[]
  query: string
  acting: SheetActing | undefined
}) {
  const shown = searched(byName(carried), query)
  if (shown.length === 0) return <NoneFound />
  if (sorts.length < 2) return <CarriedRows carried={shown} acting={acting} />
  return (
    <div className="flex flex-col gap-3">
      {sorts.map((sort) => {
        const held = shown.filter((item) => sortOf(item) === sort)
        return held.length === 0 ? null : (
          <Section key={sort} title={titledAs(sort)}>
            <CarriedRows carried={held} acting={acting} />
          </Section>
        )
      })}
    </div>
  )
}

function WornRows({
  worn,
  query,
  acting,
}: {
  worn: readonly (readonly [string, ClientItem])[]
  query: string
  acting: SheetActing | undefined
}) {
  const asked = query.trim().toLowerCase()
  const shown = worn.filter(
    ([slot, item]) => slot.toLowerCase().includes(asked) || searched([item], query).length > 0
  )
  if (shown.length === 0) return <NoneFound />
  return (
    <Rows>
      {shown.map(([slot, item]) => (
        <Entry
          key={slot}
          name={item.name ?? ""}
          right={
            <>
              {countOf(item)}
              <span className="text-tertiary">{slot}</span>
            </>
          }
          note={item.note}
          detail={
            <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.18em]">
              {slot}
            </div>
          }
          acts={actsOf(item.name ?? "", true)}
          acting={acting}
        />
      ))}
    </Rows>
  )
}

export function inventoryShownIn(sheet: ClientSheet): boolean {
  return (
    sheet.purse !== undefined ||
    (sheet.items ?? []).length > 0 ||
    Object.keys(sheet.equipment ?? {}).length > 0
  )
}

function sortsIn(carried: readonly ClientItem[]): readonly string[] {
  const held = new Set(carried.map(sortOf))
  const named = SORTS.filter((sort) => held.has(sort))
  return named.length === 0
    ? held.size === 0
      ? []
      : [OTHER]
    : held.has(OTHER)
      ? [...named, OTHER]
      : named
}

export function InventoryTab({
  sheet,
  acting,
}: {
  sheet: ClientSheet
  acting: SheetActing | undefined
}) {
  const carried = sheet.items ?? []
  const worn = Object.entries(sheet.equipment ?? {})
  const purse = sheet.purse
  const sorts = sortsIn(carried)
  const filters = [
    ALL,
    ...(worn.length > 0 ? [EQUIPPED] : []),
    ...(sorts.length > 1 ? sorts : []),
    ...(purse === undefined ? [] : [CURRENCY]),
  ]
  const [picked, setPicked] = useState(ALL)
  const shown = filters.includes(picked) ? picked : ALL
  const items = shown === ALL ? carried : carried.filter((item) => sortOf(item) === shown)
  const purseShown = purse !== undefined && (shown === ALL || shown === CURRENCY)
  return (
    <Searched label={shown === EQUIPPED ? "equipped" : "items"}>
      {(query) => (
        <div className="flex flex-col gap-3">
          {filters.length < 2 ? null : (
            <ToggleGroup
              type="single"
              size="sm"
              value={shown}
              onValueChange={(next) => {
                if (next !== "") setPicked(next)
              }}
              className="w-full flex-wrap justify-start gap-1"
            >
              {filters.map((filter) => (
                <ToggleGroupItem key={filter} value={filter} className={CHIP}>
                  {titledAs(filter)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
          {purseShown ? (
            <Section title={titledAs(CURRENCY)}>
              <PurseRows purse={purse} ledgers={sheet.ledgers} />
            </Section>
          ) : null}
          {shown === EQUIPPED ? (
            <WornRows worn={worn} query={query} acting={acting} />
          ) : shown === CURRENCY || items.length === 0 ? null : (
            <GroupedRows
              carried={items}
              sorts={shown === ALL ? sorts : []}
              query={query}
              acting={acting}
            />
          )}
        </div>
      )}
    </Searched>
  )
}
