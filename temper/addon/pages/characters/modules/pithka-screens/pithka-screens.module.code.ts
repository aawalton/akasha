import {
  type AchievementRow,
  filterAchievements,
} from "akasha/temper/addon/pages/characters/modules/pithka-achievements/pithka-achievements.module.code.ts"
import {
  DEFAULT_FONT,
  SCREEN_DIMENSIONS,
  TEXTURES,
} from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import { achievementIcon } from "akasha/temper/addon/pages/characters/modules/pithka-icons/pithka-icons.module.code.ts"
import {
  achievementLabel,
  basicLabel,
  scoreLabel,
  teleportLabel,
} from "akasha/temper/addon/pages/characters/modules/pithka-labels/pithka-labels.module.code.ts"
import {
  createGrid,
  createScreen,
  type Grid,
  type Screen,
  spacer,
} from "akasha/temper/addon/pages/characters/modules/pithka-layout/pithka-layout.module.code.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"

function dungeonTeleport(this: void, row: AchievementRow): LabelControl {
  return teleportLabel({
    text: row.NAME,
    width: 165,
    vQueue: row.vQueue,
    nQueue: row.nQueue,
    portId: row.portID,
  })
}

function trialTeleport(this: void, row: AchievementRow): LabelControl {
  return teleportLabel({ text: row.NAME, width: 155, portId: row.portID })
}

function populateBaseDungeons(this: void, screen: Screen): undefined {
  const column = (x: number, type: string): undefined => {
    const grid = createGrid(x, 50)
    screen.addObject(grid)
    grid.addRow([
      basicLabel({ text: "Dungeons with I/II", width: 165 }),
      basicLabel({ text: "VET" }),
      basicLabel({ text: "HM" }),
      basicLabel({ text: "SR" }),
      basicLabel({ text: "ND" }),
    ])
    for (const row of filterAchievements({ TYPE: type })) {
      grid.addRow([
        dungeonTeleport(row),
        achievementIcon(row.VET),
        achievementIcon(row.HM),
        achievementIcon(row.SR),
        achievementIcon(row.ND),
      ])
    }
  }
  column(30, "baseDungeon-wI")
  column(350, "baseDungeon-noI")
}

function populateTriDungeons(this: void, screen: Screen): undefined {
  const grid = createGrid(30, 50)
  screen.addObject(grid)
  grid.addRow([
    basicLabel({ text: "TRIFECTA DUNGEONS", width: 165 }),
    basicLabel({ text: "VET" }),
    spacer(20),
    basicLabel({ text: "HM" }),
    basicLabel({ text: "SR" }),
    basicLabel({ text: "ND" }),
    spacer(20),
    basicLabel({ text: "CHALLENGER & TRIFECTA", width: 270 }),
    basicLabel({ text: "EXTRAS", width: 200 }),
  ])
  const rows = [
    ...filterAchievements({ TYPE: "triDungeon" }),
    ...filterAchievements({ ABBV: "BRP" }),
  ]
  for (const row of rows) {
    grid.addRow([
      dungeonTeleport(row),
      achievementIcon(row.VET),
      spacer(20),
      achievementIcon(row.HM),
      achievementIcon(row.SR),
      achievementIcon(row.ND),
      spacer(20),
      achievementIcon(row.CHA),
      achievementIcon(row.TRI),
      achievementLabel({ text: row.TRINAME, width: 220, AID: row.TRI }),
      achievementIcon(row.EXT),
      achievementLabel({ text: row.EXTNAME, width: 200, AID: row.EXT }),
    ])
  }
}

