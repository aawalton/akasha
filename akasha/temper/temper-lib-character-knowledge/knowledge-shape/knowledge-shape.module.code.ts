import type {
  Account,
  AccountMap,
  Category,
  CharacterListEntry,
  CharacterMap,
  CharId,
  ChunkedData,
  DiagnosticsVars,
  ItemInput,
  Knowledge,
  MasterList,
  MotifAssociations,
  MotifData,
  SavedVars,
  Server,
  StyleMotifItems,
} from "../knowledge-types/knowledge-types.module.code.ts"

export interface ScribingType {
  order: number
  know: (this: void, id: number) => boolean
  max: (this: void) => number
}

export interface ResearchReverseEntry {
  craftingSkillType: number
  researchLineIndex: number
  traitIndex: number
}

export interface Diagnostics {
  times?: number[]
  tick?: number
  vars: DiagnosticsVars
  Stopwatch: (this: void, start?: boolean) => void
  LogTime: (this: void, name: string) => void
}

export type CallbackRegistry = Record<
  number,
  Record<string, (this: void, ...args: unknown[]) => void>
>

export interface InternalTable {
  name: string
  CATEGORY_RECIPE: "recipes"
  CATEGORY_PLAN: "plans"
  CATEGORY_MOTIF: "motifs"
  CATEGORY_SCRIBING: "sc"
  CATEGORY_RESEARCH: "rt"
  CATEGORY_NONE: false
  CATEGORY_INVALID: undefined
  SCRIBE_GRIMOIRE: "grimoires"
  SCRIBE_SCRIPT: "scripts"
  QUALITY_LOW: 1
  QUALITY_MEDIUM: 2
  QUALITY_HIGH: 3
  KNOWLEDGE_INVALID: -1
  KNOWLEDGE_NODATA: 0
  KNOWLEDGE_KNOWN: 1
  KNOWLEDGE_UNKNOWN: 2
  PRIORITY_RANKS: 100
  PRIORITY_RANK_DEFAULT: 50
  FORMAT_VERSION: 1
  ENCODE_BITS: 6
  FIELD_BITS: 30
  FIELD_BYTES: 5
  scanThrottle: number
  server: Server
  userId: Account
  charId: CharId

  maxIds: Record<Category, number>
  ids: Record<Category, number[]>
  idsPublic: Record<Category, number[]>
  caches: Record<Server, Record<CharId, Record<Category, Record<number, boolean>>>>
  cachedCharLists: Record<Server, CharacterListEntry[]>
  cachedFilteredServerList?: Server[]
  cachedResultIds?: Record<number, number>
  initialized: boolean
  accounts: Record<Server, AccountMap>
  characters: Record<Server, CharacterMap>
  diagnostics: Diagnostics

  Categories: Category[]
  ScribingTypes: Record<Category, ScribingType>
  ItemIdStores: Category[]
  DataStores: Category[]
  KnowFunctions: Record<Category, (this: void, itemLink: string) => boolean>
  CategoryLabels: Record<Category, string>
  ItemQualityTranslation: Record<number, number>
  TRADESKILL_TYPES?: number[]

  BaseData?: MasterList
  MotifData: MotifData
  InvalidIds: Record<number, boolean>
  StyleQuality: Record<number, number>

  vars: SavedVars
  motifAssociations?: MotifAssociations
  chapters?: Array<{ id: number; name: string }>
  callbacks: CallbackRegistry
  settingsPanel?: unknown
  shareText?: string

  Msg: (this: void, text: string) => void
  MsgTag: (this: void, text: string) => void
  GetItemLink: (this: void, itemId: number, linkStyle?: number) => string
  GetCharRawData: (
    this: void,
    server: Server,
    charId: CharId,
    category: Category
  ) => ChunkedData | undefined
  TranslateItem: (this: void, item: ItemInput) => LuaMultiReturn<[number, string, number]>
  GetItemCategoryAndQuality: (
    this: void,
    item: ItemInput
  ) => LuaMultiReturn<[Category | false | undefined, number?, [string, number]?]>
  GetMasterListParam: (this: void, key: string) => number
  CanSave: (this: void, account?: Account) => boolean
  GetCaches: (
    this: void,
    server: Server,
    charId: CharId
  ) => Record<Category, Record<number, boolean>>
  GetKnowledge: (
    this: void,
    server: Server,
    charId: CharId,
    category: Category
  ) => Record<number, boolean>
  GetItemKnowledge: (
    this: void,
    server: Server,
    charId: CharId,
    category: Category | false | undefined,
    itemId: number,
    itemLink?: string,
    styleId?: number
  ) => Knowledge
  IsCharacterEnabled: (this: void, server: Server, charId: CharId) => boolean
  GetEffectiveParameterValue: (this: void, server: Server, charId: CharId, param: string) => number
  GetCharacterParams: (this: void, server: Server, charId: CharId) => unknown
  Sort: (this: void, server: Server, charIds: CharId[], usePriority?: boolean) => void
  AccountFilter: (
    this: void,
    accountFilter: unknown,
    character: CharacterListEntry
  ) => boolean | undefined
  NotifyRefresh: (this: void, invalidateCharacterList?: boolean) => void

