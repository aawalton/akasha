"use client"

import type { ClientSheet } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import { Section } from "akasha/story/ui/modules/sheet-entries/sheet-entries.module.code.tsx"
import { shownOf } from "akasha/story/ui/modules/sheet-inventory/sheet-inventory.module.code.tsx"

type Scalars = Readonly<Record<string, number | string>>

type AttributeGroup = NonNullable<ClientSheet["attributeGroups"]>[number]

const ATTRIBUTES = "Attributes"

const NO_GROUPS: readonly AttributeGroup[] = []

export function ScalarRows({ record, single = false }: { record: Scalars; single?: boolean }) {
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

function picked(attributes: Scalars, names: readonly string[]): Scalars {
  return Object.fromEntries(
    names.flatMap((name) => {
      const value = attributes[name]
      return value === undefined ? [] : [[name, value]]
    })
  )
}

export function AttributeSections({
  attributes,
  groups = NO_GROUPS,
}: {
  attributes: Scalars
  groups?: readonly AttributeGroup[] | undefined
}) {
  const grouped = new Set(groups.flatMap((one) => one.names))
  const rest = Object.fromEntries(Object.entries(attributes).filter(([name]) => !grouped.has(name)))
  return (
    <>
      {groups.map((group) => (
        <Section key={group.title} title={group.title} count={group.count}>
          <ScalarRows record={picked(attributes, group.names)} />
        </Section>
      ))}
      {Object.keys(rest).length === 0 ? null : (
        <Section title={ATTRIBUTES}>
          <ScalarRows record={rest} />
        </Section>
      )}
    </>
  )
}
