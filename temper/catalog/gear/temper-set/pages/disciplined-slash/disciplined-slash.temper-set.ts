import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const disciplinedSlash = {
  id: "019e66ec-7ae8-7328-8071-27442875e88e",
  type: "page-type/temper-set",
  slug: "disciplined-slash",
  title: "Disciplined Slash",
  key: "disciplined-slash",
  esoSetId: 363,
  esoItemIds: [133404, 133405, 133406],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: [
    "WEAPONTYPE_TWO_HANDED_AXE",
    "WEAPONTYPE_TWO_HANDED_HAMMER",
    "WEAPONTYPE_TWO_HANDED_SWORD",
  ],
  category: "temper-set-category/trial",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
