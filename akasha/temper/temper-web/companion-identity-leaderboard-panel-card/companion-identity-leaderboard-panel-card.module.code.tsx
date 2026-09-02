"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { cn } from "@akasha/design-primitives/cn"
import {
  formatCompact,
  formatFull,
  Table,
  TableBody,
  TableCell,
  TableColumnLabel,
  TableHead,
  TableHeader,
  TableRow,
  TableTotalCell,
  TableValue,
} from "@akasha/design-primitives/table"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import {
  type ComboRankingsMap,
  displayRoleComboKey,
  displayRolesToAbbreviation,
  type RankedEntry,
} from "@akasha/temper-companions-core/companion-leaderboard"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { companions } from "@akasha/temper-companions-core/companions"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import { useMemo } from "react"
import { LEADERBOARD_COLUMNS } from "../leaderboard-columns/leaderboard-columns.module.code.ts"

interface CompanionIdentityLeaderboardPanelCardProps {
  id: string
  companionId: CompanionId
  rankingsMap: ComboRankingsMap
  sortedCombos: readonly (readonly string[])[]
  onRoleClick?: (displayRoles: readonly string[]) => void
}

export function CompanionIdentityLeaderboardPanelCard({
  id,
  companionId,
  rankingsMap,
  sortedCombos,
  onRoleClick,
}: CompanionIdentityLeaderboardPanelCardProps) {
  const companionName = companions.data[companionId].name

  const rows = useMemo(() => {
    const entries: { displayRoles: readonly string[]; entry: RankedEntry }[] = []

    for (const combo of sortedCombos) {
      const key = displayRoleComboKey(combo)
      const comboEntries = rankingsMap.get(key)
      if (!comboEntries) continue

      const match = comboEntries.find((e) => e.companionId === companionId)
      if (match) {
        entries.push({ displayRoles: combo, entry: match })
      }
    }

    entries.sort((a, b) => a.entry.rank - b.entry.rank)
    return entries
  }, [companionId, rankingsMap, sortedCombos])

  if (rows.length === 0) return null

  return (
    <PanelCard id={id} collapsible title={`${companionName} Leaderboard`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 text-left">#</TableHead>
            <TableHead className="w-0 text-left">Role</TableHead>
            <TableColumnLabel
              label="Score"
              fullName="Composite Score"
              description="Combined score across all selected roles"
            />
            {LEADERBOARD_COLUMNS.map((col) => (
              <TableColumnLabel
                key={col.metricKey}
                label={col.label}
                fullName={col.fullName}
                description={col.description}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ displayRoles, entry }) => {
            const isTopThree = entry.rank <= 3
            const accentClass = isTopThree ? "font-semibold text-accent" : ""
            return (
              <TableRow key={displayRoleComboKey(displayRoles)}>
                <TableCell className={`text-left font-sans text-primary ${accentClass}`}>
                  {entry.rank}
                </TableCell>
                <TableCell
                  className={cn("text-left", accentClass, onRoleClick && "cursor-pointer")}
                  onClick={onRoleClick ? () => onRoleClick(displayRoles) : undefined}
                >
                  {displayRolesToAbbreviation(displayRoles)}
                </TableCell>
                <TableTotalCell className={accentClass}>
                  <Link
                    href={companionUrl(toBuildId(entry.buildId), entry.buildName)}
                    className="cursor-pointer"
                  >
                    <TableValue
                      compact={formatCompact(entry.score)}
                      full={formatFull(entry.score)}
                    />
                  </Link>
                </TableTotalCell>
                {LEADERBOARD_COLUMNS.map((col) => {
                  const value = entry.metrics[col.metricKey] ?? 0
                  return (
                    <TableCell key={col.metricKey}>
                      <TableValue compact={formatCompact(value)} full={formatFull(value)} />
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </PanelCard>
  )
}
