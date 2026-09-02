import {
  asGlobalTable,
  asNumber,
  asNumberArray,
  asRecord,
  asString,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"
import type {
  AccountRecord,
  ChunkedData,
  MasterList,
  SavedVars,
} from "../knowledge-types/knowledge-types.module.code.ts"
import "../knowledge-init-chardata/knowledge-init-chardata.module.code.ts"

const DIAGNOSTICS = INTERNAL.diagnostics

function asSavedVars(value: unknown): SavedVars {
  return value as SavedVars
}

type RefIdStore = Record<number, number>
function asRefIdStore(value: unknown): RefIdStore {
  return value as RefIdStore
}

type ScribingData = [string, number]
function asScribingData(value: ScribingData | undefined): ScribingData {
  return value as ScribingData
}

function asAccountRecord(value: Record<string, unknown>): AccountRecord {
  return value as AccountRecord
}

type MaybeChunkedData = ChunkedData | undefined
function asMaybeChunkedData(value: unknown): MaybeChunkedData {
  return value as MaybeChunkedData
}
type Cache = Record<number, boolean>
function asCache(value: unknown): Cache {
  return value as Cache
}

INTERNAL.Initialize = function (this: void): undefined {
  DIAGNOSTICS.Stopwatch(true)

  PUBLIC.RegisterForCallback(
    INTERNAL.name,
    PUBLIC.EVENT_INITIALIZED,
    INTERNAL.RegisterSettingsPanel
  )

  const existing = asGlobalTable(globalThis).LibCharacterKnowledgeData
  if (existing === undefined || asSavedVars(existing).formatVersion !== INTERNAL.FORMAT_VERSION) {
    asGlobalTable(globalThis).LibCharacterKnowledgeData = {
      formatVersion: INTERNAL.FORMAT_VERSION,
    }
  }
  INTERNAL.vars = asSavedVars(asGlobalTable(globalThis).LibCharacterKnowledgeData)

  if (INTERNAL.vars.diagnostics === undefined) {
    INTERNAL.vars.diagnostics = {}
  }
  DIAGNOSTICS.vars = INTERNAL.vars.diagnostics

  if (INTERNAL.vars.defaults === undefined) {
    const defaults = asRecord({})
    defaults[INTERNAL.CATEGORY_RECIPE] = 4
    defaults[INTERNAL.CATEGORY_PLAN] = 4
    defaults[INTERNAL.CATEGORY_MOTIF] = 4
    defaults[INTERNAL.CATEGORY_SCRIBING] = 2
    defaults[INTERNAL.CATEGORY_RESEARCH] = 2
    defaults["priority"] = INTERNAL.PRIORITY_RANK_DEFAULT
    INTERNAL.vars.defaults = asAccountRecord(defaults)
  }

  const defaults = asRecord(INTERNAL.vars.defaults)
  if (defaults[INTERNAL.CATEGORY_SCRIBING] === undefined) {
    defaults[INTERNAL.CATEGORY_SCRIBING] = 2
  }
  if (defaults[INTERNAL.CATEGORY_RESEARCH] === undefined) {
    defaults[INTERNAL.CATEGORY_RESEARCH] = 2
  }

  const vars = asRecord(INTERNAL.vars)
  const internal = asRecord(INTERNAL)
  for (const [, key] of ipairs(["accounts", "characters"])) {
    if (vars[key] === undefined) {
      vars[key] = {}
    }
    const section = asRecord(vars[key])
    if (section[INTERNAL.server] === undefined) {
      section[INTERNAL.server] = {}
    }
    internal[key] = vars[key]
  }

  INTERNAL.LoadMotifData()

  DIAGNOSTICS.Stopwatch()
  if (INTERNAL.GetMasterListParam("api") > 0 && INTERNAL.GetMasterListParam("fieldSize") > 0) {
    INTERNAL.ReadMasterList()
  } else {
    INTERNAL.Datamine()
  }
}

INTERNAL.ReadMasterList = function (this: void, finalizeBaseDataLoad?: boolean): undefined {
  const fieldSize = INTERNAL.GetMasterListParam("fieldSize")

  for (const [, category] of ipairs(INTERNAL.ItemIdStores)) {
    const encoded = LCCC.Unchunk(asMaybeChunkedData(asRecord(INTERNAL.vars.masterList)[category]))
    const length = zo_strlen(encoded)
    const decoded: number[] = []
    let i = 1
    while (i < length) {
      const [itemId, nextPos] = LCCC.ReadAndDecode(encoded, i, fieldSize)
      i = nextPos
      decoded.push(itemId)
    }
    INTERNAL.ids[category] = decoded
  }

  let validMaxIds = true
  for (const [key] of pairs(INTERNAL.ScribingTypes)) {
    INTERNAL.maxIds[key] = INTERNAL.GetMasterListParam("maxId_" + key)
    if (INTERNAL.maxIds[key] <= 0) {
      validMaxIds = false
    }
  }

  if (finalizeBaseDataLoad === true) {
    INTERNAL.MsgTag(GetString(SI_LCK_SCAN_COMPLETE))
    INTERNAL.MigrateData("flush")
    INTERNAL.InitializeCharacterData()
  } else if (
    INTERNAL.GetMasterListParam("api") === GetAPIVersion() &&
    !INTERNAL.DoesNewerBaseDataExist() &&
    validMaxIds
  ) {
    INTERNAL.InitializeCharacterData()
  } else {
    INTERNAL.MigrateData("start")
  }
}

INTERNAL.WriteMasterList = function (this: void, maxId: number): undefined {
  const fieldSize = zo_ceil(math.log(maxId) / math.log(64))

  const masterList: MasterList = {
    api: GetAPIVersion(),
    fieldSize: fieldSize,
    timestamp: GetTimeStamp(),
  }
  INTERNAL.vars.masterList = masterList

  DIAGNOSTICS.vars.masterList = {}
  const diagMasterList = asRecord(DIAGNOSTICS.vars.masterList)
  const masterListRec = asRecord(masterList)

  for (const [, category] of ipairs(INTERNAL.ItemIdStores)) {
    const encoded: string[] = []
    for (const [, id] of ipairs(asNumberArray(INTERNAL.ids[category]))) {
      encoded.push(LCCC.Encode(id, fieldSize))
    }
    masterListRec[category] = LCCC.Chunk(table.concat(encoded, ""))
    diagMasterList[category] = encoded.length
  }

  for (const [key] of pairs(INTERNAL.ScribingTypes)) {
    masterListRec["maxId_" + key] = INTERNAL.maxIds[key]
  }

  INTERNAL.MsgTag(GetString(SI_LCK_SCAN_COMPLETE))
  INTERNAL.MigrateData("flush")
  INTERNAL.InitializeCharacterData()
}

INTERNAL.Datamine = function (this: void): undefined {
  INTERNAL.MsgTag(GetString(SI_LCK_SCAN_START))

  if (INTERNAL.DoesValidBaseDataExist()) {
    INTERNAL.vars.masterList = INTERNAL.BaseData
    INTERNAL.ReadMasterList(true)
    return
  } else if (ZO_IsConsoleOrGameCoreUI()) {
    INTERNAL.MsgTag(GetString(SI_LCK_SCAN_CONSOLE))
    return
  }

  const blockSize = 10000

  for (const [, category] of ipairs(INTERNAL.ItemIdStores)) {
    INTERNAL.ids[category] = []
  }

  for (const [key, data] of pairs(INTERNAL.ScribingTypes)) {
    INTERNAL.maxIds[key] = data.max()
    const store = asRefIdStore(asNumberArray(INTERNAL.ids[key]))
    for (let i = 1; i <= INTERNAL.maxIds[key]; i++) {
      store[i] = 0
    }
  }

  let startId = 1
  let invalidCount = 0
  let lastValidId = 0

  EVENT_MANAGER.RegisterForUpdate(
    INTERNAL.name,
    INTERNAL.scanThrottle,
    function (this: void): undefined {
      const stopId = startId + blockSize
      for (let i = startId; i <= stopId - 1; i++) {
        const [category, quality, data] = INTERNAL.GetItemCategoryAndQuality(i)
        if (category === INTERNAL.CATEGORY_INVALID) {
          invalidCount = invalidCount + 1
          if (invalidCount === blockSize) {
            EVENT_MANAGER.UnregisterForUpdate(INTERNAL.name)
            INTERNAL.WriteMasterList(lastValidId)
            return
          }
        } else {
          invalidCount = 0
          lastValidId = i
          if (category === INTERNAL.CATEGORY_SCRIBING) {
            const scribeKey = asString(
              asRecord(INTERNAL)[
                quality === SCRIBING_SLOT_NONE ? "SCRIBE_GRIMOIRE" : "SCRIBE_SCRIPT"
              ]
            )
            const tbl = asRefIdStore(asNumberArray(INTERNAL.ids[scribeKey]))
            const scribingData = asScribingData(data)
            const bindType = GetItemLinkBindType(scribingData[0])
            const refId = scribingData[1]
            if (
              tbl[refId] === 0 ||
              (bindType !== BIND_TYPE_ON_PICKUP && bindType !== BIND_TYPE_ON_PICKUP_BACKPACK)
            ) {
              tbl[refId] = i
            }
          } else if (category !== INTERNAL.CATEGORY_NONE) {
            asNumberArray(INTERNAL.ids[asString(category)]).push(i)
          }
        }
      }
      startId = stopId
    }
  )
}

INTERNAL.MigrateData = function (this: void, phase: string): undefined {
  if (phase === "start") {
    for (const [server, characters] of pairs(INTERNAL.characters)) {
      for (const [id, data] of pairs(characters)) {
        for (const [, category] of ipairs(INTERNAL.Categories)) {
          if (asRecord(data)[category] !== undefined) {
            INTERNAL.GetKnowledge(server, id, category)
          }
        }
      }
    }
    INTERNAL.Datamine()
  } else if (phase === "flush") {
    for (const [server, characters] of pairs(INTERNAL.caches)) {
      for (const [id, data] of pairs(characters)) {
        for (const [, category] of ipairs(INTERNAL.Categories)) {
          if (asRecord(data)[category] !== undefined) {
            INTERNAL.ScanAndEncodeKnowledgeCategory(
              server,
              id,
              category,
              asCache(asRecord(data)[category])
            )
          }
        }
      }
    }
  }
}

INTERNAL.DoesValidBaseDataExist = function (this: void): boolean {
  return type(INTERNAL.BaseData) === "table" && asRecord(INTERNAL.BaseData).api === GetAPIVersion()
}

INTERNAL.DoesNewerBaseDataExist = function (this: void): boolean {
  return (
    INTERNAL.DoesValidBaseDataExist() &&
    type(asRecord(INTERNAL.BaseData).timestamp) === "number" &&
    asNumber(asRecord(INTERNAL.BaseData).timestamp) > INTERNAL.GetMasterListParam("timestamp")
  )
}

LCCC.RunAfterInitialLoadscreen(function (this: void): undefined {
  zo_callLater(() => INTERNAL.Initialize(), INTERNAL.scanThrottle)
})
