import { LANG_JP } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-loc-language-codes/lib-sets-loc-language-codes.module.code.ts"
import {
  setTypeArenaName,
  undauntedStr,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-loc-rest-game-strings/lib-sets-loc-rest-game-strings.module.code.ts"

export const JP = {
  de: "ドイツ語",
  en: "英語",
  fr: "フランス語",
  jp: "日本語",
  ru: "ロシア",
  pl: "ポーランド語",
  es: "スペイン語",
  zh: "中国語",
  dlc: "チャプター/ DLC",
  dropZones: "ドロップゾーン",
  dropZoneArena: setTypeArenaName[LANG_JP],
  dropZoneImperialSewers: "インペリアルシティ下水道",
  droppedBy: "によってドロップ",
  setType: "セットの種類",
  dropMechanic: "ドロップメカニック",
  undauntedChest: undauntedStr + " 胸",
  modifyTooltip: "アイテムセット情報によるツールチップの強化",
  slashCommandDescription: "セット名の翻訳を検索",
  slashCommandDescriptionClient: "セット名の検索 (ゲーム言語)",
}
