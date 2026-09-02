import type { RequiredSkill } from "../writ-required-skill/writ-required-skill.module.code.ts"

export interface School {
  trade_skill_type: number
  base_mat_name: string
  green_mat_name: string
  blue_mat_name: string
  purple_mat_name: string
  gold_mat_name: string
  armor_weight_name: string
  temper_skill: RequiredSkill
  motif_required: boolean
  autocraft_not_implemented?: boolean
  H1_AXE?: number
  H1_MACE?: number
  H1_SWORD?: number
  H2_BATTLE_AXE?: number
  H2_MAUL?: number
  H2_GREATSWORD?: number
  DAGGER?: number
  CHEST?: number
  FEET?: number
  HANDS?: number
  HEAD?: number
  LEGS?: number
  SHOULDERS?: number
  WAIST?: number
  BOW?: number
  FLAME_STAFF?: number
  ICE_STAFF?: number
  LIGHTNING_STAFF?: number
  RESTO_STAFF?: number
  SHIELD?: number
  RING?: number
  NECKLACE?: number
}

export interface Trait {
  trait_num: number
  trait_index: number
  trait_name?: string | undefined
  mat_link?: string | undefined
}

export type TraitSet = Record<number, Trait | undefined>

export interface Improvement {
  index: number
  name: string
  green_mat_ct: number
  blue_mat_ct: number
  purple_mat_ct: number
  gold_mat_ct: number
}

export interface RequestItem {
  item_id: number
  example_item_id: number
  item_name: string
  school: School
  base_mat_ct: number
  trait_set: TraitSet
  research_line: number | undefined
  motif_page: number | undefined
  tr?: string | undefined
}
