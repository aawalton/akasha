import { GAME_DATA } from "../skill-point-finder-game-data/skill-point-finder-game-data.module.code.ts"
import { updateGuiTable } from "../skill-point-finder-gui-table/skill-point-finder-gui-table.module.code.ts"
import { questCompleted } from "../skill-point-finder-helpers/skill-point-finder-helpers.module.code.ts"
import {
  requireSVar,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import type {
  PointsData,
  PointTotals,
  Settings,
} from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"

export function calculateTotalPoints(this: void): PointTotals {
  let quests = 0
  let skyshards = 0
  for (const zi of GAME_DATA.zones) {
    quests = quests + zi.quests.length
    zi.skyshards = GetNumSkyshardsInZone(GAME_DATA.ZId.ZN[zi.key] ?? 0)
    skyshards = skyshards + zi.skyshards
  }

  const level = 64
  const mainQ = GAME_DATA.MQ.length
  const folDis = 2
  const pvpRank = 50
  const maelAr = 1
  const endlArch = 1
  const tutorial = 1
  const genTot = level + mainQ + folDis + tutorial + pvpRank + maelAr + endlArch
  const ssTot = math.floor(skyshards / 3)
  const gdTot = GAME_DATA.GD.length
  const pdTot = GAME_DATA.PD.length

  return {
    ZQTot: quests,
    numSSTot: skyshards,
    SSTot: ssTot,
    GDTot: gdTot,
    PDTot: pdTot,
    Level: level,
    MainQ: mainQ,
    FolDis: folDis,
    PvPRank: pvpRank,
    MaelAr: maelAr,
    EndlArch: endlArch,
    GenTot: genTot,
    Tot: genTot + gdTot + quests + ssTot + pdTot,
  }
}

function selectedPts(this: void): PointsData | undefined {
  return requireSVar().ptsData[STATE.selectedChar]
}

export function checkSavedVars(this: void, value: PointsData | Settings | undefined): boolean {
  const charId = GetCurrentCharacterId()
  if (STATE.selectedChar !== charId) {
    return false
  }
  if (value === undefined) {
    const sVar = requireSVar()
    sVar.settings[charId] = TemperTableFunctions.CopyTable(STATE.settings)
    sVar.ptsData[charId] = TemperTableFunctions.CopyTable(STATE.ptsData)
  }
  return true
}

function setLevelPoints(this: void): undefined {
  const level = GetUnitLevel("player")
  STATE.ptsData.Level = math.floor(level / 5) + math.floor(level / 10) + (level - 1)

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.Level = STATE.ptsData.Level
    }
  }
}

function setQuestPoints(this: void): undefined {
  for (const questId of GAME_DATA.MQ) {
    STATE.ptsData.MainQ = STATE.ptsData.MainQ + (questCompleted(questId) ? 1 : 0)
  }

  STATE.ptsData.tutorial =
    questCompleted(GAME_DATA.tutorials.MO) ||
    questCompleted(GAME_DATA.tutorials.SO) ||
    questCompleted(GAME_DATA.tutorials.EO) ||
    questCompleted(GAME_DATA.tutorials.GO) ||
    questCompleted(GAME_DATA.tutorials.BO) ||
    STATE.settings.TUT
      ? 1
      : 0

  STATE.ptsData.EndlArch = questCompleted(GAME_DATA.EA[0] ?? 0) ? 1 : 0

  for (const zd of GAME_DATA.zones) {
    let zoneQuests = 0
    for (const quest of zd.quests) {
      zoneQuests = zoneQuests + (questCompleted(quest) ? 1 : 0)
    }
    STATE.ptsData.ZQ[zd.key] = zoneQuests
    STATE.ptsData.ZQTot = STATE.ptsData.ZQTot + zoneQuests
  }

  for (const d of GAME_DATA.GD) {
    const done = questCompleted(d.quest) ? 1 : 0
    STATE.ptsData.GD[d.key] = done
    STATE.ptsData.GDTot = STATE.ptsData.GDTot + done
  }

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.MainQ = STATE.ptsData.MainQ
      pts.tutorial = STATE.ptsData.tutorial
      pts.EndlArch = STATE.ptsData.EndlArch
      pts.ZQ = TemperTableFunctions.CopyTable(STATE.ptsData.ZQ)
      pts.GD = TemperTableFunctions.CopyTable(STATE.ptsData.GD)
      pts.ZQTot = STATE.ptsData.ZQTot
      pts.GDTot = STATE.ptsData.GDTot
    }
  }
}

function setPublicDungeonPoints(this: void): undefined {
  for (const d of GAME_DATA.PD) {
    const done = IsAchievementComplete(d.achievement) ? 1 : 0
    STATE.ptsData.PD[d.key] = done
    STATE.ptsData.PDTot = STATE.ptsData.PDTot + done
  }

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.PD = TemperTableFunctions.CopyTable(STATE.ptsData.PD)
      pts.PDTot = STATE.ptsData.PDTot
    }
  }
}

