import { FORMATTED_ZONE_STR, LIB_NAME } from "../zone-constants/zone-constants.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import type {
  Lib,
  ZoneLscAutoCompleteProvider,
  ZoneLscCommand,
} from "../zone-types/zone-types.module.code.ts"

export function initAutocompletion(this: void): undefined {
  lib.buildAutoComplete = function (
    this: Lib,
    command: ZoneLscCommand | undefined,
    langToUse: string
  ): undefined {
    const lsc = lib.LSC
    if (lsc === undefined) return
    if (command === undefined || !lib.checkIfLanguageIsSupported(langToUse)) return

    const langTranslations = lib.translations[langToUse]
    if (langTranslations === undefined) return

    const blacklistedZoneIds = lib.blacklistedZoneIdsForAutoCompletion
    const localizedZoneDataForLang = lib.preloadedZoneNames[langToUse]
    if (localizedZoneDataForLang === undefined) return

    const providerClass = lsc.AutoCompleteProvider.Subclass()
    providerClass.GetResultList = function (
      this: ZoneLscAutoCompleteProvider
    ): Record<string, string> {
      return this.resultList
    }
    providerClass.GetResultFromLabel = function (
      this: ZoneLscAutoCompleteProvider,
      label: string
    ): string {
      return this.lookupList[label] ?? label
    }

    const repStr = "·"
    const langUpper = langTranslations[langToUse] ?? ""
    const supportedLanguages = lib.supportedLanguages

    for (const [zoneId, zoneName] of pairs(localizedZoneDataForLang)) {
      const isZoneBlacklisted = blacklistedZoneIds[zoneId] ?? false
      if (!isZoneBlacklisted) {
        let [zoneNameNoSpaces] = string.gsub(zoneName, "%s+", repStr)
        if (zoneNameNoSpaces === "") zoneNameNoSpaces = zoneName
        if (!command.HasSubCommandAlias(zoneNameNoSpaces)) {
          const zoneSubCommand = command.RegisterSubCommand()
          zoneSubCommand.AddAlias(zoneNameNoSpaces)
          zoneSubCommand.SetDescription(langUpper)
          zoneSubCommand.SetCallback(function (this: void, input: string): undefined {
            StartChatInput(input)
          })

          const otherLanguagesZoneName: string[] = []
          for (const [langIdx, lang] of ipairs(supportedLanguages)) {
            const otherLanguageZoneName = lib.GetZoneName(zoneId, lang)
            if (otherLanguageZoneName !== "") {
              otherLanguagesZoneName[langIdx - 1] = otherLanguageZoneName
            }
          }

          const resultList: Record<string, string> = {}
          const lookupList: Record<string, string> = {}
          if (otherLanguagesZoneName.length >= 1) {
            const noDuplicate: Record<string, string> = {}
            for (const [langIdx, cleanTranslatedZoneName] of ipairs(otherLanguagesZoneName)) {
              const lang = supportedLanguages[langIdx]
              const upperLangStr = (lang === undefined ? undefined : langTranslations[lang]) ?? ""
              const existing = noDuplicate[cleanTranslatedZoneName]
              let langStr = existing ?? ""
              langStr = langStr === "" ? upperLangStr : `${langStr}, ${upperLangStr}`
              noDuplicate[cleanTranslatedZoneName] = langStr
            }
            for (const [cleanTranslatedZoneNameLoop, langStrLoop] of pairs(noDuplicate)) {
              const label = string.format(
                FORMATTED_ZONE_STR,
                cleanTranslatedZoneNameLoop,
                langStrLoop
              )
              resultList[zo_strlower(cleanTranslatedZoneNameLoop)] = label
              lookupList[label] = cleanTranslatedZoneNameLoop
            }
          }

          const autocomplete = lsc.AutoCompleteProvider.New(providerClass)
          autocomplete.resultList = resultList
          autocomplete.lookupList = lookupList
          autocomplete.lang = langToUse
          zoneSubCommand.SetAutoComplete(autocomplete)
        }
      }
    }
  }

  lib.buildLSCZoneSearchAutoComplete = function (this: Lib): undefined {
    const lsc = lib.LSC
    if (lsc === undefined) {
      SLASH_COMMANDS["/lzt"] = function (this: void): undefined {
        const missing = lib.translations[lib.currentClientLanguage]?.libSlashCommanderMissing ?? ""
        d(`['${LIB_NAME}'] ${missing}`)
      }
      return
    }

    const libName = `[${LIB_NAME}]`
    lib.commandsLzt = {}
    const clientDesc =
      lib.translations[lib.currentClientLanguage]?.slashCommandDescriptionClient ?? ""
    lib.commandsLzt.all = lsc.Register(["/lzt", "/transz"], undefined, libName + clientDesc)
    lib.buildAutoComplete(lib.commandsLzt.all, lib.currentClientLanguage)

    for (const [, lang] of pairs(lib.supportedLanguages)) {
      const langKey = tostring(lang)
      const transForLang = lib.translations[langKey]
      if (transForLang !== undefined && transForLang.slashCommandDescription !== undefined) {
        lib.commandsLzt[langKey] = lsc.Register(
          [`/lzt${langKey}`, `/transz${langKey}`],
          undefined,
          libName + transForLang.slashCommandDescription
        )
        lib.buildAutoComplete(lib.commandsLzt[langKey], langKey)
      }
    }
  }
}
