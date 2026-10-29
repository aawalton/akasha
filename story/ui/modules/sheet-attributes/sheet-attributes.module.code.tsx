"use client"

import { CollapsibleStatSection } from "akasha/design/interface/pattern/modules/collapsible-stat-section/collapsible-stat-section.module.code.tsx"
import { StatRow } from "akasha/design/interface/pattern/modules/stat-row/stat-row.module.code.tsx"
import type { ClientSheet } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import { shownOf } from "akasha/story/ui/modules/sheet-inventory/sheet-inventory.module.code.tsx"
import type { ReactNode } from "react"

type Scalars = Readonly<Record<string, number | string>>

type AttributeGroup = NonNullable<ClientSheet["attributeGroups"]>[number]

const ATTRIBUTES = "Attributes"

const NO_GROUPS: readonly AttributeGroup[] = []

const COUNT = "font-mono font-semibold text-accent text-sm tabular-nums"

export function StatsSection({
  title,
  count,
  children,
}: {
  title: string
  count?: string | undefined
  children: ReactNode
}) {
  return (
    <CollapsibleStatSection
      label={title}
      value={count === undefined ? undefined : <span className={COUNT}>{count}</span>}
    >
      {children}
    </CollapsibleStatSection>
  )
}

export function ScalarRows({ record }: { record: Scalars }) {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(record).map(([key, value]) => (
        <StatRow key={key} label={key} value={shownOf(value)} />
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
        <StatsSection key={group.title} title={group.title} count={group.count}>
          <ScalarRows record={picked(attributes, group.names)} />
        </StatsSection>
      ))}
      {Object.keys(rest).length === 0 ? null : (
        <StatsSection title={ATTRIBUTES}>
          <ScalarRows record={rest} />
        </StatsSection>
      )}
    </>
  )
}
