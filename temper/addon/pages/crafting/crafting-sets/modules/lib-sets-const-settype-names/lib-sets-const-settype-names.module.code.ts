import {
  LIBSETS_SETTYPE_ARENA,
  LIBSETS_SETTYPE_BATTLEGROUND,
  LIBSETS_SETTYPE_CLASS,
  LIBSETS_SETTYPE_CRAFTED,
  LIBSETS_SETTYPE_CYRODIIL,
  LIBSETS_SETTYPE_CYRODIIL_MONSTER,
  LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD,
  LIBSETS_SETTYPE_DUNGEON,
  LIBSETS_SETTYPE_IMPERIALCITY,
  LIBSETS_SETTYPE_IMPERIALCITY_MONSTER,
  LIBSETS_SETTYPE_MONSTER,
  LIBSETS_SETTYPE_MYTHIC,
  LIBSETS_SETTYPE_OVERLAND,
  LIBSETS_SETTYPE_SPECIAL,
  LIBSETS_SETTYPE_TRIAL,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-const-settype-ids/lib-sets-const-settype-ids.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export const LANG_DE = "de"

export const LANG_EN = "en"

export const LANG_ES = "es"

export const LANG_FR = "fr"

export const LANG_RU = "ru"

export const LANG_ZH = "zh"

export const LANG_JP = "jp"

export const LANG_PL = "pl"

export const zocstrfor = ZO_CachedStrFormat

export const SET_TYPES_TO_NAME: { [setType: number]: { [lang: string]: string } } = {
  [LIBSETS_SETTYPE_ARENA]: {
    [LANG_DE]: "Arena",
    [LANG_EN]: "Arena",
    [LANG_ES]: "Arena",
    [LANG_FR]: "Arène",
    [LANG_PL]: "Arena",
    [LANG_JP]: "アリーナ",
    [LANG_RU]: "Aрена",
    [LANG_ZH]: "竞技场",
  },
  [LIBSETS_SETTYPE_BATTLEGROUND]: {
    [LANG_DE]: "Schlachtfeld",
    [LANG_EN]: "Battleground",
    [LANG_ES]: "Campo de batalla",
    [LANG_FR]: "Champ de bataille",
    [LANG_PL]: "Pole Bitwy",
    [LANG_JP]: "バトルグラウンド",
    [LANG_RU]: "Поле боя",
    [LANG_ZH]: "战场",
  },
  [LIBSETS_SETTYPE_CRAFTED]: {
    [LANG_DE]: "Handwerklich hergestellt",
    [LANG_EN]: "Crafted",
    [LANG_ES]: "Hecho a mano",
    [LANG_FR]: "Artisanal",
    [LANG_PL]: "Wytworzone",
    [LANG_JP]: "クラフトセット",
    [LANG_RU]: "Созданный",
    [LANG_ZH]: "制造",
  },
  [LIBSETS_SETTYPE_CYRODIIL]: {
    [LANG_DE]: "Cyrodiil",
    [LANG_EN]: "Cyrodiil",
    [LANG_ES]: "Cyrodiil",
    [LANG_FR]: "Cyrodiil",
    [LANG_PL]: "Cyrodiil",
    [LANG_JP]: "シロディール",
    [LANG_RU]: "Сиродил",
    [LANG_ZH]: "西罗帝尔",
  },
  [LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD]: {
    [LANG_DE]: "Zufälliges Verlies & Kaiserstadt Belohnung",
    [LANG_EN]: "Random Dungeons & Imperial city " + zocstrfor("<<c:1>>", "Reward"),
    [LANG_ES]: "Mazmorras aleatorias y ciudad imperial " + zocstrfor("<<c:1>>", "Recompensa"),
    [LANG_FR]: "Donjons aléatoires & Cité impériale " + zocstrfor("<<c:1>>", "Récompense"),
    [LANG_PL]: "Losowe Lochy & Cesarskie Miasto " + zocstrfor("<<c:1>>", "Nagroda"),
    [LANG_JP]: "デイリー報酬",
    [LANG_RU]: "Случайное ежедневное подземелье и награда Имперского города",
    [LANG_ZH]: "随机地下城 & 帝都 " + zocstrfor("<<c:1>>", "奖励"),
  },
  [LIBSETS_SETTYPE_DUNGEON]: {
    [LANG_DE]: "Verlies",
    [LANG_EN]: "Dungeon",
    [LANG_ES]: "Calabozo",
    [LANG_FR]: "Donjon",
    [LANG_PL]: "Loch",
    [LANG_JP]: "ダンジョン",
    [LANG_RU]: "Подземелье",
    [LANG_ZH]: "地下城",
  },
  [LIBSETS_SETTYPE_IMPERIALCITY]: {
    [LANG_DE]: "Kaiserstadt",
    [LANG_EN]: "Imperial city",
    [LANG_ES]: "Ciudad imperial",
    [LANG_FR]: "Cité impériale",
    [LANG_PL]: "Cesarskie Miasto",
    [LANG_JP]: "帝都",
    [LANG_RU]: "Имперский город",
    [LANG_ZH]: "帝都",
  },
  [LIBSETS_SETTYPE_MONSTER]: {
    [LANG_DE]: "Monster",
    [LANG_EN]: "Monster",
    [LANG_ES]: "Monstruo",
    [LANG_FR]: "Monstre",
    [LANG_PL]: "Potwór",
    [LANG_JP]: "モンスター",
    [LANG_RU]: "Монстр",
    [LANG_ZH]: "怪物",
  },
  [LIBSETS_SETTYPE_OVERLAND]: {
    [LANG_DE]: "Überland",
    [LANG_EN]: "Overland",
    [LANG_ES]: "Zone terrestre",
    [LANG_FR]: "Zone",
    [LANG_PL]: "Otwarty świat",
    [LANG_JP]: "陸上",
    [LANG_RU]: "Поверхности",
    [LANG_ZH]: "陆上",
  },
  [LIBSETS_SETTYPE_SPECIAL]: {
    [LANG_DE]: "Besonders",
    [LANG_EN]: "Special",
    [LANG_ES]: "Especial",
    [LANG_FR]: "Spécial",
    [LANG_PL]: "Specjalne",
    [LANG_JP]: "スペシャル",
    [LANG_RU]: "Специальный",
    [LANG_ZH]: "特殊",
  },
  [LIBSETS_SETTYPE_TRIAL]: {
    [LANG_DE]: "Prüfungen",
    [LANG_EN]: "Trial",
    [LANG_ES]: "Ensayo",
    [LANG_FR]: "Épreuves",
    [LANG_PL]: "Próby",
    [LANG_JP]: "試練",
    [LANG_RU]: "Испытание",
    [LANG_ZH]: "试炼",
  },
  [LIBSETS_SETTYPE_MYTHIC]: {
    [LANG_DE]: "Mythisch",
    [LANG_EN]: "Mythic",
    [LANG_ES]: "Mítico",
    [LANG_FR]: "Mythique",
    [LANG_PL]: "Mityczny",
    [LANG_JP]: "神話上の",
    [LANG_RU]: "мифический",
    [LANG_ZH]: "神话",
  },
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: {
    [LANG_DE]: "Kaiserstadt Monster",
    [LANG_EN]: "Imperial city monster",
    [LANG_ES]: "Ciudad imperial monstruo",
    [LANG_FR]: "Monstre de la Cité impériale",
    [LANG_PL]: "Potwór z Cesarskiego Maista",
    [LANG_JP]: "帝都 モンスター",
    [LANG_RU]: "Имперский город Монстр",
    [LANG_ZH]: "帝都怪物",
  },
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: {
    [LANG_DE]: "Cyrodiil Monster",
    [LANG_EN]: "Cyrodiil monster",
    [LANG_ES]: "Cyrodiil monstruo",
    [LANG_FR]: "Monstre de Cyrodiil",
    [LANG_PL]: "Potwór z Cyrodiil",
    [LANG_JP]: "シロディール モンスター",
    [LANG_RU]: "Сиродил Монстр",
    [LANG_ZH]: "西罗帝尔怪物",
  },
  [LIBSETS_SETTYPE_CLASS]: {
    [LANG_DE]: "Klassen spezifisch",
    [LANG_EN]: "Class specific",
    [LANG_ES]: "Específico de la clase",
    [LANG_FR]: "Spécifique à la classe",
    [LANG_PL]: "Specyficzne dla klasy",
    [LANG_JP]: "クラス固有の",
    [LANG_RU]: "Зависит от класса",
    [LANG_ZH]: "职业限定",
  },
}