  LoadMotifData: (this: void) => void
  GetMotifStyleAndChapter: (
    this: void,
    itemId: number,
    _unused?: unknown,
    styleId?: number
  ) => LuaMultiReturn<[number, number]>
  GetStyleIds: (this: void) => number[] | undefined
  GetStyleMotifItems: (this: void, styleId: number) => StyleMotifItems | undefined
  GetStyleQuality: (this: void, styleId: number) => number

  Initialize: (this: void) => void
  ReadMasterList: (this: void, finalizeBaseDataLoad?: boolean) => void
  WriteMasterList: (this: void, maxId: number) => void
  Datamine: (this: void) => void
  MigrateData: (this: void, phase: string) => void
  DoesValidBaseDataExist: (this: void) => boolean
  DoesNewerBaseDataExist: (this: void) => boolean
  InitializeCharacterData: (this: void) => void
  RefreshKnowledge: (this: void) => void

  ScanKnowledge: (this: void) => void
  ScanAndEncodeKnowledgeCategory: (
    this: void,
    server: Server,
    charId: CharId,
    category: Category,
    cache?: Record<number, boolean>
  ) => Record<number, boolean>
  FixIncorrectMotifBookKnowledge: (this: void, cache: Record<number, boolean>) => void

  ScribingScanAndEncode: (this: void) => string
  ScribingGetKnowledge: (
    this: void,
    server: Server,
    charId: CharId,
    key: Category,
    id: number
  ) => Knowledge

  ResearchScanAndEncode: (this: void) => string
  ResearchGetTraitKnowledge: (
    this: void,
    server: Server,
    charId: CharId,
    ...args: number[]
  ) => Knowledge
  ResearchGetMaxSlots: (
    this: void,
    server: Server,
    charId: CharId,
    craftingSkillType: number
  ) => number
  ReadResearchTimes: (
    this: void,
    server: Server,
    charId: CharId,
    index?: number
  ) => LuaMultiReturn<[number, number]> | Array<Record<string, unknown>> | undefined
  ResearchGetTime: (
    this: void,
    server: Server,
    charId: CharId,
    ...args: number[]
  ) => LuaMultiReturn<[number?, number?]>
  ResearchGetResearchability: (
    this: void,
    server: Server,
    charId: CharId,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    extendedCheck: boolean
  ) => number | boolean
  ResearchGetIndicesFromItemLink: (
    this: void,
    itemLink: string
  ) => LuaMultiReturn<[number?, number?, number?]>
  ResearchCheckPassives: (this: void) => boolean

  FireCallbacks: (this: void, eventCode: number, ...args: unknown[]) => void

  RegisterSettingsPanel: (this: void) => void
  SettingsBuildOptionsList: (
    this: void,
    min: number,
    max: number,
    labelFunc: (this: void, i: number, min: number, max: number) => string
  ) => LuaMultiReturn<[number[], string[], number[], string[]]>
  SettingsBuildControlCluster: (
    this: void,
    options: Record<string, { values: number[]; labels: string[] }>,
    server?: Server,
    account?: Account,
    charId?: CharId
  ) => unknown[]
  SettingsRankingsGetList: (this: void, server: Server) => string
  SettingsBuildMainSection: (this: void) => unknown[]
  CountExportSelection: (this: void) => number
  GetExportSelectedText: (this: void) => string
  ExportSelectText: (this: void) => void
  CreateExportEntry: (
    this: void,
    server: Server,
    charId: CharId,
    ignoreExportFlag?: boolean
  ) => LuaMultiReturn<[string, { server?: Server; identifier?: string; timestamp?: number }]>
  ExportCurrent: (this: void) => void
  ExportMultiple: (this: void, exportAll: boolean) => void
  Import: (this: void) => void
  ProcessImportData: (
    this: void,
    dataset: Array<{ version: number; payload: string }>
  ) => LuaMultiReturn<[number, number | undefined, boolean]>
}

export interface PublicTable {
  ITEM_CATEGORY_NONE: 0
  ITEM_CATEGORY_RECIPE: 1
  ITEM_CATEGORY_PLAN: 2
  ITEM_CATEGORY_MOTIF: 3
  ITEM_CATEGORY_SCRIBING: 4
  ITEM_CATEGORIES: Record<number, string>
  KNOWLEDGE_INVALID: number
  KNOWLEDGE_NODATA: number
  KNOWLEDGE_KNOWN: number
  KNOWLEDGE_UNKNOWN: number
  EVENT_INITIALIZED: 1
  EVENT_UPDATE_REFRESH: 2

