import type {
  CodegenIdentityPair,
  CodegenIdentityRemedy,
} from "../codegen-type-identity-drift/codegen-type-identity-drift.module.code.ts"

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

export const INSTRUCTIONS_MIRROR_DIR = "temper/temper-addon-generators"

const RULES_CORE = "temper/game-items-rules-core/src"
const ADDON_RULE_TYPES = "temper/game-items-addon/src/generated/rule-types.generated.ts"
const GEN = INSTRUCTIONS_MIRROR_DIR

function gen(slug: string): string {
  return `${GEN}/${slug}/${slug}.module.code.ts`
}
const COMPANIONS_CORE = "temper/temper-companions-core"
const SKILL_KINDS = "temper/temper-skill-kinds"
const CHARACTER_SOURCES = "temper/temper-character-sources"
const SKILL_LINES_SNAP = "temper/temper-skill-lines/skill-line-category-data"
const EQUIPMENT_KINDS = "temper/temper-equipment-kinds"
const SKILL_POINT_SOURCES =
  "temper/temper-skill-point-finder/skill-point-sources/skill-point-sources.module.code.ts"
const PUBLIC_DUNGEON_SOURCES =
  "temper/temper-player-completion/skill-point-public-dungeons/skill-point-public-dungeons.module.code.ts"

export const MIRROR_GENERATORS: ReadonlyMap<string, CodegenIdentityRemedy> = new Map([
  [ADDON_RULE_TYPES, { repo: "instructions", file: gen("rule-types") }],
])

