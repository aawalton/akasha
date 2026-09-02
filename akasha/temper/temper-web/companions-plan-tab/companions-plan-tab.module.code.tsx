"use client"

import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { LayoutLink } from "@akasha/design-layout/router-context"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import type { CompanionBaseRoleId } from "@akasha/temper-companions-core/companion-base-roles"
import type { ComboRankingsMap } from "@akasha/temper-companions-core/companion-leaderboard"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { getCompanionName } from "@akasha/temper-companions-core/companions"
import { Gamepad2 } from "lucide-react"
import { useMemo } from "react"
import {
  CompanionEntityPanelCard,
  type CompanionPlanEntity,
} from "../companion-entity-panel-card/companion-entity-panel-card.module.code.tsx"
import {
  type CompanionLiveOnlyEntity,
  CompanionLiveOnlyPanelCard,
} from "../companion-live-only-panel-card/companion-live-only-panel-card.module.code.tsx"

interface CompanionsPlanTabProps {
  active: boolean
  planEntities: readonly CompanionPlanEntity[]
  liveOnlyEntities: readonly CompanionLiveOnlyEntity[]
  onUpdateEntityRoles: (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => void
  onRankClick: (companionId: CompanionId, entityRoles: readonly CompanionBaseRoleId[]) => void
  onBrowseClick: (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => void
  onTrophyClick: (
    entityId: string,
    sourceBuildId: string,
    companionName: string,
    targetManuallyEdited: boolean
  ) => void
  onSetTarget: (entityId: string, sourceBuildId: string, companionName: string) => void
  onReorder: (entityId: string, newIndex: number) => void
  rankingsMap: ComboRankingsMap
  overallRankMap: Map<CompanionId, number>
}

export function CompanionsPlanTab({
  active,
  planEntities,
  liveOnlyEntities,
  onUpdateEntityRoles,
  onRankClick,
  onBrowseClick,
  onTrophyClick,
  onSetTarget,
  onReorder,
  rankingsMap,
  overallRankMap,
}: CompanionsPlanTabProps) {
  const sortedEntities = useMemo(
    () => [...planEntities].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)),
    [planEntities]
  )

  const sortedLiveOnly = useMemo(
    () =>
      [...liveOnlyEntities].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)),
    [liveOnlyEntities]
  )

  const planCount = planEntities.length + liveOnlyEntities.length

  return (
    <TabsContent value="plan">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Plan" />
          {planCount === 0 && (
            <Card>
              <CardContent>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Gamepad2 />
                    </EmptyMedia>
                    <EmptyTitle>No builds attached to your companions</EmptyTitle>
                    <EmptyDescription>
                      Planning compares a companion's current build against a target, and none of
                      your companions has a build attached yet. Importing from the game does not
                      attach one, so importing again will not change this.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="secondary" asChild>
                      <LayoutLink href="/watcher">Check sync status</LayoutLink>
                    </Button>
                  </EmptyContent>
                </Empty>
              </CardContent>
            </Card>
          )}
          {planCount > 0 && (
            <ResponsiveColumns sortChildren={false}>
              {sortedEntities.map((entity, index) => (
                <CompanionEntityPanelCard
                  key={entity.entityId}
                  entity={entity}
                  getCompanionName={getCompanionName}
                  onUpdateEntityRoles={onUpdateEntityRoles}
                  onRankClick={onRankClick}
                  onBrowseClick={onBrowseClick}
                  onTrophyClick={onTrophyClick}
                  onReorder={onReorder}
                  priorityIndex={index + 1}
                  totalEntities={sortedEntities.length}
                  rankingsMap={rankingsMap}
                  overallRankMap={overallRankMap}
                />
              ))}
              {sortedLiveOnly.map((entity) => (
                <CompanionLiveOnlyPanelCard
                  key={entity.entityId}
                  entity={entity}
                  getCompanionName={getCompanionName}
                  onSetTarget={onSetTarget}
                />
              ))}
            </ResponsiveColumns>
          )}
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
