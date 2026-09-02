"use client"

import {
  applyCompanionMetadata,
  type CompanionBuildMetadata,
  extractCompanionMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import { decodeCompanion, encodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import {
  type useAllCompanionList,
  useCompanionLifecycle,
} from "@akasha/temper-companions-ui/use-companions"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import type { useCompletionCompanions } from "@akasha/temper-player-completion-ui/use-completion"
import { useCallback, useState, useTransition } from "react"

interface UsePlanSetTargetArgs {
  buildMap: Map<string, ReturnType<typeof useAllCompanionList>["builds"][number]>
  completionCompanions: ReturnType<typeof useCompletionCompanions>["companions"]
}

export function usePlanSetTarget({ buildMap, completionCompanions }: UsePlanSetTargetArgs) {
  const { setTarget } = useCompanionLifecycle()
  const [, startSetTargetTransition] = useTransition()
  const [pendingTrophyConfirm, setPendingTrophyConfirm] = useState<{
    entityId: string
    sourceBuildId: string
    companionName: string
  } | null>(null)

  const executeSetTarget = useCallback(
    (entityId: string, sourceBuildId: string) => {
      const sourceBuild = buildMap.get(sourceBuildId)
      if (sourceBuild?.buildHash == null) {
        console.error("Failed to set top build as target: source build not found")
        return
      }

      const sourceState = decodeCompanion(toBuildHash(sourceBuild.buildHash))
      if (!sourceState) {
        console.error("Failed to set top build as target: could not decode source build")
        return
      }

      const sourceMetadata = sourceBuild.buildMetadata
      if (!sourceMetadata) {
        console.error("Failed to set top build as target: missing build metadata")
        return
      }
      const sourceData = applyCompanionMetadata(sourceState, sourceMetadata)

      const entity = completionCompanions.find((e) => e.id === entityId)
      if (!entity) {
        console.error("Failed to set top build as target: entity not found")
        return
      }

      let args: {
        entityId: string
        companionId: string
        newBuildId?: string
        buildHash: string
        buildMetadata: CompanionBuildMetadata
        updateExistingTargetId?: string
      }

      if (entity.targetBuildId != null) {
        const targetBuild = buildMap.get(entity.targetBuildId)
        const targetMetadata = targetBuild?.buildMetadata ?? undefined

        const merged: CompanionState = {
          ...sourceData,
          name: targetMetadata?.name ?? sourceData.name,
          description: targetMetadata?.description ?? sourceData.description,
        }

        args = {
          entityId,
          companionId: entity.companionId,
          buildHash: encodeCompanion(merged),
          buildMetadata: extractCompanionMetadata(merged),
          updateExistingTargetId: entity.targetBuildId,
        }
      } else {
        let buildName = sourceData.name
        if (entity.liveBuildId != null) {
          const liveBuild = buildMap.get(entity.liveBuildId)
          const liveMetadata = liveBuild?.buildMetadata ?? undefined
          if (liveMetadata?.name != null) buildName = liveMetadata.name
        }

        const newBuildData: CompanionState = { ...sourceData, name: buildName }

        args = {
          entityId,
          companionId: entity.companionId,
          newBuildId: crypto.randomUUID(),
          buildHash: encodeCompanion(newBuildData),
          buildMetadata: extractCompanionMetadata(newBuildData),
        }
      }

      startSetTargetTransition(async () => {
        await setTarget(args)
      })
    },
    [buildMap, completionCompanions, setTarget]
  )

  const handleTrophyClick = useCallback(
    (
      entityId: string,
      sourceBuildId: string,
      companionName: string,
      targetManuallyEdited: boolean
    ) => {
      if (targetManuallyEdited) {
        setPendingTrophyConfirm({ entityId, sourceBuildId, companionName })
      } else {
        executeSetTarget(entityId, sourceBuildId)
      }
    },
    [executeSetTarget]
  )

  const handleTrophyConfirm = useCallback(() => {
    if (pendingTrophyConfirm) {
      const { entityId, sourceBuildId } = pendingTrophyConfirm
      setPendingTrophyConfirm(null)
      executeSetTarget(entityId, sourceBuildId)
    }
  }, [pendingTrophyConfirm, executeSetTarget])

  return {
    pendingTrophyConfirm,
    setPendingTrophyConfirm,
    handleTrophyClick,
    handleTrophyConfirm,
  }
}