export const CODEGEN_TYPE_IDENTITY_PAIRS: readonly CodegenIdentityPair[] = [
  {
    name: "item-action",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/inventory-rule-types.ts`,
      kind: "const-tuple",
      symbol: "ITEM_ACTION_VALUES",
    },
    mirror: { repo: "code", file: ADDON_RULE_TYPES, kind: "union-type", symbol: "ItemAction" },
  },
  {
    name: "companion-scope",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/inventory-rule-types.ts`,
      kind: "union-type",
      symbol: "CompanionScope",
    },
    mirror: { repo: "code", file: ADDON_RULE_TYPES, kind: "union-type", symbol: "CompanionScope" },
  },
  {
    name: "stock-scope",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/inventory-rule-types.ts`,
      kind: "union-type",
      symbol: "StockScope",
    },
    mirror: { repo: "code", file: ADDON_RULE_TYPES, kind: "union-type", symbol: "StockScope" },
  },
  {
    name: "buy-source",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/buy-rule-types.ts`,
      kind: "union-type",
      symbol: "BuySource",
    },
    mirror: { repo: "code", file: ADDON_RULE_TYPES, kind: "union-type", symbol: "BuySource" },
  },
  {
    name: "comparison-op",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/generated/temper-comparison-op.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPARISON_OPS",
    },
    mirror: { repo: "code", file: ADDON_RULE_TYPES, kind: "union-type", symbol: "ComparisonOp" },
  },
  {
    name: "character-scope",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/inventory-rule-compiler-types.ts`,
      kind: "union-type",
      symbol: "CharacterScope",
    },
    mirror: { repo: "code", file: ADDON_RULE_TYPES, kind: "union-type", symbol: "CharacterScope" },
  },

  {
    name: "companion-role-rank",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-roles/companion-roles.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_ROLE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-role"),
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "character-role-rank",
    canonical: {
      repo: "code",
      file: `${CHARACTER_SOURCES}/character-roles/character-roles.module.code.ts`,
      kind: "object-keys",
      symbol: "ROLE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-character-role"),
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "target-scope-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/target-scopes/target-scopes.module.code.ts`,
      kind: "object-keys",
      symbol: "TARGET_SCOPE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-target-scope"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "target-type-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/target-types/target-types.module.code.ts`,
      kind: "object-keys",
      symbol: "TARGET_TYPE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-target-type"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "status-effect-type-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/status-effect-types/status-effect-types.module.code.ts`,
      kind: "object-keys",
      symbol: "STATUS_EFFECT_TYPE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-status-effect-type"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "special-effect-type-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/special-effect-types/special-effect-types.module.code.ts`,
      kind: "object-keys",
      symbol: "SPECIAL_EFFECT_TYPE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-special-effect-type"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "comparison-op-precedence",
    canonical: {
      repo: "code",
      file: `${RULES_CORE}/generated/temper-comparison-op.generated.ts`,
      kind: "object-keys",
      symbol: "TEMPER_COMPARISON_OPS",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-comparison-op"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "companion-armor-slot-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-armor-slots/companion-armor-slots.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_ARMOR_SLOT_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-armor-slot"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "companion-jewelry-slot-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-jewelry-slots/companion-jewelry-slots.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_JEWELRY_SLOT_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-jewelry-slot"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "companion-weapon-slot-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-weapon-slots/companion-weapon-slots.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_WEAPON_SLOT_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-weapon-slot"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "companion-weapon-role-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-weapon-roles/companion-weapon-roles.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_WEAPON_ROLE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-weapon-role"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "companion-activation-buff-rank",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-activation-buffs/companion-activation-buffs.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_ACTIVATION_BUFF_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-activation-buff"),
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "companion-skill-slot-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-skill-slots/companion-skill-slots.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_SKILL_SLOT_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-skill-slot"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "companion-trait-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/companion-traits/companion-traits.module.code.ts`,
      kind: "object-keys",
      symbol: "COMPANION_TRAIT_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-companion-trait"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "skill-bars-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/skill-bars/skill-bars.module.code.ts`,
      kind: "object-keys",
      symbol: "SKILL_BAR_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-skill-bars"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "skill-slot-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/skill-slots/skill-slots.module.code.ts`,
      kind: "object-keys",
      symbol: "SKILL_SLOT_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-skill-slot"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "skill-type-precedence",
    canonical: {
      repo: "code",
      file: `${SKILL_KINDS}/skill-types/skill-types.module.code.ts`,
      kind: "object-keys",
      symbol: "SKILL_TYPE_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-skill-type"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "weapon-bar-precedence",
    canonical: {
      repo: "code",
      file: `${EQUIPMENT_KINDS}/weapon-bars/weapon-bars.module.code.ts`,
      kind: "object-keys",
      symbol: "TEMPER_WEAPON_BARS",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-weapon-bar"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "rotation-breakdown-row-precedence",
    canonical: {
      repo: "code",
      file: `${COMPANIONS_CORE}/rotation-breakdown-rows/rotation-breakdown-rows.module.code.ts`,
      kind: "object-keys",
      symbol: "TEMPER_ROTATION_BREAKDOWN_ROWS",
    },
    mirror: {
      repo: "instructions",
      file: gen("temper-rotation-breakdown-row"),
      kind: "object-keys",
      symbol: "precedence",
    },
  },
  {
    name: "skill-line-category-rank",
    canonical: {
      repo: "code",
      file: `${SKILL_LINES_SNAP}/skill-line-category-data.module.code.ts`,
      kind: "object-keys",
      symbol: "SKILL_LINE_CATEGORY_DATA",
    },
    mirror: {
      repo: "instructions",
      file: gen("skill-line-categories"),
      kind: "object-keys",
      symbol: "KEY_RANK",
    },
  },
  {
    name: "skill-point-public-dungeon",
    canonical: {
      repo: "code",
      file: SKILL_POINT_SOURCES,
      kind: "array-field",
      symbol: "PUBLIC_DUNGEONS",
      field: "key",
    },
    mirror: {
      repo: "instructions",
      file: PUBLIC_DUNGEON_SOURCES,
      kind: "array-field",
      symbol: "SKILL_POINT_PUBLIC_DUNGEON_SOURCES",
      field: "key",
    },
  },
]
