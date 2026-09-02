import {
  namedChild,
  setLabelColor,
  type TooltipCarrier,
} from "@akasha/temper-combat-addon/combat-ui-helpers"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

interface CpPassiveControl extends Control {
  discipline?: number
  skillId?: number
  points?: number
}

export function initializeCPRowsLegacy(this: void, panel: Control): undefined {
  const allLegacyRaw: unknown = TemperCombat.CPLegacyStrings
  const allLegacy = isObjectRecord(allLegacyRaw) ? allLegacyRaw : undefined
  const legacyStringsRaw = allLegacy?.[GetCVar("language.2")] ?? allLegacy?.["en"]
  const legacyStrings = isObjectRecord(legacyStringsRaw) ? legacyStringsRaw : undefined

  for (let i = 1; i <= 9; i++) {
    const discipline = ((7 - i) % 9) + 1
    let color = GetString(SI_TEMPER_COMBAT_MAGICKA_COLOR)

    if (i > 6) {
      color = GetString(SI_TEMPER_COMBAT_STAMINA_COLOR)
    } else if (i > 3) {
      color = GetString(SI_TEMPER_COMBAT_HEALTH_COLOR)
    }

    const signcontrol = namedChild(panel, `StarSign${i}`)
    const title = namedChild<LabelControl>(signcontrol, "Title")
    const entryRaw = legacyStrings?.[discipline]
    const entry = isObjectRecord(entryRaw) ? entryRaw : undefined
    const nameRaw = entry?.name
    const name = typeof nameRaw === "string" ? nameRaw : "???"
    title.SetText(name)

    const width = title.GetTextWidth() + 4
    const height = title.GetHeight()
    title.SetDimensions(width, height)

    setLabelColor(signcontrol, color)

    for (let j = 1; j <= 4; j++) {
      const row = namedChild(signcontrol, `Row${j}`)
      const label = namedChild<LabelControl>(row, "Name")
      const passiveRaw = entry?.[j]
      const passiveName = typeof passiveRaw === "string" ? passiveRaw : "???"
      label.SetText(passiveName)

      const passive = namedChild<CpPassiveControl>(signcontrol, `Passive${j}`)
      passive.discipline = discipline
      passive.skillId = j + 4
      passive.points = 0
    }
  }
  return undefined
}

function initializeScribedSkillsPanel(this: void, panel: Control): undefined {
  const nameBase = panel.GetName()
  let anchor: Control | undefined
  for (let i = 1; i <= 10; i++) {
    const scribedSkillControl = CreateControlFromVirtual(
      nameBase,
      panel,
      "TemperCombat_ScribedSkillControl",
      i
    )

    if (i === 1 || anchor == null) {
      scribedSkillControl.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, 4)
    } else {
      scribedSkillControl.SetAnchor(TOPLEFT, anchor, BOTTOMLEFT, 0, 4)
      scribedSkillControl.SetHidden(true)
    }

    anchor = scribedSkillControl
  }
  return undefined
}

