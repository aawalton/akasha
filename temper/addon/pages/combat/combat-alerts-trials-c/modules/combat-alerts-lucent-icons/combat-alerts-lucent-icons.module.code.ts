import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

let cavotEnabled = false

export function tryEnablingCavotIcon(this: void): undefined {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === 40750848 || powerMax === 10224774) {
    if (!cavotEnabled) {
      CRUTCH.EnableIcon("CavotSpawn")
      cavotEnabled = true
    }
  } else {
    if (cavotEnabled) {
      CRUTCH.DisableIcon("CavotSpawn")
      cavotEnabled = false
    }
  }
}

function enableMirrorIcons(this: void): undefined {
  if (CRUTCH.savedOptions.lucentcitadel.showOrphicIcons) {
    if (CRUTCH.savedOptions.lucentcitadel.orphicIconsNumbers) {
      if (GetCurrentZoneDungeonDifficulty() === DUNGEON_DIFFICULTY_VETERAN) {
        CRUTCH.EnableIcon("OrphicNum1")
        CRUTCH.EnableIcon("OrphicNum3")
        CRUTCH.EnableIcon("OrphicNum5")
        CRUTCH.EnableIcon("OrphicNum7")
      }
      CRUTCH.EnableIcon("OrphicNum2")
      CRUTCH.EnableIcon("OrphicNum4")
      CRUTCH.EnableIcon("OrphicNum6")
      CRUTCH.EnableIcon("OrphicNum8")
    } else {
      if (GetCurrentZoneDungeonDifficulty() === DUNGEON_DIFFICULTY_VETERAN) {
        CRUTCH.EnableIconGroup("OrphicDirectionsVet")
      }

      CRUTCH.EnableIconGroup("OrphicDirections")
    }
  }
}

function disableMirrorIcons(this: void): undefined {
  CRUTCH.DisableIcon("OrphicNum1")
  CRUTCH.DisableIcon("OrphicNum2")
  CRUTCH.DisableIcon("OrphicNum3")
  CRUTCH.DisableIcon("OrphicNum4")
  CRUTCH.DisableIcon("OrphicNum5")
  CRUTCH.DisableIcon("OrphicNum6")
  CRUTCH.DisableIcon("OrphicNum7")
  CRUTCH.DisableIcon("OrphicNum8")
  CRUTCH.DisableIconGroup("OrphicDirections")
  CRUTCH.DisableIconGroup("OrphicDirectionsVet")
}

let mirrorsEnabled = false

export function tryEnablingMirrorIcons(this: void): undefined {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === 97802032 || powerMax === 65201356 || powerMax === 21812840) {
    if (!mirrorsEnabled) {
      enableMirrorIcons()
      mirrorsEnabled = true
    }
  } else {
    if (mirrorsEnabled) {
      disableMirrorIcons()
      mirrorsEnabled = false
    }
  }
}

function enableTempestIcons(this: void): undefined {
  CRUTCH.EnableIcon("TempestH1")
  CRUTCH.EnableIcon("Tempest1")
  CRUTCH.EnableIcon("Tempest2")
  CRUTCH.EnableIcon("Tempest3")
  CRUTCH.EnableIcon("Tempest4")
  CRUTCH.EnableIcon("TempestH2")
  CRUTCH.EnableIcon("Tempest5")
  CRUTCH.EnableIcon("Tempest6")
  CRUTCH.EnableIcon("Tempest7")
  CRUTCH.EnableIcon("Tempest8")
}

function disableTempestIcons(this: void): undefined {
  CRUTCH.DisableIcon("TempestH1")
  CRUTCH.DisableIcon("Tempest1")
  CRUTCH.DisableIcon("Tempest2")
  CRUTCH.DisableIcon("Tempest3")
  CRUTCH.DisableIcon("Tempest4")
  CRUTCH.DisableIcon("TempestH2")
  CRUTCH.DisableIcon("Tempest5")
  CRUTCH.DisableIcon("Tempest6")
  CRUTCH.DisableIcon("Tempest7")
  CRUTCH.DisableIcon("Tempest8")
}

let tempestEnabled = false

export function tryEnablingTempestIcons(this: void): undefined {
  if (GetCurrentZoneDungeonDifficulty() !== DUNGEON_DIFFICULTY_VETERAN) {
    return
  }

  if (
    !tempestEnabled &&
    GetCurrentRaidScore() === 36000 &&
    GetCurrentRaidLifeScoreBonus() === 36000
  ) {
    enableTempestIcons()
    tempestEnabled = true
    return
  }

  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === 118759584 || powerMax === 69858576) {
    if (!tempestEnabled) {
      enableTempestIcons()
      tempestEnabled = true
    }
  } else {
    if (tempestEnabled) {
      disableTempestIcons()
      tempestEnabled = false
    }
  }
}

CRUTCH.ToggleTempestIcons = function (this: void) {
  if (tempestEnabled) {
    disableTempestIcons()
  } else {
    enableTempestIcons()
  }
  tempestEnabled = !tempestEnabled
}

export function enableTempestIconsIfDisabled(this: void): undefined {
  if (!tempestEnabled) {
    enableTempestIcons()
    tempestEnabled = true
  }
}

export function disableTempestIconsIfEnabled(this: void): undefined {
  if (tempestEnabled) {
    disableTempestIcons()
    tempestEnabled = false
  }
}

export function resetLucentIcons(this: void): undefined {
  disableMirrorIcons()
  disableTempestIcons()
  mirrorsEnabled = false
  tempestEnabled = false
}