function populateTrials(this: void, screen: Screen): undefined {
  const grid = createGrid(30, 50)
  screen.addObject(grid)
  grid.addRow([
    basicLabel({ text: "TRIALS", width: 155 }),
    basicLabel({ text: "BEST SCORE", width: 75, align: TEXT_ALIGN_RIGHT }),
    spacer(20),
    basicLabel({ text: "VET", width: 46 }),
    basicLabel({ text: "PARTIAL HM", width: 105 }),
    basicLabel({ text: "PARTIAL HM", width: 105 }),
    basicLabel({ text: "HARDMODE", width: 150 }),
    basicLabel({ text: "TRIFECTA", width: 215 }),
    basicLabel({ text: "EXTRA", width: 250 }),
  ])
  for (const row of filterAchievements({ TYPE: "trial" })) {
    grid.addRow([
      trialTeleport(row),
      scoreLabel(row),
      spacer(20),
      achievementIcon(row.VET),
      spacer(20),
      achievementIcon(row.PHM1),
      achievementLabel({ text: row.PHM1NAME, width: 80, AID: row.PHM1 }),
      achievementIcon(row.PHM2),
      achievementLabel({ text: row.PHM2NAME, width: 80, AID: row.PHM2 }),
      achievementIcon(row.HM),
      achievementLabel({ text: row.HMNAME, width: 120, AID: row.HM }),
      achievementIcon(row.TRI),
      achievementLabel({ text: row.TRINAME, width: 190, font: DEFAULT_FONT, AID: row.TRI }),
      achievementIcon(row.EXT),
      achievementLabel({ text: row.EXTNAME, width: 250, font: DEFAULT_FONT, AID: row.EXT }),
    ])
  }
}

function scoredHeader(this: void, grid: Grid, title: string): undefined {
  grid.addRow([
    basicLabel({ text: title, width: 155 }),
    basicLabel({ text: "BEST SCORE", width: 75, align: TEXT_ALIGN_RIGHT }),
    spacer(20),
    basicLabel({ text: "TRIFECTA", width: 215 }),
  ])
}

function scoredRow(this: void, grid: Grid, row: AchievementRow): undefined {
  grid.addRow([
    trialTeleport(row),
    scoreLabel(row),
    spacer(20),
    achievementIcon(row.TRI),
    achievementLabel({ text: row.TRINAME, width: 190, font: DEFAULT_FONT, AID: row.TRI }),
  ])
}

function populateScoresAndTris(this: void, screen: Screen): undefined {
  const left = createGrid(30, 50)
  screen.addObject(left)
  scoredHeader(left, "TRIALS")
  for (const row of filterAchievements({ TYPE: "trial", SCORED: true })) scoredRow(left, row)
  left.addRow([spacer(20)])
  scoredHeader(left, "ARENAS")
  for (const row of filterAchievements({ TYPE: "arena" })) scoredRow(left, row)
  left.addRow([spacer(20)])
  left.addRow([basicLabel({ text: "INFINITE ARCHIVE", width: 155 })])
  for (const row of filterAchievements({ TYPE: "endless" })) {
    left.addRow([trialTeleport(row), scoreLabel(row), spacer(20), achievementIcon(row.TRI)])
  }

  const right = createGrid(500, 50)
  screen.addObject(right)
  right.addRow([
    basicLabel({ text: "TRIFECTA DUNGEONS", width: 165 }),
    basicLabel({ text: "TRIFECTAS", width: 270 }),
  ])
  for (const row of filterAchievements({ TYPE: "triDungeon" })) {
    right.addRow([
      dungeonTeleport(row),
      achievementIcon(row.TRI),
      achievementLabel({ text: row.TRINAME, width: 220, AID: row.TRI }),
    ])
  }
}

export function createScreens(this: void): Screen[] {
  const [baseWidth, baseHeight] = SCREEN_DIMENSIONS.baseDungeons
  const [triWidth, triHeight] = SCREEN_DIMENSIONS.trifectaDungeons
  const [trialWidth, trialHeight] = SCREEN_DIMENSIONS.trials
  const [allWidth, allHeight] = SCREEN_DIMENSIONS.scoresAndTris
  return [
    createScreen(TEXTURES.DUNGEON, baseWidth, baseHeight, "Starter Dungeons", populateBaseDungeons),
    createScreen(TEXTURES.INSTANCE, triWidth, triHeight, "4 Man Trifectas", populateTriDungeons),
    createScreen(TEXTURES.TRIAL, trialWidth, trialHeight, "Trials", populateTrials),
    createScreen(TEXTURES.STAR, allWidth, allHeight, "All Scores and Tris", populateScoresAndTris),
  ]
}
