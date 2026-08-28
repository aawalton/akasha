import type { CodegenIdentityPair, CodegenIdentityRemedy } from "./codegen-type-identity-drift.ts"

export interface CodegenIdentityBlindSpot {
  readonly shape: string
  readonly reason: string
}

export const CODEGEN_IDENTITY_BLIND_SPOTS: readonly CodegenIdentityBlindSpot[] = [
  {
    shape: "a file-private inline literal — `const X = new Set([...])` with no `export`",
    reason:
      "Extractors resolve a declaration by exported symbol name, so an unexported literal has no address to register against. A copy written this way is invisible here: this check's PASS says nothing about it either way.",
  },
  {
    shape: "a set assembled at runtime — spreads, `.filter(...)`, or any computed membership",
    reason:
      "Extraction reads the literal members spelled in source; a set whose membership is computed has none to read. Deriving one set from another is the preferred fix anyway, since a derived set cannot drift from what it derives from.",
  },
]

export const MIRROR_GENERATOR_DIR = "tools/lib/temper-addon-data/generators"

const RULES_CORE = "temper/game-items-rules-core/src"
const ADDON_RULE_TYPES = "temper/game-items-addon/src/generated/rule-types.generated.ts"
const GEN = MIRROR_GENERATOR_DIR
const COMPANIONS_SNAP = "temper/game-companions-core/src/generated"
const SKILLS_SNAP = "temper/game-characters-skills/src/generated"
const CHAR_SNAP = "temper/game-characters-character/src/generated"
const SKILL_LINES_SNAP = "temper/game-characters-skill-lines/src/generated"
const WEAPONS_SNAP = "temper/game-characters-equipment/src/weapons/generated"
const COMPLETION_SNAP = "temper/player-completion/src/generated"
const COMPLETION_ADDON = "temper/player-completion-addon/src/skill-point-data.ts"

export const MIRROR_GENERATORS: ReadonlyMap<string, CodegenIdentityRemedy> = new Map([
  [ADDON_RULE_TYPES, { file: `${GEN}/rule-types.ts` }],
])