  GetServerList: (this: void) => Server[]
  GetFilteredServerList: (this: void) => Server[]
  GetCharacterList: (this: void, server?: Server) => CharacterListEntry[]
  GetItemLinkFromItemId: (this: void, itemId: number, linkStyle?: number) => string
  GetItemName: (this: void, item: ItemInput) => string
  GetItemCategory: (this: void, item: ItemInput) => number
  GetItemKnowledgeForCharacter: (
    this: void,
    item: ItemInput,
    server?: Server,
    charId?: CharId
  ) => Knowledge
  GetItemKnowledgeList: (
    this: void,
    item: ItemInput,
    server?: Server,
    includedCharIds?: Record<CharId, boolean>,
    accountFilter?: unknown
  ) => CharacterListEntry[]
  IsKnowledgeUsable: (this: void, knowledge: Knowledge) => boolean
  GetItemIdsForCategory: (this: void, category: number) => number[]
  GetSourceItemIdFromResultItem: (this: void, resultItem: ItemInput) => number
  GetMotifStyles: (this: void) => number[] | undefined
  GetStyleAndChapterFromMotif: (this: void, item: ItemInput) => LuaMultiReturn<[number, number]>
  GetMotifItemsFromStyle: (this: void, styleId: number) => StyleMotifItems | undefined
  GetMotifChapterNames: (this: void) => Array<{ id: number; name: string }>
  GetMotifStyleQuality: (this: void, styleId: number) => number
  GetMotifKnowledgeForCharacter: (
    this: void,
    styleId: number,
    chapterId?: number,
    ...rest: Array<Server | CharId>
  ) => Knowledge
  GetLastScanTime: (this: void, server?: Server, charId?: CharId) => number
  GetRawCharacterSettings: (this: void, server?: Server, charId?: CharId) => unknown

  IsCraftedAbilityUnlockedByCharacter: (
    this: void,
    id: number,
    server?: Server,
    charId?: CharId
  ) => Knowledge
  IsCraftedAbilityScriptUnlockedByCharacter: (
    this: void,
    id: number,
    server?: Server,
    charId?: CharId
  ) => Knowledge
  GetMaxCraftedAbilityId: (this: void) => number
  GetMaxCraftedAbilityScriptId: (this: void) => number
  GetItemForCraftedAbility: (this: void, id: number) => number
  GetItemForCraftedAbilityScript: (this: void, id: number) => number
  GetCraftedAbilityScriptDescriptions: (this: void, id: number) => unknown[]

  GetMaxSimultaneousSmithingResearchForCharacter: (
    this: void,
    craftingSkillType: number,
    server?: Server,
    charId?: CharId
  ) => number
  GetSmithingResearchLineTraitInfoForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: Server,
    charId?: CharId
  ) => LuaMultiReturn<[number, string, boolean]>
  GetSmithingResearchLineTraitTimesForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: Server,
    charId?: CharId
  ) => LuaMultiReturn<[number?, number?]>
  CanItemLinkBeTraitResearchedByCharacter: (
    this: void,
    itemLink: string,
    server?: Server,
    charId?: CharId
  ) => number | boolean
  GetTraitInfo: (
    this: void,
    traitType: number,
    researchLineIndex?: number,
    traitIndex?: number
  ) => unknown
  GetTraitList: (this: void) => unknown
  GetSmithingResearchTradeskillTypes: (this: void) => unknown
  GetSmithingResearchFromItemLink: (
    this: void,
    itemLink: string
  ) => LuaMultiReturn<[number?, number?, number?]>
  GetSmithingResearchStatusForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: Server,
    charId?: CharId
  ) => LuaMultiReturn<[Knowledge, number?]>
  GetSmithingResearchStatusForCharacters: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: Server,
    includedCharIds?: Record<CharId, boolean>,
    accountFilter?: unknown
  ) => CharacterListEntry[]
  GetSmithingResearchLineKnownTraitCountForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    server?: Server,
    charId?: CharId
  ) => number
  CanTraitBeImmediatelyResearchedByCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: Server,
    charId?: CharId
  ) => number | boolean
  GetAllActiveResearchItemsList: (this: void) => Array<Record<string, unknown>>

  RegisterForCallback: (
    this: void,
    name: string,
    eventCode: number,
    callback: (this: void, ...args: unknown[]) => void
  ) => boolean
  UnregisterForCallback: (this: void, name: string, eventCode: number) => boolean
  OpenSettingsPanel: (this: void) => void
}
