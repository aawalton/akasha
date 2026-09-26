import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"

export type OptionColor = number[]

export type RoleName = "NEVER" | "TANK" | "HEAL" | "ALWAYS" | "VET" | "HM" | string

export function createDefaultOptions(this: void) {
  return {
    installationWide: false,
    display: {
      x: 0,
      y: GuiRoot.GetHeight() / 3,
    },
    damageableDisplay: {
      x: 0,
      y: GuiRoot.GetHeight() / 5,
    },
    spearsDisplay: {
      x: GuiRoot.GetWidth() / 4,
      y: -GuiRoot.GetHeight() / 8,
    },
    cursePadsDisplay: {
      x: GuiRoot.GetWidth() / 4,
      y: -GuiRoot.GetHeight() / 8,
    },
    bossHealthBarDisplay: {
      x: (-GuiRoot.GetWidth() * 3) / 8,
      y: -100,
    },
    carrionDisplay: {
      x: (GuiRoot.GetWidth() * 3) / 16,
      y: -GuiRoot.GetHeight() / 8,
    },
    infoPanelDisplay: {
      x: GuiRoot.GetWidth() / 4,
      y: (-GuiRoot.GetHeight() * 3) / 8,
    },
    debugLine: false,
    debugChatSpam: false,
    debugOther: false,
    debugLineDistance: false,
    showSubtitles: false,
    subtitlesIgnoredZones: {} as Record<number, boolean>,
    prominentV2FirstTime: true,
    general: {
      alertScale: 36,
      showBegin: true,
      beginHideSelf: false,
      showGained: true,
      showOthers: true,
      showOthersTrueShot: true,
      showProminent: true,
      hitValueBelowThreshold: 75,
      hitValueAboveThreshold: 60000,
      showDamageable: true,
      damageableSize: 30,
      consolidateDamageableInInfoPanel: false,
      hideNailguns: false,
      showRaidDiag: false,
      beginHideArcanist: false,
      showJBeam: true,
      showEngulfing: true,
      showClawFury: true,
      showInsatiableHunger: false,
      showGeneralAlerts: true,
      showSpeshul: true,
      blacklist: {} as Record<number, boolean>,
    },
    drawing: {
      useLevels: true,
      interval: 10,
      attached: {
        showSelfRole: false,
        showDps: false,
        dpsColor: [1, 0.5, 0] as OptionColor,
        showHeal: false,
        healColor: [1, 0.9, 0] as OptionColor,
        showTank: false,
        tankColor: [0, 0.6, 1] as OptionColor,
        showDead: true,
        useSupportIconsForDead: true,
        rezzingColor: [0.3, 0.7, 1] as OptionColor,
        pendingColor: [1, 1, 1] as OptionColor,
        deadColor: [1, 0, 0] as OptionColor,
        showCrown: false,
        crownColor: [0, 1, 0] as OptionColor,
        useDepthBuffers: false,
        size: 70,
        yOffset: 350,
        opacity: 0.8,
        individualIcons: {} as Record<string, IndividualIconOptions>,
      },
      placedPositioning: {
        useDepthBuffers: false,
        opacity: 0.8,
        flat: false,
      },
      placedIcon: {
        useDepthBuffers: false,
        opacity: 1,
      },
      placedOriented: {
        useDepthBuffers: true,
        opacity: 0.6,
      },
    },
    console: {
      showProminent: true,
      prominentsMigrated: false,
    },
    bossHealthBar: {
      enabled: true,
      horizontal: false,
      scale: 1,
      useFloorRounding: true,
      foreground: [179 / 256, 18 / 256, 7 / 256, 0.73] as OptionColor,
      background: [16 / 256, 0, 0, 0.66] as OptionColor,
      activeColor: [0.53, 0.53, 0.53, 0.9] as OptionColor,
      imminentColor: [1, 1, 0, 0.67] as OptionColor,
      passedColor: [0.53, 0.53, 0.53, 0.4] as OptionColor,
    },
    infoPanel: {
      size: 30,
    },
    cc: {
      jet: false,
      playSound: true,
      hardVolume: 2,
      showChat: false,
      showVisual: true,
      visualPositionX: (-GuiRoot.GetWidth() * 7) / 16,
      visualPositionY: 0,
      showObnoxious: true,
      obnoxiousPositionX: (GuiRoot.GetWidth() * 5) / 16,
      obnoxiousPositionY: 0,
      combatOnly: true,
    },
    memes: {} as { scoreJets?: boolean; alertNames?: boolean; graves?: boolean },
    asylumsanctorium: {
      dingSelfCone: true,
      dingOthersCone: false,
      showMinisHp: true,
      panel: {
        showLlothisHeader: 7,
        showLlothisBolts: 7,
        showLlothisCone: 7,
        showLlothisTeleport: 7,
        showFelmsHeader: 7,
        showFelmsTeleport: 7,
      },
    },
    cloudrest: {
      showSpears: true,
      spearsSound: true,
      deathIconColor: true,
      showFlaresSides: true,
      showFlareIcon: true,
      dropFrostProminent: true,
      showFrostAlert: true,
      showFrostIcons: false,
      showVoltaicAlert: true,
      infoPanel: {
        showPortal: true,
        showGrapes: true,
      },
    },
    dreadsailreef: {
      stackBrands: true,
      showElixirs: true,
      alertStaticStacks: true,
      staticThreshold: 7,
      alertVolatileStacks: true,
      volatileThreshold: 6,
      showArcingCleave: false,
      lureSound: true,
      infoPanel: {
        showMaelstrom: true,
        showBehemothSpawn: true,
        showSirenSpawn: true,
        showWinterStorm: true,
      },
    },
    hallsoffabrication: {
      showTripletsIcon: true,
      tripletsIconSize: 150,
      showAGIcons: true,
      agIconsSize: 150,
    },
    helracitadel: {
      showStoneFormCircle: true,
    },
    kynesaegis: {
      showSpearIcon: true,
      showPrisonIcon: true,
      showFalgravnIcons: true,
      falgravnIconsSize: 150,
    },
    lucentcitadel: {
      alertDarkness: true,
      showKnotTimer: true,
      showCavotIcon: true,
      cavotIconSize: 100,
      showOrphicIcons: true,
      orphicIconsNumbers: false,
      orphicIconSize: 150,
      showWeakeningCharge: "TANK" as RoleName,
      showTempestIcons: true,
      tempestIconsSize: 150,
      showArcaneConveyance: true,
      showArcaneConveyanceTether: true,
    },
    opulentordeal: {
      showAffinityIcons: true,
      showEssence: true,
      showFullText: true,
      showBrainless: false,
      showBombs: true,
    },
    osseincage: {
      showStricken: "TANK" as RoleName,
      showChains: true,
      showCarrion: true,
      showCarrionIndividual: false,
      showTitansHp: true,
      showTwinsIcons: false,
      useAOCHIcons: false,
      useMiddleIcons: false,
      twinsIconsSize: 100,
      showEnfeeblementIcons: "HM" as RoleName,
      printHMReflectiveScales: true,
      abilityOverlayFirstTime: true,
      enableAbilityOverlay: false,
      abilitiesToReplace: {} as Record<number, boolean>,
      portalPercentMargin: 5,
      panel: {
        showLeap: true,
        showClash: true,
        showTarget: true,
      },
    },
    rockgrove: {
      sludgeSides: true,
      showSludgeIcons: false,
      showBleeding: "HEAL" as RoleName,
      showCurseIcons: true,
      showCursePreview: false,
      cursePreviewColor: [1, 1, 1, 0.2] as OptionColor,
      curseLineDelay: 0,
      showCurseLines: false,
      curseLineColor: [1, 1, 0, 0.5] as OptionColor,
      showOthersCurseLines: false,
      othersCurseLineColor: [1, 1, 0, 0.5] as OptionColor,
      spoofAbilitiesFirstTime: true,
      portalNumber: 0,
      abilitiesToReplace: {} as Record<number, boolean>,
      portalTimeMargin: 4000,
      panel: {
        showSludge: true,
        showBlitz: true,
        showTimeToPortal: true,
        showNumInPortal: true,
        showPortalDirection: true,
        showCursedGround: true,
        showScythe: true,
      },
    },
    sanitysedge: {
      showChimeraIcons: true,
      chimeraIconsSize: 150,
      showArcticShred: true,
      showAnsuulIcon: true,
      ansuulIconSize: 150,
      showSplitHp: true,
      showPoisonedMindIcons: true,
      poisonedMindIconsSize: 150,
      infoPanel: {
        showFrostBomb: true,
        showWrathstorm: true,
        showCalamity: true,
      },
    },
    sunspire: {
      showLokkIcons: true,
      lokkIconsSize: 150,
      lokkIconsSoloHeal: false,
      telegraphStormBreath: false,
      showYolIcons: true,
      yolLeftIcons: false,
      yolIconsSize: 150,
      yolFocusedFire: true,
      panel: {
        showFocusFire: true,
        showPortalNext: true,
      },
    },
    mawoflorkhaj: {
      showPads: true,
      prominentColorSwap: true,
      showTwinsIcons: true,
    },
    maelstrom: {
      normalDamageTaken: false,
      showRounds: true,
      stage1Boss: "Equip boss setup!",
      stage2Boss: "Equip boss setup!",
      stage3Boss: "Equip boss setup!",
      stage4Boss: "Equip boss setup!",
      stage5Boss: "Equip boss setup!",
      stage6Boss: "Equip boss setup!",
      stage7Boss: "Equip boss setup!",
      stage8Boss: "",
      stage9Boss: "Equip boss setup!",
    },
    blackrose: {
      showCursed: true,
    },
    dragonstar: {
      normalDamageTaken: false,
    },
    endlessArchive: {
      markFabled: true,
      markNegate: false,
      dingUppercut: false,
      dingDangerous: true,
      potionIcon: true,
      printPuzzleSolution: true,
    },
    vateshran: {
      showMissedAdds: false,
    },
    blackGemFoundry: {
      showRuptureLine: true,
    },
    shipwrightsRegret: {
      showBombStacks: true,
    },
  }
}

export interface IndividualIconOptions {
  type?: string
  custom?: string
  size?: number
  color?: OptionColor
  text?: string
  textSize?: number
  textColor?: OptionColor
}

export type CrutchOptions = ReturnType<typeof createDefaultOptions> & {
  experimental?: boolean
  prominentsMigrated?: boolean
}

export type OptionSection = Record<string, unknown>

export function optionSection(this: void, options: CrutchOptions, section: string): OptionSection {
  const sections: OptionSection = options
  const found = sections[section]
  if (type(found) === "table") {
    return found as OptionSection
  }
  const made: OptionSection = {}
  sections[section] = made
  return made
}

export function fillAllDefaults(
  this: void,
  tab: OptionSection,
  defaults: OptionSection
): undefined {
  for (const [key, value] of Object.entries(defaults)) {
    if (type(value) === "table") {
      const existing = tab[key]
      if (existing === undefined) {
        tab[key] = ZO_DeepTableCopy(value as OptionSection)
      } else {
        fillAllDefaults(existing as OptionSection, value as OptionSection)
      }
    } else if (tab[key] === undefined) {
      tab[key] = value
    }
  }
}