export function initializeRightInfoPanel(this: void, panel: Control): undefined {
  initializeScribedSkillsPanel(namedChild(panel, "ScribedSkills"))

  const labelcolors: Record<number, string> = {
    [CHAMPION_DISCIPLINE_TYPE_COMBAT]: GetString(SI_TEMPER_COMBAT_MAGICKA_COLOR),
    [CHAMPION_DISCIPLINE_TYPE_CONDITIONING]: GetString(SI_TEMPER_COMBAT_HEALTH_COLOR),
    [CHAMPION_DISCIPLINE_TYPE_WORLD]: GetString(SI_TEMPER_COMBAT_STAMINA_COLOR),
  }

  const starcolors: Record<number, ZoColor> = {
    [CHAMPION_DISCIPLINE_TYPE_COMBAT]: ZO_ColorDef.New(0.8, 0.8, 1),
    [CHAMPION_DISCIPLINE_TYPE_CONDITIONING]: ZO_ColorDef.New(1, 0.8, 0.8),
    [CHAMPION_DISCIPLINE_TYPE_WORLD]: ZO_ColorDef.New(0.8, 1, 0.7),
  }

  const scrollchild = namedChild(panel, "PanelScrollChild")
  scrollchild.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, 0, 0)
  let currentanchor: [number, Control, number, number, number] = [
    TOPLEFT,
    scrollchild,
    TOPLEFT,
    0,
    1,
  ]
  let currentanchor2: [number, Control, number, number, number] = [
    TOPRIGHT,
    scrollchild,
    TOPRIGHT,
    0,
    1,
  ]

  for (let disciplineId = 1; disciplineId <= 3; disciplineId++) {
    const disciplineType = GetChampionDisciplineType(disciplineId)
    const color = labelcolors[disciplineType]
    const starColor = starcolors[disciplineType]

    const panelName = `${scrollchild.GetName()}Panel${disciplineId}`
    const constellationControl =
      GetControl(panelName) ??
      CreateControlFromVirtual(panelName, scrollchild, "TemperCombat_Constellation")
    constellationControl.SetAnchor(...currentanchor)
    constellationControl.SetAnchor(...currentanchor2)
    constellationControl.SetHidden(false)

    currentanchor = [TOPLEFT, constellationControl, BOTTOMLEFT, 0, 4]
    currentanchor2 = [TOPRIGHT, constellationControl, BOTTOMRIGHT, 0, 4]

    const title = namedChild<LabelControl>(constellationControl, "Title")
    const top = title.GetTop()
    title.SetText(
      zo_strformat(SI_CHAMPION_CONSTELLATION_NAME_FORMAT, GetChampionDisciplineName(disciplineId))
    )

    const nameBase = `${constellationControl.GetName()}StarControl`
    let anchor: Control = title

    for (let i = 1; i <= 24; i++) {
      const starControl = CreateControlFromVirtual(
        nameBase,
        constellationControl,
        "TemperCombat_StarControl",
        i
      )

      if (i === 1) {
        starControl.SetAnchor(TOPLEFT, title, BOTTOMLEFT, 0, 4)
      } else if (i % 2 === 0) {
        starControl.SetAnchor(TOPLEFT, anchor, TOPRIGHT, 7, 0)
      } else {
        starControl.SetAnchor(TOPRIGHT, anchor, BOTTOMLEFT, -7, 2)
      }

      anchor = starControl
      let coords: [number, number, number, number] = [0.75, 1, 0.5, 0.75]

      if (i > 4) {
        coords = [0.25, 0.5, 0.25, 0.5]
        namedChild(starControl, "Ring").SetHidden(true)
        starControl.SetHidden(true)
      } else {
        namedChild(starControl, "Icon").SetHidden(true)
        namedChild(starControl, "Name").SetHidden(true)
        namedChild(starControl, "Value").SetHidden(true)
      }

      const starIcon = namedChild<TextureControl>(starControl, "Icon")
      starIcon.SetTextureCoords(...coords)
      if (starColor !== undefined) {
        const [r, g, b] = starColor.UnpackRGB()
        starIcon.SetColor(r, g, b)
      }
    }
    const bottom = namedChild(constellationControl, "StarControl4").GetBottom()
    constellationControl.SetHeight(bottom - top)

    if (color !== undefined) {
      setLabelColor(constellationControl, color)
    }
  }
  return undefined
}

export function initializeSkillStats(this: void, panel: Control): undefined {
  const block = namedChild(panel, "AbilityBlock1")
  const title = namedChild<LabelControl>(block, "Title")
  title.SetText(`${GetString(SI_TEMPER_COMBAT_BAR)}1`)

  const statPanel = namedChild(block, "Stats2")
  const label = namedChild<LabelControl & TooltipCarrier>(statPanel, "Label")
  const label2 = namedChild<LabelControl & TooltipCarrier>(statPanel, "Label2")

  label.tooltip = [SI_TEMPER_COMBAT_SKILLAVG_TT]
  label.SetText(string.format("%s    -", GetString(SI_TEMPER_COMBAT_AVERAGEC)))
  label2.tooltip = [SI_TEMPER_COMBAT_SKILLTOTAL_TT]
  label2.SetText(string.format("%s    -", GetString(SI_TEMPER_COMBAT_TOTALC)))

  const block2 = namedChild(panel, "AbilityBlock2")
  const title2 = namedChild<LabelControl>(block2, "Title")
  title2.SetText(`${GetString(SI_TEMPER_COMBAT_BAR)}2`)

  const statPanel2 = namedChild(block2, "Stats2")
  const label3 = namedChild<LabelControl & TooltipCarrier>(statPanel2, "Label")
  const label4 = namedChild<LabelControl & TooltipCarrier>(statPanel2, "Label2")

  label3.SetText(string.format("%s    -", GetString(SI_TEMPER_COMBAT_TOTALWA)))
  label3.tooltip = [SI_TEMPER_COMBAT_TOTALWA_TT]

  label4.SetText(string.format("%s    -", GetString(SI_TEMPER_COMBAT_TOTALSKILLS)))
  label4.tooltip = [SI_TEMPER_COMBAT_TOTALSKILLS_TT]
  return undefined
}

TemperCombat.InitializeCPRowsLegacy = initializeCPRowsLegacy
TemperCombat.InitializeRightInfoPanel = initializeRightInfoPanel
TemperCombat.InitializeSkillStats = initializeSkillStats
