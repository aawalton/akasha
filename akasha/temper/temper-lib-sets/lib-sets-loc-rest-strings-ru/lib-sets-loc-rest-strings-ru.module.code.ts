import {
  setTypeArenaName,
  undauntedStr,
} from "../lib-sets-loc-rest-game-strings/lib-sets-loc-rest-game-strings.module.code.ts"
import { LANG_RU } from "../lib-sets-loc-rest-language-codes/lib-sets-loc-rest-language-codes.module.code.ts"

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
