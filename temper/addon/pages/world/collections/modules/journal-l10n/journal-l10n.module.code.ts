import { TEMPER_HELPERS } from "akasha/temper/addon/shared/temper-helpers/modules/helpers/helpers.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const DEFAULTS: ReadonlyArray<[string, string]> = [
  ["SI_EXTENDED_JOURNAL_NAME", "Extended Journal"],
  ["SI_EXTENDED_JOURNAL_SEARCH", "Search Filter:"],
  ["SI_EXTENDED_JOURNAL_SERVER", "Server:"],
  ["SI_EXTENDED_JOURNAL_ACCOUNT", "Account:"],
  ["SI_EXTENDED_JOURNAL_CHARACTER", "Character:"],
  ["SI_EXTENDED_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lChange|l|r)"],
]

const DE: ReadonlyArray<[string, string]> = [
  ["SI_EXTENDED_JOURNAL_NAME", "Ausführliches Tagebuch"],
  ["SI_EXTENDED_JOURNAL_SEARCH", "Suchfilter:"],
  ["SI_EXTENDED_JOURNAL_SERVER", "Server:"],
  ["SI_EXTENDED_JOURNAL_ACCOUNT", "Konto:"],
  ["SI_EXTENDED_JOURNAL_CHARACTER", "Charakter:"],
  ["SI_EXTENDED_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lÄndern|l|r)"],
]

const ES: ReadonlyArray<[string, string]> = [
  ["SI_EXTENDED_JOURNAL_NAME", "Diario extendido"],
  ["SI_EXTENDED_JOURNAL_SEARCH", "Filtro de búsqueda:"],
  ["SI_EXTENDED_JOURNAL_SERVER", "Servidor:"],
  ["SI_EXTENDED_JOURNAL_ACCOUNT", "Cuenta:"],
  ["SI_EXTENDED_JOURNAL_CHARACTER", "Personaje:"],
  ["SI_EXTENDED_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lCambiar|l|r)"],
]

const FR: ReadonlyArray<[string, string]> = [
  ["SI_EXTENDED_JOURNAL_NAME", "Journal étendu"],
  ["SI_EXTENDED_JOURNAL_SEARCH", "Filtre de recherche:"],
  ["SI_EXTENDED_JOURNAL_SERVER", "Serveur:"],
  ["SI_EXTENDED_JOURNAL_ACCOUNT", "Compte:"],
  ["SI_EXTENDED_JOURNAL_CHARACTER", "Personnage:"],
  ["SI_EXTENDED_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lChanger|l|r)"],
]

const RU: ReadonlyArray<[string, string]> = [
  ["SI_EXTENDED_JOURNAL_NAME", "Расширенный журнал"],
  ["SI_EXTENDED_JOURNAL_SEARCH", "Найти в списке:"],
  ["SI_EXTENDED_JOURNAL_SERVER", "Сервер:"],
  ["SI_EXTENDED_JOURNAL_ACCOUNT", "Учетная запись:"],
  ["SI_EXTENDED_JOURNAL_CHARACTER", "Персонаж:"],
  ["SI_EXTENDED_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|lИзменить|l|r)"],
]

const ZH: ReadonlyArray<[string, string]> = [
  ["SI_EXTENDED_JOURNAL_NAME", "扩展日志"],
  ["SI_EXTENDED_JOURNAL_SEARCH", "搜索过滤器:"],
  ["SI_EXTENDED_JOURNAL_SERVER", "服务器:"],
  ["SI_EXTENDED_JOURNAL_ACCOUNT", "账户:"],
  ["SI_EXTENDED_JOURNAL_CHARACTER", "角色:"],
  ["SI_EXTENDED_JOURNAL_CHANGE", "(|c336699|l0:1:1:1:1:336699|l更改|l|r)"],
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
