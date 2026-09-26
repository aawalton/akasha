import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

CRUTCH.ToggleGeneralAlerts = function (this: void) {
  CRUTCH.savedOptions.general.showGeneralAlerts = !CRUTCH.savedOptions.general.showGeneralAlerts
  CRUTCH.msg(
    "General alerts (begin, gained, others) are now turned " +
      (CRUTCH.savedOptions.general.showGeneralAlerts ? "|c00FF00ON" : "|cFF0000OFF")
  )
}

function printUsage(this: void): undefined {
  if (ZO_IsConsoleOrGameCoreUI()) {
    CRUTCH.msg(`Usage:
|cAAAAAA/crutch printskills
|cAAAAAA/crutch printeffects
|cAAAAAA/crutch circle [radius]
|cAAAAAA/crutch toggle general
|cAAAAAA/crutch xoryn - temporarily toggle Tempest icons`)
  } else {
    CRUTCH.msg(`Usage:
|cAAAAAA/crutch printskills
|cAAAAAA/crutch printeffects
|cAAAAAA/crutch circle [radius]
|cAAAAAA/crutch lock
|cAAAAAA/crutch unlock
|cAAAAAA/crutch settings
|cAAAAAA/crutch toggle general
|cAAAAAA/crutch xoryn - temporarily toggle Tempest icons`)
  }

  if (CRUTCH.savedOptions.experimental === true) {
    CRUTCH.msg(`EXPERIMENTAL / HIDDEN:
|cAAAAAA/crutch jet
|cAAAAAA/crutch meme
|cAAAAAA/crutch dump
|cAAAAAA/crutch dumpbhb
|cAAAAAA/crutch healthdebug`)
  }
}

function slottedIds(this: void, text: string, hotbarCategory: number): string {
  let result = text
  for (let i = 3; i <= 8; i++) {
    const abilityId = CRUTCH.GetSlotTrueBoundId(i, hotbarCategory)
    result = string.format("%s ||  %d - %s ", result, abilityId, GetAbilityName(abilityId) ?? "")
  }
  return result
}

function toggleMeme(
  this: void,
  key: "scoreJets" | "alertNames" | "graves",
  label: string
): boolean {
  const prev = CRUTCH.savedOptions.memes[key] ?? false
  CRUTCH.savedOptions.memes[key] = !prev
  CRUTCH.msg(label + " now " + (CRUTCH.savedOptions.memes[key] === true ? "ON" : "OFF"))
  return !prev
}

SLASH_COMMANDS["/crutch"] = function (this: void, argString: string) {
  const args: string[] = []
  for (const [word] of string.gmatch(argString, "%S+")) {
    if (word !== undefined) args.push(word)
  }

  const first = args[0]
  if (first === undefined) {
    printUsage()
    return
  }
  const cmd = string.lower(first)
  const second = args[1]

  if (cmd === "printskills") {
    let text = "Slotted ability IDs:\n"
    text = slottedIds(text, HOTBAR_CATEGORY_PRIMARY)
    text = text + "\n--------\n"
    text = slottedIds(text, HOTBAR_CATEGORY_BACKUP)
    if (IsPlayerInWerewolfForm()) {
      text = text + "\n--------\n"
      text = slottedIds(text, HOTBAR_CATEGORY_WEREWOLF)
    }
    CRUTCH.msg(text)
  } else if (cmd === "printeffects" || cmd === "printbuffs") {
    let text = ""
    for (let i = 1; i <= GetNumBuffs("player"); i++) {
      const [, , , , , , , , , , abilityId] = GetUnitBuffInfo("player", i)
      text = string.format("%s\n%d - %s", text, abilityId, GetAbilityName(abilityId) ?? "")
    }
    CRUTCH.msg("Current effects:" + text)
  } else if (cmd === "printsets") {
    const redirect = SLASH_COMMANDS["/cae"]
    if (CrutchAlertsExtensions !== undefined && redirect !== undefined) {
      redirect("printsets")
    } else {
      CRUTCH.msg("You need CrutchAlerts Extensions to use this command.")
    }
  } else if (cmd === "lock" && !ZO_IsConsoleOrGameCoreUI()) {
    CRUTCH.UnlockUI(false)
  } else if (cmd === "unlock" && !ZO_IsConsoleOrGameCoreUI()) {
    CRUTCH.UnlockUI(true)
  } else if (cmd === "settings" && !ZO_IsConsoleOrGameCoreUI()) {
    TemperAddonMenu.OpenToPanel(TemperCombatAlertsOptions)
  } else if (cmd === "xoryn") {
    CRUTCH.ToggleTempestIcons()
  } else if (cmd === "toggle") {
    if (args.length !== 2) {
      printUsage()
      return
    }

    if (second === "general") {
      CRUTCH.ToggleGeneralAlerts()
    } else {
      printUsage()
    }
    return
  } else if (cmd === "jet") {
    CRUTCH.savedOptions.cc.jet = !CRUTCH.savedOptions.cc.jet
    CRUTCH.msg("Jets now " + (CRUTCH.savedOptions.cc.jet ? "ON" : "OFF"))
  } else if (cmd === "healthdebug") {
    CRUTCH.ToggleHealthDebug()
  } else if (cmd === "dump") {
    CRUTCH.Drawing.DumpUnitIcons()
  } else if (cmd === "dumpbhb") {
    CRUTCH.BossHealthBar.DumpMechanicControls()
  } else if (cmd === "circle") {
    if (args.length !== 2 || second === undefined) {
      CRUTCH.msg("Clearing circle and poops")
      CRUTCH.Drawing.ClearPoop()
      return
    }

    const radius = tonumber(second)
    if (radius !== undefined) {
      CRUTCH.msg("Drawing circle with radius " + second + ". Turn it off with /crutch circle")
      CRUTCH.Drawing.TestPoop(radius)
      return
    }

    CRUTCH.msg(second + " is not a number!")
    return
  } else if (cmd === "meme") {
    if (args.length !== 2) {
      CRUTCH.msg(`Usage:
|cAAAAAA/crutch meme scorejets`)
      return
    }

    if (second === "scorejets") {
      toggleMeme("scoreJets", "Score Jets")
    } else if (second === "alertnames") {
      toggleMeme("alertNames", "Alert Names")
    } else if (second === "graves") {
      const graves = toggleMeme("graves", "Graves")
      if (graves) {
        if (IsConsoleUI()) {
          CRUTCH.msg(
            "Warning: console does not support depth buffers, so graves will display in front of objects!"
          )
        } else {
          CRUTCH.msg(
            'Note: For the best experience, have "SubSampling Quality" set to "High" in your Video settings, otherwise they will display in front of objects!'
          )
        }
      }
      CRUTCH.Drawing.Model.InitializeGrave()
    } else {
      CRUTCH.msg("These are not the memes you're looking for.")
    }
    return
  } else {
    printUsage()
  }
}
