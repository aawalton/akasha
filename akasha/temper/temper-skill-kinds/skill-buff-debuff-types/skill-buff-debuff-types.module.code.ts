export type BuffValueType = "integer" | "fractional-change"

export type ActivationBuffType =
  | "minor-berserk"
  | "minor-brutality"
  | "minor-sorcery"
  | "minor-protection"
  | "minor-resolve"
  | "minor-fortitude"
  | "minor-force"
  | "minor-slayer"
  | "major-berserk"
  | "major-brutality"
  | "major-sorcery"
  | "major-force"
  | "major-protection"
  | "major-resolve"
  | "major-fortitude"
  | "flat-resistance"
  | "flat-damage-reduction"
  | "light-attack-damage"
  | "heavy-attack-damage"
  | "next-attack-damage"
  | "health-recovery"
  | "magicka-recovery"
  | "stamina-recovery"
  | "healing-received"

export type ActivationDebuffType =
  | "minor-vulnerability"
  | "minor-maim"
  | "minor-breach"
  | "minor-fracture"
  | "minor-defile"
  | "minor-magickasteal"
  | "major-vulnerability"
  | "major-maim"
  | "major-breach"
  | "major-defile"
  | "damage-taken-increase"

export interface ActivationBuffEffect {
  buff: ActivationBuffType
  duration: number
  value?: number
  valueType?: BuffValueType
}

export interface ActivationDebuffEffect {
  debuff: ActivationDebuffType
  duration: number
  value?: number
  valueType?: BuffValueType
}
