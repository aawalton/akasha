"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import type { RoleId } from "@akasha/temper-character-sources/character-roles"
import type { useCompletionCharactersByUser } from "@akasha/temper-player-completion-ui/use-completion"
import { useCallback, useMemo } from "react"
import type { DecodedBuild } from "../builds-browse-tab/builds-browse-tab.module.code.tsx"
import {
  CharacterEntityPanelCard,
  type CharacterPlanEntity,
} from "../character-entity-panel-card/character-entity-panel-card.module.code.tsx"
import {
  type CharacterLiveOnlyEntity,
  CharacterLiveOnlyPanelCard,
} from "../character-live-only-panel-card/character-live-only-panel-card.module.code.tsx"
import {
  getClassName,
  getRaceName,
  isValidRole,
} from "../characters-filter-types/characters-filter-types.module.code.ts"
import { CharactersPlanEmpty } from "../characters-plan-empty/characters-plan-empty.module.code.tsx"
import { decidePlanEmptyState } from "../characters-plan-empty-state/characters-plan-empty-state.module.code.ts"

type CompletionCharacterRows = ReturnType<typeof useCompletionCharactersByUser>["characters"]
type OptimisticPatch = ReturnType<typeof useOptimisticPatchPage>

export function usePlanEntities({
  decodedBuilds,
  completionCharacters,
  userId,
}: {
  decodedBuilds: readonly DecodedBuild[]
  completionCharacters: CompletionCharacterRows
  userId: string | null
}) {
  const planEntities = useMemo(() => {
    const buildMap = new Map(decodedBuilds.filter((b) => b.userId === userId).map((b) => [b.id, b]))

    return completionCharacters
      .map((entity): CharacterPlanEntity | null => {
        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        const targetBuild =
          entity.targetBuildId != null ? buildMap.get(entity.targetBuildId) : undefined

        if (!liveBuild || !targetBuild) return null

        const liveTime = new Date(liveBuild.updatedAt).getTime()
        const targetTime = new Date(targetBuild.updatedAt).getTime()
        const entityTime = new Date(entity.updatedAt).getTime()

        return {
          entityId: entity.id,
          esoCharacterId: entity.esoCharacterId,
          entityRoles: (entity.roles ?? []).filter(isValidRole),
          liveBuild: {
            id: liveBuild.id,
            name: liveBuild.name,
            buildData: liveBuild.buildData,
            updatedAt: liveBuild.updatedAt,
          },
          targetBuild: {
            id: targetBuild.id,
            name: targetBuild.name,
            buildData: targetBuild.buildData,
            updatedAt: targetBuild.updatedAt,
          },
          sortOrder: entity.sortOrder ?? null,
          updatedAt: Math.max(liveTime, targetTime, entityTime),
        }
      })
      .filter((e): e is CharacterPlanEntity => e !== null)
      .sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity))
  }, [decodedBuilds, completionCharacters, userId])

  const liveOnlyEntities = useMemo(() => {
    const buildMap = new Map(decodedBuilds.filter((b) => b.userId === userId).map((b) => [b.id, b]))

    return completionCharacters
      .map((entity): CharacterLiveOnlyEntity | null => {
        if (entity.targetBuildId != null) return null
        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        if (!liveBuild) return null

        return {
          entityId: entity.id,
          esoCharacterId: entity.esoCharacterId,
          liveBuild: {
            id: liveBuild.id,
            name: liveBuild.name,
            buildData: liveBuild.buildData,
            updatedAt: liveBuild.updatedAt,
          },
          sortOrder: entity.sortOrder ?? null,
        }
      })
      .filter((e): e is CharacterLiveOnlyEntity => e !== null)
      .sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity))
  }, [decodedBuilds, completionCharacters, userId])

  return { planEntities, liveOnlyEntities }
}

interface PlanTabProps {
  planEntities: readonly CharacterPlanEntity[]
  liveOnlyEntities: readonly CharacterLiveOnlyEntity[]
  userId: string | null
  optimisticPatch: OptimisticPatch
  onSetTarget: (entityId: string, esoCharacterId: string, liveBuildId: string) => void
  charactersUnconfirmed: boolean
  importedCharacterCount: number
}

export function PlanTab({
  planEntities,
  liveOnlyEntities,
  userId,
  optimisticPatch,
  onSetTarget,
  charactersUnconfirmed,
  importedCharacterCount,
}: PlanTabProps) {
  const handleUpdateEntityRoles = useCallback(
    (esoCharacterId: string, roles: readonly RoleId[]) => {
      if (userId == null) return
      void optimisticPatch({
        pageTypeSlug: "temper-account-character",
        where: [
          { key: "accountPage", eq: userId },
          { key: "esoCharacterId", eq: esoCharacterId },
        ],
        set: { roles: [...roles] },
      })
    },
    [optimisticPatch, userId]
  )

  const handleReorder = useCallback(
    (entityId: string, newIndex: number) => {
      if (userId == null) return
      const ordered = planEntities.slice()
      const currentIndex = ordered.findIndex((e) => e.entityId === entityId)
      if (currentIndex === -1 || currentIndex === newIndex) return
      const [moved] = ordered.splice(currentIndex, 1)
      if (!moved) return
      ordered.splice(newIndex, 0, moved)
      void Promise.all(
        ordered.map((entity, index) =>
          optimisticPatch({
            pageTypeSlug: "temper-account-character",
            where: [
              { key: "accountPage", eq: userId },
              { key: "esoCharacterId", eq: entity.esoCharacterId },
            ],
            set: { sortOrder: index },
          })
        )
      )
    },
    [optimisticPatch, userId, planEntities]
  )

  if (planEntities.length + liveOnlyEntities.length === 0) {
    return (
      <CharactersPlanEmpty
        state={decidePlanEmptyState({ charactersUnconfirmed, importedCharacterCount })}
      />
    )
  }

  return (
    <ResponsiveColumns sortChildren={false}>
      {planEntities.map((entity, index) => (
        <CharacterEntityPanelCard
          key={entity.entityId}
          entity={entity}
          getClassName={getClassName}
          getRaceName={getRaceName}
          onUpdateEntityRoles={handleUpdateEntityRoles}
          priorityIndex={index + 1}
          totalEntities={planEntities.length}
          onReorder={handleReorder}
        />
      ))}
      {liveOnlyEntities.map((entity) => (
        <CharacterLiveOnlyPanelCard
          key={entity.entityId}
          entity={entity}
          getClassName={getClassName}
          getRaceName={getRaceName}
          onSetTarget={onSetTarget}
        />
      ))}
    </ResponsiveColumns>
  )
}
