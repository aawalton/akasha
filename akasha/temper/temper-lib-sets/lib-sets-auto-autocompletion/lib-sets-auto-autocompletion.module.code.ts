import {
  asLabelRecord,
  asLibSlashCommanderLibHandle,
  asSetNamesByLangRecord,
} from "../lib-sets-auto-casts/lib-sets-auto-casts.module.code.ts"
import {
  asString,
  asStringArray,
  asStrRecord,
  asStrRecordOpt,
  asTyped,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"

const lib = LibSets

const isConsole = lib.IsConsole

const libPrefix = lib.prefix

const clientLang = lib.clientLang
const localization = lib.localization
const SUPPORTED_LANGUAGES = lib.supportedLanguages
const SUPPORTED_LANGUAGES_INDEX = lib.supportedLanguagesIndex

let cachedSetNames: { [setId: number]: { [lang: string]: unknown } } | undefined
let setPreviewTooltipSV: { [key: string]: unknown } | undefined

const getLibSetsSetPreviewTooltipSavedVariables = lib.getLibSetsSetPreviewTooltipSavedVariables

function getLibSlashCommander(this: void): LibSlashCommanderLib | undefined {
  const handle = lib.libSlashCommander
  if (handle === undefined || handle === false) {
    return undefined
  }
  return asLibSlashCommanderLibHandle(handle)
}

function localizedStr(this: void, value: unknown): string {
  return typeof value === "string" ? value : ""
}

function buildAutoComplete(
  this: void,
  command: LibSlashCommanderCommand | undefined,
  langToUse: string
): undefined {
  const lscLib = getLibSlashCommander()
  if (lscLib === undefined) {
    return
  }
  if (setPreviewTooltipSV === undefined) {
    return
  }
  if (command === undefined || SUPPORTED_LANGUAGES[langToUse] !== true) {
    return
  }

  const getAllSetNames = lib.GetAllSetNames
  if (cachedSetNames === undefined) {
    cachedSetNames = asSetNamesByLangRecord(getAllSetNames())
  }

  if (cachedSetNames === undefined) {
    return
  }
  const cached = cachedSetNames

  const myAutoCompleteProvider = lscLib.AutoCompleteProvider.Subclass()
  const providerSlots = asTyped<{ [slot: string]: unknown }>(myAutoCompleteProvider)
  type ProviderNew = (
    this: LibSlashCommanderAutoCompleteProvider,
    resultList: { [label: string]: string },
    lookupList: { [label: string]: string }
  ) => LibSlashCommanderAutoCompleteProvider
  const providerNew: ProviderNew = function (
    this: LibSlashCommanderAutoCompleteProvider,
    resultList: { [label: string]: string },
    lookupList: { [label: string]: string }
  ): LibSlashCommanderAutoCompleteProvider {
    const obj = lscLib.AutoCompleteProvider.New(this)
    obj["resultList"] = resultList
    obj["lookupList"] = lookupList
    obj["lang"] = langToUse
    return obj
  }
  providerSlots["New"] = providerNew
  providerSlots["GetResultList"] = function (this: LibSlashCommanderAutoCompleteProvider): unknown {
    return this["resultList"]
  }
  providerSlots["GetResultFromLabel"] = function (
    this: LibSlashCommanderAutoCompleteProvider,
    label: string
  ): unknown {
    return asLabelRecord(this["lookupList"])[label] ?? label
  }

  command.SetCallback(function (this: void, input: string): undefined {
    const createPreviewTooltipAndShow = lib.CreatePreviewTooltipAndShow
    const setId = tonumber(input)
    if (setId !== undefined && type(setId) === "number") {
      if (createPreviewTooltipAndShow !== undefined) {
        const itemLink = createPreviewTooltipAndShow(setId)
        if (itemLink !== undefined && asStrRecord(setPreviewTooltipSV)["sendToChatToo"] === true) {
          lib.SafeStartChatInput(asString(itemLink))
        }
      }
    }
  })

  const repStr = "·"
  const langUpper = localizedStr(localization[langToUse]?.[langToUse])

  for (const [setId, setLanguagesData] of pairs(cached)) {
    const setNameInSlashCommandLang = setLanguagesData[langToUse]
    if (setNameInSlashCommandLang !== undefined) {
      const rawName = asString(setNameInSlashCommandLang)
      let setNameNoSpaces = string.gsub(rawName, "%s+", repStr)[0]
      if (setNameNoSpaces.length === 0) {
        setNameNoSpaces = rawName
      }

      command.AddAlias(tostring(setId) + setNameNoSpaces)

      if (!command.HasSubCommandAlias(setNameNoSpaces)) {
        const setSubCommand = command.RegisterSubCommand()
        setSubCommand.AddAlias(setNameNoSpaces)
        setSubCommand.SetDescription(langUpper + " (ID: " + tostring(setId) + ")")

        setSubCommand.SetCallback(function (this: void, _input: string): undefined {
          const createPreviewTooltipAndShow = lib.CreatePreviewTooltipAndShow
          if (createPreviewTooltipAndShow === undefined) {
            return
          }
          const itemLink = createPreviewTooltipAndShow(setId)
          if (
            itemLink !== undefined &&
            asStrRecord(setPreviewTooltipSV)["sendToChatToo"] === true
          ) {
            if (!isConsole && !IsInGamepadPreferredMode()) {
              lib.SafeStartChatInput(asString(itemLink))
            } else {
              lib.SafeStartChatInput(asString(itemLink))
            }
          }
        })

        const otherLanguagesSetName: { [langIdx: number]: string } = {}
        const otherLanguagesNoDuplicateSetName: { [setName: string]: string } = {}
        const alreadyAddedCleanTranslatedSetNames: { [lowerName: string]: string } = {}
        const alreadyAddedCleanTranslatedSetNamesLookup: { [label: string]: string } = {}

        for (const [langIdx, lang] of ipairs(SUPPORTED_LANGUAGES_INDEX)) {
          if (SUPPORTED_LANGUAGES[lang] === true) {
            const otherLanguageSetName = cached[setId]?.[lang]
            if (otherLanguageSetName !== undefined && asString(otherLanguageSetName) !== "") {
              otherLanguagesSetName[langIdx] = asString(otherLanguageSetName)
            }
          }
        }

        if (asUnknownArray(otherLanguagesSetName).length >= 1) {
          for (const [langIdx, cleanTranslatedSetName] of ipairs(
            asStringArray(otherLanguagesSetName)
          )) {
            const lang = SUPPORTED_LANGUAGES_INDEX[langIdx - 1]
            const upperLangStr = localizedStr(localization[langToUse]?.[lang ?? ""])
            let langStr: string
            if (otherLanguagesNoDuplicateSetName[cleanTranslatedSetName] === undefined) {
              langStr = ""
            } else {
              langStr = otherLanguagesNoDuplicateSetName[cleanTranslatedSetName] ?? ""
            }
            if (langStr.length === 0) {
              langStr = upperLangStr
            } else {
              langStr = langStr + ", " + upperLangStr
            }
            otherLanguagesNoDuplicateSetName[cleanTranslatedSetName] = langStr
          }

          for (const [cleanTranslatedSetNameLoopKey, langStrLoop] of pairs(
            otherLanguagesNoDuplicateSetName
          )) {
            const cleanTranslatedSetNameLoop = tostring(cleanTranslatedSetNameLoopKey)
            const label = cleanTranslatedSetNameLoop + "|caaaaaa - " + langStrLoop
            alreadyAddedCleanTranslatedSetNames[zo_strlower(cleanTranslatedSetNameLoop)] = label
            alreadyAddedCleanTranslatedSetNamesLookup[label] = cleanTranslatedSetNameLoop
          }
        }

        const autocomplete = providerNew.call(
          myAutoCompleteProvider,
          alreadyAddedCleanTranslatedSetNames,
          alreadyAddedCleanTranslatedSetNamesLookup
        )
        setSubCommand.SetAutoComplete(autocomplete)
      }
    }
  }
}

function buildLSCSetSearchAutoComplete(this: void): undefined {
  const lscLib = getLibSlashCommander()
  if (lscLib === undefined) {
    return
  }

  setPreviewTooltipSV = asStrRecordOpt(getLibSetsSetPreviewTooltipSavedVariables())
  if (lib.svData === undefined || setPreviewTooltipSV === undefined) {
    return
  }

  const commandsLsp: { [langKey: string]: LibSlashCommanderCommand } = {}
  lib.commandsLsp = commandsLsp
  const clientDescription =
    libPrefix + localizedStr(localization[clientLang]?.["slashCommandDescriptionClient"])
  commandsLsp["all"] = lscLib.Register(
    ["/libsetspreview", "/setpreview", "/setsp", "/lsp"],
    undefined,
    clientDescription
  )
  buildAutoComplete(commandsLsp["all"], clientLang)

  for (const [, lang] of ipairs(SUPPORTED_LANGUAGES_INDEX)) {
    if (SUPPORTED_LANGUAGES[lang] === true) {
      const langStr = tostring(lang)
      const transForLang = localization[langStr]
      if (transForLang !== undefined && transForLang["slashCommandDescription"] !== undefined) {
        commandsLsp[langStr] = lscLib.Register(
          [
            "/libsetspreview" + langStr,
            "/setpreview" + langStr,
            "/setsp" + langStr,
            "/lsp" + langStr,
          ],
          undefined,
          libPrefix + localizedStr(transForLang["slashCommandDescription"])
        )
        buildAutoComplete(commandsLsp[langStr], langStr)
      }
    }
  }
}
lib.buildLSCSetSearchAutoComplete = buildLSCSetSearchAutoComplete
