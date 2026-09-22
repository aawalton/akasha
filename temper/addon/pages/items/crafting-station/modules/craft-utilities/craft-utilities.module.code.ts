import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import { SETS } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-sets-data/craft-sets-data.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-provisioner-station/eso-provisioner-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function getTotalSpentSkillPoints(): number {
  let count = 0
  for (const [, skillTypeData] of SKILLS_DATA_MANAGER.SkillTypeIterator()) {
    for (const [, skillLineData] of skillTypeData.SkillLineIterator()) {
      count = count + SKILL_POINT_ALLOCATION_MANAGER.GetNumPointsAllocatedInSkillLine(skillLineData)
    }
  }
  return count
}

export function getSkyShards(asString: true): LuaMultiReturn<[text: string]>
export function getSkyShards(asString?: false): LuaMultiReturn<[acquired: number, total: number]>
export function getSkyShards(
  asString?: boolean
): LuaMultiReturn<[acquiredOrText: number | string, total?: number]> {
  let acquired = 0
  let total = 0
  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined) {
    const [acquired2, total2] = ZONE_STORIES_MANAGER.GetActivityCompletionProgressValues(
      zoneId,
      ZONE_COMPLETION_TYPE_SKYSHARDS
    )
    total = total + total2
    acquired = acquired + acquired2
    zoneId = GetNextZoneStoryZoneId(zoneId)
  }

  const [, coldharbourCompleted] = GetAchievementCriterion(993, 1)
  acquired = acquired + coldharbourCompleted
  total = total + 1

  if (asString === true) {
    return $multi(`${acquired}/${total}`)
  }
  return $multi(acquired, total)
}

export function getQuest(): undefined {
  function getQuestCraft(qName: string): number | false {
    const craftString: Record<number, string[]> = {
      [CRAFTING_TYPE_BLACKSMITHING]: [
        "blacksmith",
        "schmied",
        "forge",
        "forgeron",
        "ferraria",
        "кузнецов",
      ],
      [CRAFTING_TYPE_CLOTHIER]: ["cloth", "schneider", "tailleur", "alfaiataria", "портных"],
      [CRAFTING_TYPE_ENCHANTING]: [
        "enchant",
        "verzauber",
        "enchantement",
        "enchanteur",
        "encantador",
        "зачарователей",
      ],
      [CRAFTING_TYPE_ALCHEMY]: [
        "alchemist",
        "alchemie",
        "alchimie",
        "alchimiste",
        "alquimista",
        "алхимиков",
      ],
      [CRAFTING_TYPE_PROVISIONING]: [
        "provision",
        "versorg",
        "cuisine",
        "cuisinier",
        "culinária",
        "снабженцев",
      ],
      [CRAFTING_TYPE_WOODWORKING]: [
        "woodwork",
        "schreiner",
        "travail du bois",
        "marcenaria",
        "столяров",
      ],
      [CRAFTING_TYPE_JEWELRYCRAFTING]: [
        "jewelry crafting",
        "schmuckhandwerks",
        "joaillerie",
        "joalheria",
        "ювелиру",
        "ювелиров",
      ],
    }
    for (const [x, craft] of pairs(craftString)) {
      for (const s of craft) {
        const [found] = string.find(string.lower(qName), s)
        if (found !== undefined) {
          return x
        }
      }
    }
    return false
  }
  STATE.Quest = {}
  for (let qId = 1; qId <= MAX_JOURNAL_QUESTS; qId++) {
    if (IsValidQuestIndex(qId)) {
      if (GetJournalQuestType(qId) === QUEST_TYPE_CRAFTING) {
        const [qName, , activeText, , , completed] = GetJournalQuestInfo(qId)
        const craft = getQuestCraft(qName)
        if (craft !== false && !completed) {
          STATE.Quest[craft] = {
            id: qId,
            name: zo_strformat("|cFFFFFF<<C:1>>|r", qName),
            work: {},
          }
          const numConditions = GetJournalQuestNumConditions(qId, 1)
          for (let cId = 1; cId <= numConditions; cId++) {
            let [text, current, maximum, , complete] = GetJournalQuestConditionInfo(qId, 1, cId)
            if (text !== undefined && text !== "" && !complete) {
              if (current === maximum) {
                text = `|c00FF00${text}|r`
              }
              STATE.Quest[craft].work[cId] = text
            }
          }
        } else if (craft !== false) {
          STATE.Quest[craft] = {
            id: qId,
            name: `|cFFFFFF${qName}|r`,
            work: { [1]: activeText },
          }
        }
      }
    }
  }
}

export function getTime(seconds?: number): string {
  if (seconds !== undefined && seconds > 0) {
    const formatted = tostring(
      ZO_FormatTime(seconds, TIME_FORMAT_STYLE_COLONS, TIME_FORMAT_PRECISION_SECONDS)
    )
    const ts: Record<number, string> = {}
    let endtime = ""
    let y = 0
    for (const [x] of string.gmatch(formatted, "%d+")) {
      ts[y] = x ?? ""
      y = y + 1
    }
    if (y === 4) {
      const t1 = tonumber(ts[1])
      if (t1 !== undefined && t1 < 10) {
        ts[1] = `0${ts[1] ?? ""}`
      }
      endtime = `${ts[0] ?? ""}d ${ts[1] ?? ""}:${ts[2] ?? ""}h`
    }
    if (y === 3) {
      const t0 = tonumber(ts[0])
      if (t0 !== undefined && t0 < 10) {
        ts[0] = `0${ts[0] ?? ""}`
      }
      endtime = `${ts[0] ?? ""}:${ts[1] ?? ""}h`
    }
    if (y === 2) {
      endtime = `${ts[0] ?? ""}min`
    }
    return endtime
  }
  return `|cFF4020${STATE.Loc.finished}|r`
}

interface WayshrineButtonData {
  set: number
  travel: boolean
  info: string
}

export function travelToNode(
  control: Control & { data?: WayshrineButtonData },
  node: number
): undefined {
  if (control.data !== undefined) {
    if (control.data.travel) {
      FastTravelToNode(defined(defined(SETS[control.data.set]).nodes[node]))
    } else {
      STATE.Chat.Print(STATE.Loc.unknownWayshrine)
    }
  } else {
    STATE.Chat.Print(STATE.Loc.unselectedWayshrine)
  }
}
