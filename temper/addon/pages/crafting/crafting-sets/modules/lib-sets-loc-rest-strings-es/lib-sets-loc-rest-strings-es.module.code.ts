import { LANG_ES } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-loc-language-codes/lib-sets-loc-language-codes.module.code.ts"
import {
  setTypeArenaName,
  undauntedStr,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-loc-rest-game-strings/lib-sets-loc-rest-game-strings.module.code.ts"

export const ES = {
  de: "Alemán",
  en: "Inglés",
  fr: "Francés",
  jp: "Japonés",
  ru: "Ruso",
  pl: "Polaco",
  es: "Español",
  zh: "Chino",
  dlc: "Capítulo/DLC",
  dropZones: "Zonas de caída",
  dropZoneArena: setTypeArenaName[LANG_ES],
  dropZoneImperialSewers: "Alcantarillas de la Ciudad Imperial",
  droppedBy: "Dejado por",
  setType: "Tipo de conjunto",
  dropMechanic: "Mecanica de caída",
  undauntedChest: undauntedStr + " cofre",
  modifyTooltip: "Mejorar información sobre herramientas por información de conjunto",
}
