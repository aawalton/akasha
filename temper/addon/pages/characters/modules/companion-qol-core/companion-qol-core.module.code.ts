import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"

function checkCollectibleId(this: void, collectibleId: number): boolean {
  const isCollectibleBlocked =
    IsCollectibleBlacklisted(collectibleId) ||
    IsCollectibleBlocked(collectibleId, GAMEPLAY_ACTOR_CATEGORY_PLAYER) ||
    !IsCollectibleUsable(collectibleId, GAMEPLAY_ACTOR_CATEGORY_PLAYER)
  const isCollectibleActive = IsCollectibleActive(collectibleId, GAMEPLAY_ACTOR_CATEGORY_PLAYER)
  return !isCollectibleBlocked && isCollectibleActive
}

COMPANION_QOL.ToggleCompanion = function (
  this: void,
  companionIdToShow?: number,
  doShow?: boolean,
  onlyIfLastCompanionWasKnown?: boolean
): undefined {
  let companionId: number | undefined
  let companionCollectibleId: number | undefined
  let doSummonOtherCompanion = false
  let doUseNow = false
  const companionInfo = COMPANION_QOL.companionInfo
  const onlyIfKnown = onlyIfLastCompanionWasKnown === true

  let lastCompanionDefId = COMPANION_QOL.settingsVars.settings.lastCompanionId
  if (lastCompanionDefId === undefined) {
    if (onlyIfKnown) {
      return undefined
    }
    lastCompanionDefId = 1
  }

  const companionIsOnTheWay = HasPendingCompanion()
  const companionIsActive = HasActiveCompanion()

  if (companionIsOnTheWay) {
    companionId = GetPendingCompanionDefId()
  } else if (companionIsActive) {
    companionId = GetActiveCompanionDefId()
  } else {
    companionId = companionIdToShow
    if (companionId === undefined) {
      companionId = lastCompanionDefId
    }
  }

  if (doShow === undefined) {
    if (companionIsActive) {
      if (companionIdToShow !== undefined) {
        if (companionId === companionIdToShow) {
          doShow = false
        } else {
          doShow = true
          doSummonOtherCompanion = true
        }
      } else {
        doShow = false
      }
    } else {
      doShow = true
    }
  } else if (doShow === true) {
    if (companionIdToShow !== undefined && companionId === companionIdToShow) {
      if (!companionIsActive && onlyIfKnown) {
        companionId = companionIdToShow
      } else {
        return undefined
      }
    } else {
      doSummonOtherCompanion = true
    }
  }

  if (companionId === undefined) {
    return undefined
  }
  if (companionIsOnTheWay) {
    return undefined
  }
  if (!doShow && !companionIsActive) {
    return undefined
  }

  if (doSummonOtherCompanion) {
    companionCollectibleId =
      companionIdToShow === undefined ? undefined : companionInfo[companionIdToShow]
  } else {
    companionCollectibleId = GetCompanionCollectibleId(companionId)
  }
  if (companionCollectibleId === undefined) {
    return undefined
  }

  const isActive = checkCollectibleId(companionCollectibleId)

  if (doShow === true && !isActive) {
    doUseNow = true
  } else if (!doShow && isActive) {
    doUseNow = true
  }

  if (doUseNow) {
    const isCollectibleUsable = IsCollectibleUsable(
      companionCollectibleId,
      GAMEPLAY_ACTOR_CATEGORY_PLAYER
    )
    const isCollectibleBlocked = IsCollectibleBlocked(
      companionCollectibleId,
      GAMEPLAY_ACTOR_CATEGORY_PLAYER
    )
    const collectibleBlockReason = GetCollectibleBlockReason(
      companionCollectibleId,
      GAMEPLAY_ACTOR_CATEGORY_PLAYER
    )
    const [collectableCooldownLeft] = GetCollectibleCooldownAndDuration(companionCollectibleId)

    let delay = 0
    if (isCollectibleUsable) {
      if (
        !isCollectibleBlocked ||
        (isCollectibleBlocked &&
          collectibleBlockReason === COLLECTIBLE_USAGE_BLOCK_REASON_NOT_BLOCKED)
      ) {
        if (collectableCooldownLeft > 0) {
          delay = collectableCooldownLeft
        }
      } else {
        return undefined
      }
    } else {
      return undefined
    }

    const collectibleToUse = companionCollectibleId
    zo_callLater(function (this: void): undefined {
      UseCollectible(collectibleToUse, GAMEPLAY_ACTOR_CATEGORY_PLAYER)
      return undefined
    }, delay)
  }
  return undefined
}