function setSkyshardPoints(this: void): undefined {
  for (const zd of GAME_DATA.zones) {
    const zId = GAME_DATA.ZId.ZN[zd.key] ?? 0
    let found = 0
    for (let i = 1; i <= zd.skyshards; i++) {
      const ssId = GetZoneSkyshardId(zId, i)
      if (GetSkyshardDiscoveryStatus(ssId) === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
        found = found + 1
      }
    }
    STATE.ptsData.SS[zd.key] = found
    STATE.ptsData.numSSTot = STATE.ptsData.numSSTot + found
  }

  if ((STATE.ptsData.SS["WP"] ?? 0) === 0 && questCompleted(GAME_DATA.MQ[0] ?? 0)) {
    STATE.ptsData.SS["WP"] = 1
    STATE.ptsData.numSSTot = STATE.ptsData.numSSTot + 1
  }

  STATE.ptsData.SSTot = math.floor(STATE.ptsData.numSSTot / 3)

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.SS = TemperTableFunctions.CopyTable(STATE.ptsData.SS)
      pts.numSSTot = STATE.ptsData.numSSTot
      pts.SSTot = STATE.ptsData.SSTot
    }
  }
}

function getTypeSpentPoints(this: void, skillTypeData: SkillTypeData): number {
  let total = 0
  for (const skillLineData of skillTypeData.orderedSkillLines) {
    total = total + SKILL_POINT_ALLOCATION_MANAGER.GetNumPointsAllocatedInSkillLine(skillLineData)
  }
  return total
}

function getTotSkillPoints(this: void): number {
  let total = SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()
  for (const [, skillTypeData] of SKILLS_DATA_MANAGER.SkillTypeIterator()) {
    total = total + getTypeSpentPoints(skillTypeData)
  }
  return total
}

function setFoliumDiscognitumPoints(
  this: void,
  skillPoints: number,
  countedSkillPoints: number
): undefined {
  if (STATE.settings.FD.override) {
    STATE.ptsData.FolDis = STATE.settings.FD.charHasFD ? 2 : 0
  } else if (questCompleted(3997)) {
    STATE.ptsData.FolDis = skillPoints - countedSkillPoints >= 2 ? 2 : 0
  } else {
    STATE.ptsData.FolDis = 0
  }

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.FolDis = STATE.ptsData.FolDis
    }
  }
}

function setAllianceWarRankPoints(this: void): undefined {
  const [avaRank] = GetUnitAvARank("player")
  STATE.ptsData.PvPRank = avaRank

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.PvPRank = STATE.ptsData.PvPRank
    }
  }
}

function setMaelArPoints(this: void): undefined {
  STATE.ptsData.MaelAr = IsAchievementComplete(GAME_DATA.MAAch) ? 1 : 0

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.MaelAr = STATE.ptsData.MaelAr
    }
  }
}

function setUnassigned(this: void): undefined {
  STATE.ptsData.Unassigned = GetAvailableSkillPoints()

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.Unassigned = STATE.ptsData.Unassigned
    }
  }
}

function setGeneralPoints(this: void): undefined {
  STATE.ptsData.GenTot =
    STATE.ptsData.Level +
    STATE.ptsData.MainQ +
    STATE.ptsData.FolDis +
    STATE.ptsData.tutorial +
    STATE.ptsData.PvPRank +
    STATE.ptsData.MaelAr +
    STATE.ptsData.EndlArch

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.GenTot = STATE.ptsData.GenTot
    }
  }
}

function setTotPoints(this: void): undefined {
  STATE.ptsData.Tot =
    STATE.ptsData.GenTot +
    STATE.ptsData.ZQTot +
    STATE.ptsData.SSTot +
    STATE.ptsData.GDTot +
    STATE.ptsData.PDTot

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.Tot = STATE.ptsData.Tot
    }
  }
}

export function updateAllSavedVars(this: void): undefined {
  requireSVar().ptsData[STATE.selectedChar] = TemperTableFunctions.CopyTable(STATE.ptsData)
}

function loadData(this: void, charId: string): undefined {
  const sVar = requireSVar()
  let sVarPtsData = sVar.ptsData[charId]
  if (sVarPtsData === undefined) {
    sVar.settings[charId] = TemperTableFunctions.CopyTable(STATE.settings)
    sVarPtsData = TemperTableFunctions.CopyTable(STATE.ptsData)
    sVar.ptsData[charId] = sVarPtsData
  }
  updateGuiTable(sVarPtsData)
}

export function refreshData(this: void): undefined {
  STATE.ptsData = TemperTableFunctions.SimpleResetTable(STATE.ptsData, 0)

  setLevelPoints()
  setQuestPoints()
  setPublicDungeonPoints()
  setSkyshardPoints()
  setAllianceWarRankPoints()
  setMaelArPoints()
  setUnassigned()

  const skillPoints = getTotSkillPoints()
  const countedSkillPoints =
    STATE.ptsData.Level +
    STATE.ptsData.MainQ +
    STATE.ptsData.tutorial +
    STATE.ptsData.PvPRank +
    STATE.ptsData.MaelAr +
    STATE.ptsData.EndlArch +
    STATE.ptsData.ZQTot +
    STATE.ptsData.SSTot +
    STATE.ptsData.GDTot +
    STATE.ptsData.PDTot
  setFoliumDiscognitumPoints(skillPoints, countedSkillPoints)

  if (STATE.ptsData.tutorial === 0 && skillPoints - countedSkillPoints - STATE.ptsData.FolDis > 0) {
    STATE.ptsData.tutorial = 1
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.tutorial = STATE.ptsData.tutorial
    }
  }

  setGeneralPoints()
  setTotPoints()

  updateGuiTable(STATE.ptsData)
}

export function setupData(this: void, charId: string): undefined {
  if (charId === GetCurrentCharacterId()) {
    refreshData()
    updateAllSavedVars()
  } else {
    loadData(charId)
  }
}
