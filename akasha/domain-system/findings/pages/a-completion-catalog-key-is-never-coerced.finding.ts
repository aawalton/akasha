import type { Finding } from "../finding.page-type.ts"

export const aCompletionCatalogKeyIsNeverCoerced = {
  id: "01a0607e-a956-77c1-92b7-a466abc4d5c5",
  pageTypeSlug: "finding",
  slug: "a-completion-catalog-key-is-never-coerced",
  domainSlug: "domain/temper",
  claim:
    "The three completion capture zod schemas key their records with `z.number()`, while the seven other capture host schemas key theirs with `z.coerce.number()`. Saved variables reach the host as Lua tables whose keys arrive as text, which is what `z.coerce.number()` reads. The recreation carries the difference unchanged rather than settling it quietly. Either the completion records are parsed from something already converted, or these three refuse keys the other seven accept.",
  evidence:
    "In the akasha recreation, keyed by `z.coerce.number()`:\n\n- `temper-game-collections-antiquities-capture-host/antiquity-lore-catalog-schema`\n- `temper-game-collections-capture-host/collectibles-catalog-schema`\n- `temper-game-collections-lore-capture-host/lore-library-catalog-schema`\n- `temper-game-collections-tribute-capture-host/tribute-catalog-schema`\n- `temper-game-crafting-capture-host/recipe-catalog-schema`\n- `temper-game-crafting-capture-host/trait-research-catalog-schema`\n\nKeyed by plain `z.number()`:\n\n- `temper-game-completion-capture-host/achievement-catalog-schema`\n- `temper-game-completion-capture-host/cadwell-catalog-schema`\n- `temper-game-completion-capture-host/zone-completion-catalog-schema`\n\nThe split follows the source exactly. `temper/game-completion-capture-host/src/*.ts` used `z.number()` at every `z.record` call and the other source packages used `z.coerce.number()` at every one.\n\nEvery one of these schemas is checked against its payload type in `@akasha/temper-capture-shapes` by `assertSchemaMatchesPayload`, and all ten modules typecheck. The witness compares the inferred type rather than what the parser accepts at runtime, so it cannot tell the two keyings apart.\n\nThe reader that decides which is right is `tools/lib/temper-catalog-generate/tiers/`, which calls `achievementCatalogSchema`, `cadwellCatalogSchema` and `zoneCompletionCatalogSchema` in `achievement.ts`, `cadwell.ts` and `zone-completion.ts`.",
} as const satisfies Finding
