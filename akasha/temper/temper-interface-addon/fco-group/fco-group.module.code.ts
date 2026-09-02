import { STATE } from "../fco-state/fco-state.module.code.ts"

const EM = EVENT_MANAGER

const PLAYER_TAG = "player"

function isCPGetter(this: void, value: unknown): value is (this: void, unitTag?: string) => number {
  return type(value) === "function"
}

function isRosterBuildFn(this: void, value: unknown): value is GroupRosterBuildFn {
  return type(value) === "function"
}

function wrapFunction(
  this: void,
  object: GroupListManager,
  functionName: string,
  wrapper: (this: void, originalFunction: unknown, ...args: unknown[]) => void
): undefined {
  const originalFunction = object[functionName]
  object[functionName] = (...args: unknown[]): undefined => {
    wrapper(originalFunction, ...args)
  }
}

export function hookChampionRankUtils(this: void): undefined {
  if (STATE.settingsVars.settings.showRealCPs !== true) {
    return
  }
  const championCapNew = GetMaxSpendableChampionPointsInAttribute() * 10
  globalThis.GetLevelOrChampionPointsStringNoIcon = (
    level: number | undefined,
    championPoints: number | undefined
  ): string => {
    if (championPoints !== undefined && championPoints > 0) {
      if (championPoints > championCapNew) {
        return tostring(championCapNew)
      } else {
        return tostring(championPoints)
      }
    } else if (level !== undefined && level > 0) {
      return tostring(level)
    } else {
      return ""
    }
  }
}

export function hookGroupList(this: void, runItOnce?: boolean): undefined {
  if (STATE.settingsVars.settings.showRealCPs !== true) {
    return
  }
  const runOnce = runItOnce === true
  const groupListManager = GROUP_LIST_MANAGER
  if (groupListManager !== undefined) {
    const originalBuildMasterList = groupListManager.BuildMasterList
    if (originalBuildMasterList === undefined) {
      return
    }
    wrapFunction(
      groupListManager,
      "BuildMasterList",
      (originalBuildMasterListFn: unknown, ...args: unknown[]): undefined => {
        STATE.runGroupListCounter = STATE.runGroupListCounter + 1
        const cpFuncEffective = STATE.originalUnitCPEffectiveFunc
        if (cpFuncEffective === undefined) {
          return
        }
        globalThis.GetUnitEffectiveChampionPoints = globalThis.GetUnitChampionPoints
        if (isRosterBuildFn(originalBuildMasterListFn)) {
          originalBuildMasterListFn(...args)
        }
        if (isCPGetter(cpFuncEffective)) {
          globalThis.GetUnitEffectiveChampionPoints = cpFuncEffective
        }
      }
    )
    if (runOnce && groupListManager.BuildMasterList !== undefined) {
      groupListManager.BuildMasterList()
    }
  }
}

export function cPStuff(this: void): undefined {
  if (STATE.settingsVars.settings.showRealCPs === true) {
    hookChampionRankUtils()
    const runOnce = STATE.runGroupListCounter === 0
    hookGroupList(runOnce)
  } else {
    globalThis.GetLevelOrChampionPointsStringNoIcon = STATE.originalCPFunc
    if (isCPGetter(STATE.originalUnitCPEffectiveFunc)) {
      globalThis.GetUnitEffectiveChampionPoints = STATE.originalUnitCPEffectiveFunc
    }
    if (isCPGetter(STATE.originalUnitCPFunc)) {
      globalThis.GetUnitChampionPoints = STATE.originalUnitCPFunc
    }
  }
}

let EVENT_GROUP_ELECTIONS_WAS_ADDED = false

export function groupElectionStuff(this: void): undefined {
  if (EVENT_GROUP_ELECTIONS_WAS_ADDED === true) {
    return
  }
  EM.RegisterForEvent(
    STATE.addonVars.addonName + "_GroupElection",
    EVENT_GROUP_ELECTION_NOTIFICATION_ADDED,
    (): undefined => {
      if (STATE.settingsVars.settings.autoDeclineGroupElections !== true) {
        return
      }
      if (IsInCyrodiil() || IsInImperialCity() || IsUnitInDungeon(PLAYER_TAG) || IsPlayerInRaid()) {
        return
      }
      const [, , electionDescriptor] = GetGroupElectionInfo()
      if (electionDescriptor === ZO_GROUP_ELECTION_DESCRIPTORS.READY_CHECK) {
        CastGroupVote(GROUP_VOTE_CHOICE_AGAINST)
      }
    }
  )
}

export function toggleGroupElectionAutoDecline(this: void): undefined {
  STATE.settingsVars.settings.autoDeclineGroupElections =
    STATE.settingsVars.settings.autoDeclineGroupElections !== true
}
