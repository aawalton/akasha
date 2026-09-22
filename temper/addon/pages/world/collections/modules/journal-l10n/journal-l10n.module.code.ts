import { TEMPER_HELPERS } from "akasha/temper/addon/shared/temper-helpers/modules/helpers/helpers.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const DEFAULTS: ReadonlyArray<[string, string]> = [
  ["SI_TEMPER_JOURNAL_NAME", "Extended Journal"],
  ["SI_TEMPER_JOURNAL_SEARCH", "Search Filter:"],
  ["SI_TEMPER_JOURNAL_SERVER", "Server:"],
  ["SI_TEMPER_JOURNAL_ACCOUNT", "Account:"],
  ["SI_TEMPER_JOURNAL_CHARACTER", "Character:"],
  ["SI_TEMPER_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lChange|l|r)"],
]

const DE: ReadonlyArray<[string, string]> = [
  ["SI_TEMPER_JOURNAL_NAME", "Ausführliches Tagebuch"],
  ["SI_TEMPER_JOURNAL_SEARCH", "Suchfilter:"],
  ["SI_TEMPER_JOURNAL_SERVER", "Server:"],
  ["SI_TEMPER_JOURNAL_ACCOUNT", "Konto:"],
  ["SI_TEMPER_JOURNAL_CHARACTER", "Charakter:"],
  ["SI_TEMPER_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lÄndern|l|r)"],
]

const ES: ReadonlyArray<[string, string]> = [
  ["SI_TEMPER_JOURNAL_NAME", "Diario extendido"],
  ["SI_TEMPER_JOURNAL_SEARCH", "Filtro de búsqueda:"],
  ["SI_TEMPER_JOURNAL_SERVER", "Servidor:"],
  ["SI_TEMPER_JOURNAL_ACCOUNT", "Cuenta:"],
  ["SI_TEMPER_JOURNAL_CHARACTER", "Personaje:"],
  ["SI_TEMPER_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lCambiar|l|r)"],
]

const FR: ReadonlyArray<[string, string]> = [
  ["SI_TEMPER_JOURNAL_NAME", "Journal étendu"],
  ["SI_TEMPER_JOURNAL_SEARCH", "Filtre de recherche:"],
  ["SI_TEMPER_JOURNAL_SERVER", "Serveur:"],
  ["SI_TEMPER_JOURNAL_ACCOUNT", "Compte:"],
  ["SI_TEMPER_JOURNAL_CHARACTER", "Personnage:"],
  ["SI_TEMPER_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lChanger|l|r)"],
]

const RU: ReadonlyArray<[string, string]> = [
  ["SI_TEMPER_JOURNAL_NAME", "Расширенный журнал"],
  ["SI_TEMPER_JOURNAL_SEARCH", "Найти в списке:"],
  ["SI_TEMPER_JOURNAL_SERVER", "Сервер:"],
  ["SI_TEMPER_JOURNAL_ACCOUNT", "Учетная запись:"],
  ["SI_TEMPER_JOURNAL_CHARACTER", "Персонаж:"],
  ["SI_TEMPER_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lИзменить|l|r)"],
]

const ZH: ReadonlyArray<[string, string]> = [
  ["SI_TEMPER_JOURNAL_NAME", "扩展日志"],
  ["SI_TEMPER_JOURNAL_SEARCH", "搜索过滤器:"],
  ["SI_TEMPER_JOURNAL_SERVER", "服务器:"],
  ["SI_TEMPER_JOURNAL_ACCOUNT", "账户:"],
  ["SI_TEMPER_JOURNAL_CHARACTER", "角色:"],
  ["SI_TEMPER_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|l更改|l|r)"],
]

const BY_LANG: Record<string, ReadonlyArray<[string, string]>> = {
  de: DE,
  es: ES,
  fr: FR,
  ru: RU,
  zh: ZH,
}

for (const [id, text] of DEFAULTS) {
  TEMPER_HELPERS.RegisterString(id, text)
}
const lang = GetCVar("Language.2")
const overrides = BY_LANG[lang]
if (overrides !== undefined) {
  for (const [id, text] of overrides) {
    TEMPER_HELPERS.RegisterString(id, text)
  }
}
