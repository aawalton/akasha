"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "akasha/design/interface/primitive/modules/toggle-group/toggle-group.module.code.tsx"
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

const ITEMS = "items"

const EQUIPPED = "equipped"

type View = typeof ITEMS | typeof EQUIPPED

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

function CarriedRows({
  carried,
  query,
  acting,
}: {
  carried: readonly ClientItem[]
  query: string
  acting: SheetActing | undefined
}) {
  if (carried.length === 0) {
    return <div className="font-mono text-[12px] text-tertiary">nothing carried</div>
  }
  const shown = searched(byName(carried), query)
  if (shown.length === 0) return <NoneFound />
  return (
    <Rows>
      {shown.map((item, i) => (
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

export function InventoryTab({
  sheet,
  acting,
}: {
  sheet: ClientSheet
  acting: SheetActing | undefined
}) {
  const carried = sheet.items ?? []
  const worn = Object.entries(sheet.equipment ?? {})
  const [view, setView] = useState<View>(carried.length === 0 && worn.length > 0 ? EQUIPPED : ITEMS)
  const shown: View = worn.length === 0 ? ITEMS : view
  return (
    <div className="flex flex-col gap-3">
      {sheet.purse === undefined ? null : (
        <Section title="Purse">
          <PurseRows purse={sheet.purse} ledgers={sheet.ledgers} />
        </Section>
      )}
      {carried.length === 0 && worn.length === 0 ? null : (
        <Searched label={shown === ITEMS ? "items" : "equipped"}>
          {(query) =>
            shown === ITEMS ? (
              <CarriedRows carried={carried} query={query} acting={acting} />
            ) : (
              <WornRows worn={worn} query={query} acting={acting} />
            )
          }
        </Searched>
      )}
      {worn.length === 0 ? null : (
        <ToggleGroup
          type="single"
          size="sm"
          value={shown}
          onValueChange={(next) => {
            if (next === ITEMS || next === EQUIPPED) setView(next)
          }}
          className={`w-full rounded-lg ${surfaceClass(2)} p-[3px]`}
        >
          <ToggleGroupItem
            value={ITEMS}
            className="font-mono text-[12px] data-[state=on]:text-accent"
          >
            Items
          </ToggleGroupItem>
          <ToggleGroupItem
            value={EQUIPPED}
            className="font-mono text-[12px] data-[state=on]:text-accent"
          >
            Equipped
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    </div>
  )
}
