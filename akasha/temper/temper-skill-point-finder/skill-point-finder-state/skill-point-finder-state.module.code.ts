import type {
  CharData,
  GuiTables,
  Options,
  PointsData,
  PointTotals,
  SavedVariablesData,
  Settings,
} from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"

export function buildDefaultSettings(this: void): Settings {
  return {
    title: { font: "ProseAntique" },
    GSP: {
      font: "Univers 57",
      doneColor: [1, 1, 1],
      needColor: [1, 1, 1],
      progColor: [1, 1, 1],
    },
    SQS: {
      font: "Univers 57",
      doneColorSS: [1, 1, 1],
      doneColorZQ: [1, 1, 1],
      needColorSS: [1, 0, 0],
      needColorZQ: [1, 0, 0],
      progColorSS: [0.7843, 0.3922, 0],
      progColorZQ: [0.7843, 0.3922, 0],
      sortCol: 1,
    },
    GDQ: {
      font: "Univers 57",
      doneColor: [1, 1, 1],
      needColor: [1, 0, 0],
      sortCol: 1,
    },
    PDB: {
      font: "Univers 57",
      doneColor: [1, 1, 1],
      needColor: [1, 0, 0],
      sortCol: 1,
    },
    FD: {
      override: false,
      charHasFD: false,
    },
    TUT: false,
  }
}

function zeroMap(this: void, keys: string[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const key of keys) out[key] = 0
  return out
}

const ZQ_KEYS = [
  "AD0",
  "AD1",
  "AD2",
  "AD3",
  "AD4",
  "AD5",
  "DC0a",
  "DC0b",
  "DC1",
  "DC2",
  "DC3",
  "DC4",
  "DC5",
  "EP0a",
  "EP0b",
  "EP1",
  "EP2",
  "EP3",
  "EP4",
  "EP5",
  "CH",
  "CY",
  "CL",
  "CC",
  "GC",
  "IC",
  "VV",
  "WR",
  "HB",
  "SU",
  "MM",
  "NE",
  "WP",
  "SE",
  "WS",
  "TR",
  "BW",
  "TD",
  "HI",
  "GY",
  "AP",
  "WW",
  "SO",
]

const SS_KEYS = [
  "AD0",
  "AD1",
  "AD2",
  "AD3",
  "AD4",
  "AD5",
  "DC0a",
  "DC0b",
  "DC1",
  "DC2",
  "DC3",
  "DC4",
  "DC5",
  "EP0a",
  "EP0b",
  "EP1",
  "EP2",
  "EP3",
  "EP4",
  "EP5",
  "CH",
  "CY",
  "CL",
  "IC",
  "WR",
  "HB",
  "GC",
  "VV",
  "CC",
  "WP",
  "SU",
  "MM",
  "NE",
  "SE",
  "WS",
  "TR",
  "BW",
  "TD",
  "HI",
  "GY",
  "AP",
  "WW",
  "SO",
]

const GD_KEYS = [
  "BC1",
  "BC2",
  "EH1",
  "EH2",
  "CA1",
  "CA2",
  "TI",
  "SW",
  "SC1",
  "SC2",
  "WS1",
  "WS2",
  "CH1",
  "CH2",
  "VF",
  "BH",
  "FG1",
  "FG2",
  "DC1",
  "DC2",
  "AC",
  "DK",
  "BC",
  "VM",
  "WGT",
  "ICP",
  "RM",
  "CS",
  "BF",
  "FH",
  "FL",
  "SP",
  "MHK",
  "MOS",
  "DoM",
  "FV",
  "LM",
  "MF",
  "IR",
  "UG",
  "SG",
  "CT",
  "BDV",
  "TC",
  "RPB",
  "TDC",
  "CA",
  "SR",
  "ERE",
  "GD",
  "BS",
  "SH",
  "OP",
  "BV",
  "ER",
  "LS",
  "NC",
  "BGF",
]

const PD_KEYS = [
  "AD1",
  "AD2",
  "AD3",
  "AD4",
  "AD5",
  "DC1",
  "DC2",
  "DC3",
  "DC4",
  "DC5",
  "EP1",
  "EP2",
  "EP3",
  "EP4",
  "EP5",
  "CH",
  "VFW",
  "VNC",
  "WOO",
  "WRK",
  "SKW",
  "SSH",
  "RN",
  "OC",
  "LT",
  "NK",
  "SH",
  "ZA",
  "GHB",
  "SCC",
  "GO",
  "TU",
  "LW",
  "SI",
  "DG",
  "CG",
]

export function buildDefaultPtsData(this: void): PointsData {
  return {
    Tot: 0,
    GenTot: 0,
    ZQTot: 0,
    numSSTot: 0,
    SSTot: 0,
    GDTot: 0,
    PDTot: 0,
    Level: 0,
    MainQ: 0,
    FolDis: 0,
    tutorial: 0,
    PvPRank: 0,
    MaelAr: 0,
    EndlArch: 0,
    Unassigned: undefined,
    ZQ: zeroMap(ZQ_KEYS),
    SS: zeroMap(SS_KEYS),
    GD: zeroMap(GD_KEYS),
    PD: zeroMap(PD_KEYS),
  }
}

export function buildDefaultSavedVariables(this: void): SavedVariablesData {
  return { charInfo: [], settings: {}, ptsData: {} }
}

interface RuntimeState {
  settings: Settings
  ptsData: PointsData
  sVar: SavedVariablesData | undefined
  GUI: GuiTables | undefined
  charData: CharData[]
  charNames: string[]
  ptsTots: PointTotals | undefined
  selectedChar: string
  currentCharName: string | undefined
  active: boolean
  options: Options | undefined
}

export const STATE: RuntimeState = {
  settings: buildDefaultSettings(),
  ptsData: buildDefaultPtsData(),
  sVar: undefined,
  GUI: undefined,
  charData: [],
  charNames: [],
  ptsTots: undefined,
  selectedChar: GetCurrentCharacterId(),
  currentCharName: undefined,
  active: false,
  options: undefined,
}

export function requireSVar(this: void): SavedVariablesData {
  const sVar = STATE.sVar
  if (sVar === undefined) {
    throw new Error("SkillPointFinder saved variables accessed before init")
  }
  return sVar
}

export function requirePtsTots(this: void): PointTotals {
  const ptsTots = STATE.ptsTots
  if (ptsTots === undefined) {
    throw new Error("SkillPointFinder totals accessed before init")
  }
  return ptsTots
}

export function requireGui(this: void): GuiTables {
  const gui = STATE.GUI
  if (gui === undefined) {
    throw new Error("SkillPointFinder GUI table accessed before build")
  }
  return gui
}

export function requireOptions(this: void): Options {
  const options = STATE.options
  if (options === undefined) {
    throw new Error("SkillPointFinder options accessed before menu load")
  }
  return options
}
