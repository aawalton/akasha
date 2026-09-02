import { getClientLanguage } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { ADDON_NAME } from "../destinations-names/destinations-names.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

const SUPPORTED_MENU_LANGS = ["de", "en", "es", "fr", "fx", "jf", "jp", "pl", "ru", "zh"]

function isIn(searchValue: string, searchTable: string[]): boolean {
  if (searchValue === "") return false
  for (const v of searchTable) {
    if (searchValue === v) return true
    const [found] = string.find(string.lower(v), string.lower(searchValue))
    if (found !== undefined) return true
  }
  return false
}

const client_lang: string = getClientLanguage()
const effective_menu_lang: string = isIn(client_lang, SUPPORTED_MENU_LANGS) ? client_lang : "en"

export const supported_menu_lang: boolean = client_lang === effective_menu_lang

export function showLanguageWarning(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED)
  if (client_lang === "it") {
    CHAT_ROUTER.AddSystemMessage(
      "Destinations non è localizzato correttamente dalla lingua italiana. Verranno utilizzati termini inglesi e non tutti i punti di interesse potrebbero essere classificati correttamente."
    )
  } else {
    CHAT_ROUTER.AddSystemMessage(
      "Destinations is not properly localized for " +
        client_lang +
        ".  English terms will be used and not all POIs may be properly classified."
    )
  }
}

export function disableEnglishFunctionnalities(): undefined {
  if (client_lang === "en") {
    const sv = getSavedVariables()
    sv.settings.AddEnglishOnUnknwon = false
    sv.settings.AddEnglishOnKeeps = false
  }
}