export const CODEGEN_TYPE_IDENTITY_PAIRS: readonly CodegenIdentityPair[] = [
  {
    name: "item-action",
    canonical: {
      file: `${RULES_CORE}/inventory-rule-types.ts`,
      kind: "const-tuple",
      symbol: "ITEM_ACTION_VALUES",
    },
    mirror: { file: ADDON_RULE_TYPES, kind: "union-type", symbol: "ItemAction" },
  },
  {
    name: "companion-scope",
    canonical: {
      file: `${RULES_CORE}/inventory-rule-types.ts`,
      kind: "union-type",
      symbol: "CompanionScope",
    },
    mirror: { file: ADDON_RULE_TYPES, kind: "union-type", symbol: "CompanionScope" },
  },
  {
    name: "stock-scope",
    canonical: {
      file: `${RULES_CORE}/inventory-rule-types.ts`,
      kind: "union-type",
      symbol: "StockScope",
    },
    mirror: { file: ADDON_RULE_TYPES, kind: "union-type", symbol: "StockScope" },
  },
  {
    name: "buy-source",
    canonical: {
      file: `${RULES_CORE}/buy-rule-types.ts`,
      kind: "union-type",
      symbol: "BuySource",
    },
    mirror: { file: ADDON_RULE_TYPES, kind: "union-type", symbol: "BuySource" },
  },
  {
    name: "comparison-op",
    canonical: {
      file: `${RULES_CORE}/generated/temper-comparison-op.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPARISON_OPS",
    },
    mirror: { file: ADDON_RULE_TYPES, kind: "union-type", symbol: "ComparisonOp" },
  },
  {
    name: "character-scope",
    canonical: {
      file: `${RULES_CORE}/inventory-rule-compiler-types.ts`,
      kind: "union-type",
      symbol: "CharacterScope",
    },
    mirror: { file: ADDON_RULE_TYPES, kind: "union-type", symbol: "CharacterScope" },
  },

  {
    name: "companion-role-rank",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-role.generated.ts`,
      kind: "object-keys",
      symbol: "COMPANION_ROLE_DATA",
    },
    mirror: {
      file: `${GEN}/temper-companion-role.ts`,
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "character-role-rank",
    canonical: {
      file: `${CHAR_SNAP}/temper-character-role.generated.ts`,
      kind: "object-keys",
      symbol: "ROLE_DATA",
    },
    mirror: {
      file: `${GEN}/temper-character-role.ts`,
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "target-scope-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-target-scope.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_TARGET_SCOPES",
    },
    mirror: {
      file: `${GEN}/temper-target-scope.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "target-type-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-target-type.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_TARGET_TYPES",
    },
    mirror: {
      file: `${GEN}/temper-target-type.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "status-effect-type-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-status-effect-type.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_STATUS_EFFECT_TYPES",
    },
    mirror: {
      file: `${GEN}/temper-status-effect-type.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "special-effect-type-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-special-effect-type.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_SPECIAL_EFFECT_TYPES",
    },
    mirror: {
      file: `${GEN}/temper-special-effect-type.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "comparison-op-precedence",
    canonical: {
      file: `${RULES_CORE}/generated/temper-comparison-op.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPARISON_OPS",
    },
    mirror: {
      file: `${GEN}/temper-comparison-op.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "companion-armor-slot-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-armor-slot.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPANION_ARMOR_SLOTS_BY_ID",
    },
    mirror: {
      file: `${GEN}/temper-companion-armor-slot.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "companion-jewelry-slot-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-jewelry-slot.generated.ts`,
      kind: "object-keys",
      symbol: "COMPANION_JEWELRY_SLOTS_DATA",
    },
    mirror: {
      file: `${GEN}/temper-companion-jewelry-slot.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "companion-weapon-slot-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-weapon-slot.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPANION_WEAPON_SLOTS",
    },
    mirror: {
      file: `${GEN}/temper-companion-weapon-slot.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "companion-weapon-role-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-weapon-role.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPANION_WEAPON_ROLES",
    },
    mirror: {
      file: `${GEN}/temper-companion-weapon-role.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "companion-activation-buff-rank",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-activation-buff.generated.ts`,
      kind: "object-keys",
      symbol: "COMPANION_ACTIVATION_BUFF_DATA",
    },
    mirror: {
      file: `${GEN}/temper-companion-activation-buff.ts`,
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "companion-skill-slot-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-skill-slot.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPANION_SKILL_SLOTS",
    },
    mirror: {
      file: `${GEN}/temper-companion-skill-slot.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "companion-trait-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-companion-trait.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPANION_TRAITS",
    },
    mirror: {
      file: `${GEN}/temper-companion-trait.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "skill-bars-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-skill-bars.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_SKILL_BARS",
    },
    mirror: {
      file: `${GEN}/temper-skill-bars.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "skill-slot-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-skill-slot.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_SKILL_SLOTS",
    },
    mirror: {
      file: `${GEN}/temper-skill-slot.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "skill-type-precedence",
    canonical: {
      file: `${SKILLS_SNAP}/temper-skill-type.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_SKILL_TYPES",
    },
    mirror: {
      file: `${GEN}/temper-skill-type.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "weapon-bar-precedence",
    canonical: {
      file: `${WEAPONS_SNAP}/temper-weapon-bar.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_WEAPON_BARS",
    },
    mirror: {
      file: `${GEN}/temper-weapon-bar.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "rotation-breakdown-row-precedence",
    canonical: {
      file: `${COMPANIONS_SNAP}/temper-rotation-breakdown-row.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_ROTATION_BREAKDOWN_ROWS",
    },
    mirror: {
      file: `${GEN}/temper-rotation-breakdown-row.ts`,
      kind: "object-keys",
      symbol: "PRECEDENCE",
    },
  },
  {
    name: "skill-line-category-rank",
    canonical: {
      file: `${SKILL_LINES_SNAP}/temper-skill-line-category.generated.ts`,
      kind: "object-keys",
      symbol: "SKILL_LINE_CATEGORY_DATA",
    },
    mirror: {
      file: `${GEN}/skill-line-categories.ts`,
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "skill-point-general-rank",
    canonical: {
      file: `${COMPLETION_SNAP}/temper-skill-point.generated.ts`,
      kind: "array-field",
      symbol: "skillPointGeneralSources",
      field: "key",
    },
    mirror: {
      file: `${GEN}/temper-skill-point.ts`,
      kind: "object-keys",
      symbol: "GENERAL_KEY_RANK",
    },
  },
  {
    name: "skill-point-zone-rank",
    canonical: {
      file: `${COMPLETION_SNAP}/temper-skill-point.generated.ts`,
      kind: "array-field",
      symbol: "skillPointZoneSources",
      field: "key",
    },
    mirror: {
      file: `${GEN}/temper-skill-point.ts`,
      kind: "object-keys",
      symbol: "ZONE_KEY_RANK",
    },
  },
  {
    name: "skill-point-public-dungeon",
    canonical: {
      file: COMPLETION_ADDON,
      kind: "array-field",
      symbol: "PUBLIC_DUNGEONS",
      field: "key",
    },
    mirror: {
      file: `${GEN}/temper-skill-point.ts`,
      kind: "array-field",
      symbol: "PUBLIC_DUNGEONS",
      field: "key",
    },
  },
]
