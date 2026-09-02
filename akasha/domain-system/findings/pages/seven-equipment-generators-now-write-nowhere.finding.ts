import type { Finding } from "../finding.page-type.ts"

export const sevenEquipmentGeneratorsNowWriteNowhere = {
  id: "01a060c4-bb41-71f2-b629-76e96bca756e",
  pageTypeSlug: "finding",
  slug: "seven-equipment-generators-now-write-nowhere",
  domainSlug: "domain/temper",
  claim:
    "Seven generators in temper-addon-generators now emit code that no write target reads, because the tables they wrote were landed in akasha by hand instead. The pages and the landed tables have nothing keeping the two equal from here. generateTemperRace was already in this position before, so the count is eight.",
  evidence:
    "Measured 2026-09-02. Landing akasha/temper/temper-equipment-kinds inlined seven tables that tools/lib/temper-addon-data/writes/equipment.ts used to write out: temper-armor-slot, temper-armor-type, temper-jewelry-slot, temper-jewelry-type, temper-weapon-slot, temper-weapon-bar and quality. Those seven w(...) calls and their imports are gone from writes/equipment.ts in commit 54d318a3ee, and the seven generated files under temper/game-characters-equipment/src are deleted.\n\nThe seven generator modules under akasha/temper/temper-addon-generators are untouched and still exported. A grep for generateTemperArmorSlot across the tree now answers only its own declaration, exactly as generateTemperRace has answered since temper-races landed.\n\nOne of the seven keeps a check on it. The weapon-bar-precedence pair in infra/cluster-checks/src/lib/codegen-type-identity-pairs.ts compares TEMPER_WEAPON_BARS against the generator's PRECEDENCE, and that pair was repointed at akasha/temper/temper-equipment-kinds/weapon-bars/weapon-bars.module.code.ts in the same commit. The other six have no such pair, so a page edited under akasha/temper/temper-catalog would change nothing and refuse nothing.",
} as const satisfies Finding
