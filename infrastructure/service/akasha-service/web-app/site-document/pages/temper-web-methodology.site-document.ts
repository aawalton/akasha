import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const temperWebMethodology = {
  id: "01a0d5c9-d0b0-7343-85f7-240021f712e7",
  type: "page-type/site-document",
  slug: "temper-web-methodology",
  title: "Methodology",
  webApp: "web-app/temper-web",
  urlPath: "methodology",
  sections: [
    {
      anchor: "methodology-overview",
      title: "Overview",
      text: "Correctness is established through **two independent validation pipelines** that compare engine output against the live ESO game client. Each pipeline requires exact integer-level matches — there are no tolerance thresholds or approximate comparisons.\n\n1. **Tooltip validation** — skill descriptions, cooldowns, costs, and durations match game-client text exactly\n2. **Combat hit validation** — logged damage/heal values from real fights match engine formulas exactly\n\nBoth are automated as test suites with zero-tolerance assertions.",
    },
    {
      anchor: "methodology-tooltip-validation",
      title: "Tooltip Validation",
      text: "### Field Validation\n\nFor each skill with a known ability ID, the validator checks name, cooldown, cast time, channel duration, channeled flag, cost, and resource mechanic for exact matches.\n\nCooldown validation uses the formula:\n\n```\nround(baseCooldown * (1 + abilityCooldownMod) * 1000) === gameClientMs\n```\n\n### Description Value Validation\n\nSkill descriptions contain value and duration placeholders. The validator:\n\n1. Computes display values using the build's stats\n2. Applies buff duration modifiers to duration placeholders\n3. Substitutes placeholders into the template\n4. Normalizes both game text and engine text (strips ESO color codes, collapses whitespace)\n5. Asserts exact string equality\n\nThe formula coefficients, damage/healing multipliers, and duration modifiers run through the same code paths the game uses to render tooltips, validating not just the stat values but their downstream effects on skill output.",
    },
    {
      anchor: "methodology-combat-hit-validation",
      title: "Combat Hit Validation",
      text: "An in-game addon logs every companion combat event (ability name, hit value, target, result type, overflow) along with the companion's build hash. The validator replays each fight against the engine's formulas.\n\nThis validates against actual combat outcomes — real damage and healing numbers produced by the game server, not just the client's UI calculations.\n\n### Phase 1 — Heal Anchor\n\nHeals have no armor variable, making them a clean signal for validating weapon damage. The validator:\n\n1. Groups non-crit heal events by ability name\n2. Looks up the skill's coefficient from the data files\n3. Back-solves for weapon damage: `WD = round(observedHeal / (coefficient * tooltipHealingMult))`\n4. Confirms the inferred WD matches the engine's own computed weapon damage\n\n### Phase 2 — Damage Scenario Matching\n\nDamage hits depend on target armor, which varies. The validator tests each hit against a matrix of known scenarios:\n\n- **2 base armor values:** Overland (9100), Dungeon (18200)\n- **4 debuff combinations:** none, Minor Breach (2974), Major Breach (5948), both\n\nThe damage formula under test:\n\n```\ndamage = round(coefficient * WD * tooltipDamageMult * (1 - min(max(0, armor - debuffs - pen) / 50000, 0.5)))\n```\n\nAll hits against the same target must be consistent with a single base armor value. The test asserts zero failed hits and zero failed weapon damage checks for every logged fight.\n\n### What This Proves\n\n- Skill coefficients are correct (extracted from game data)\n- The armor mitigation formula matches the game (divisor 50000, cap 50%)\n- Weapon damage, damage done, healing done, and penetration metrics are computed correctly",
    },
    {
      anchor: "methodology-engine-architecture",
      title: "Engine Architecture",
      text: "### Metric Engine\n\nThe metric engine computes stats in three passes:\n\n1. **Effect extraction** — gathers effects from base stats, armor (weight + traits), weapons (base damage + traits), jewelry (traits), and skill passives\n2. **Sum-based metrics** — accumulates effects by metric ID and effect type (integer addition or fractional-change multiplication)\n3. **Formula metrics** — evaluates a DAG of metric formulas in topological order, supporting metric-ref, sum, add, multiply, and divide nodes\n\nThe topological sort guarantees that dependencies are computed before dependents, and the DAG structure prevents circular references.\n\n### Rotation Simulator\n\nThe rotation simulator models companion combat behavior tick-by-tick at 0.1s resolution:\n\n- Skill selection respects cast times, GCDs (1.0s companion, 0.7s light attack), per-skill cooldowns, and ultimate costs\n- Buff/debuff tracking with duration-based expiry\n- Ultimate generation (3.0/s in 8s windows triggered by light attacks)\n- Light attack damage: `1.5 * WD * tooltipDamageMult * critMult * armorMult`\n\n### Optimizer\n\nThe optimizer uses the metric engine as a black box scoring function. It searches through:\n\n- Companion + role + weapon role combinations (exhaustive)\n- Skill combinations (heuristic: categorizes skills as direct damage vs boosters, prunes low-value combinations)\n- Trait assignments (exhaustive per role)\n- Skill ordering permutations (exhaustive: 5! = 120)",
    },
    {
      anchor: "methodology-performance-verification",
      title: "Performance & Accuracy",
      text: "The simulator is heavily optimized to evaluate builds near-instantly. Every optimization is verified against a reference score, guaranteeing identical results — speed never changes the numbers.",
    },
    {
      anchor: "methodology-limitations",
      title: "Limitations",
      text: "What the validation pipelines do not cover:\n\n- **Rotation config assumptions** — default parameters (0.5 damage frequency, 0.5 synergy rate) are estimates, not validated against gameplay recordings\n- **Average crit** — the simulator uses expected-value crit multipliers rather than Monte Carlo sampling. This is correct in expectation but does not model variance.\n- **Buff/debuff uptime** — simulated uptime depends on rotation config and skill selection heuristics, not actual player behavior\n- **Game version coupling** — validation data comes from a specific ESO version. Game updates may change formulas or constants, requiring re-validation.",
    },
  ],
} as const satisfies SiteDocument
