import { PROFILE_PATTERN } from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import {
  showDialogue,
  showNotice,
} from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  AKAMATSU_EMOTE_PATTERN,
  AKAMATSU_PATTERN,
  ELMS_PATTERN,
  parseAkamatsuString,
  parseElmsString,
} from "akasha/temper/addon/pages/world/markers/modules/markers-import/markers-import.module.code.ts"
import {
  emptyCurrentZone,
  importIcons,
} from "akasha/temper/addon/pages/world/markers/modules/markers-profiles/markers-profiles.module.code.ts"
import { refreshExport } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/type/lib-emote/lib-emote.type-declaration.d.ts"

const DESTRUCTIVE = "Warning: Destructive Action"
const CANNOT_UNDO = "This is a destructive action and cannot be undone."
const EMOTES_FOUND = "Custom Emotes Detected"
const EMOTES_QUESTION =
  "The detected Akamatsu's Marker profile contains LibEmote custom icons in it. Would you like to convert these custom icons to chevrons?"
const EMOTES_WARNING =
  "If you choose not to convert to chevrons, only people who have LibEmote installed will be able to see the markers which contain the custom icon."
const EMOTES_CONVERTED =
  "Markers which used LibEmote icons were automatically converted to chevrons. To keep them as LibEmote icons, install LibEmote and reimport!"

function found(this: void, text: string, pattern: string): boolean {
  return string.find(text, pattern)[0] !== undefined
}

function loadedNotice(this: void, amount: number | undefined, warning: string): undefined {
  showNotice(
    "Notice",
    `Loaded a total of ${tostring(amount)} markers from Akamatsu's Marker!`,
    warning
  )
  return undefined
}

function importAkamatsu(this: void, importString: string, overwrite: boolean): undefined {
  const parse = (useLibEmote: boolean, warning: string): undefined => {
    if (overwrite) emptyCurrentZone()
    const [amount] = parseAkamatsuString(importString, useLibEmote)
    refreshExport()
    loadedNotice(amount, warning)
    return undefined
  }
  if (!found(importString, AKAMATSU_EMOTE_PATTERN)) {
    parse(false, "")
  } else if (LibEmote !== undefined) {
    showDialogue(
      EMOTES_FOUND,
      EMOTES_QUESTION,
      EMOTES_WARNING,
      () => parse(false, ""),
      () => parse(true, "")
    )
  } else {
    parse(false, EMOTES_CONVERTED)
  }
  return undefined
}

function importForeign(this: void, importString: string, overwrite: boolean): undefined {
  if (found(importString, ELMS_PATTERN)) {
    if (!overwrite) {
      const [amount] = parseElmsString(importString)
      showNotice("Notice", `Loaded a total of ${tostring(amount)} markers from Elms!`, "")
      refreshExport()
      return undefined
    }
    showDialogue(
      DESTRUCTIVE,
      "Are you sure you would like to overwrite the current profile?",
      CANNOT_UNDO,
      () => {
        emptyCurrentZone()
        parseElmsString(importString)
        refreshExport()
      }
    )
    return undefined
  }
  if (found(importString, AKAMATSU_PATTERN)) {
    importAkamatsu(importString, overwrite)
    return undefined
  }
  showNotice(
    "Notice",
    "Failed to find either a More Markers, Elms Markers, or Akamatsu's Marker string",
    ""
  )
  return undefined
}

export function appendImport(this: void, importString: string): undefined {
  if (!found(importString, PROFILE_PATTERN)) {
    importForeign(importString, false)
    return undefined
  }
  importIcons(importString, false)
  refreshExport()
  return undefined
}

export function overwriteImport(this: void, importString: string): undefined {
  if (!found(importString, PROFILE_PATTERN)) {
    importForeign(importString, true)
    return undefined
  }
  showDialogue(
    DESTRUCTIVE,
    "Are you sure you would like to overwrite the current profile?",
    CANNOT_UNDO,
    () => {
      importIcons(importString, true)
      refreshExport()
    }
  )
  return undefined
}
