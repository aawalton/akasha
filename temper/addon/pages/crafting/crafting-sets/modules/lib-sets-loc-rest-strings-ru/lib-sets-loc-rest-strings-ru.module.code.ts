import { LANG_RU } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-loc-language-codes/lib-sets-loc-language-codes.module.code.ts"
import {
  setTypeArenaName,
  undauntedStr,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-loc-rest-game-strings/lib-sets-loc-rest-game-strings.module.code.ts"

export const RU = {
  de: "Нeмeцкий",
  en: "Aнглийcкий",
  fr: "Фpaнцузcкий",
  jp: "Япoнcкий",
  ru: "Pуccкий",
  pl: "польский",
  es: "испанский",
  zh: "Китайский",
  dlc: "Глава/DLC",
  dropZones: "Зоны сброса",
  dropZoneArena: setTypeArenaName[LANG_RU],
  dropZoneImperialSewers: "Канализация Имперского города",
  droppedBy: "Снизился на",
  setType: "Тип набора",
  dropMechanic: "Механика падения",
  undauntedChest: undauntedStr + " грудь",
  modifyTooltip: "Улучшить всплывающую подсказку с помощью информации о наборе элементов",
  slashCommandDescription: "Найти переводы названий наборов",
  slashCommandDescriptionClient: "Поиск по названию набора (язык игры)",
}
