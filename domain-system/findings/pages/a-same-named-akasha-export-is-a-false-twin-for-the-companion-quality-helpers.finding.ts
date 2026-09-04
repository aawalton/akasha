import type { Finding } from "../finding.page-type.ts"

export const aSameNamedAkashaExportIsAFalseTwinForTheCompanionQualityHelpers = {
  id: "01a0635a-9b78-7105-9bfc-0ae7cd358d0d",
  pageTypeSlug: "finding",
  slug: "a-same-named-akasha-export-is-a-false-twin-for-the-companion-quality-helpers",
  domainSlug: "domain/temper",
  claim:
    "The two companion quality helpers `temper/web` imports are absent from akasha, and the same-named pair a symbol census finds in `@akasha/temper-characters-equipment-ui/equipment-quality-rules` is a false twin. That pair is typed on `EquipmentQualityOptionId`, seven ids including `mythic`, where the companion pair is typed on `CompanionEquipmentQualityId`, six without it. Repointing the four web edges there would widen a return the file hands straight to a Badge variant.",
  evidence:
    'Measured at `d41ea63b9a` by parsing every tracked `package.json` exports map and every file it names with the TypeScript compiler, then indexing exported declarations: 231 akasha manifests, 3,809 export entries, 12,864 distinct symbols. Controlled both ways, with `transformItemSetProgress` found and a minted absent name not found.\n\n`getQualityVariant` and `getQualityClassName` are reached by four `temper/web` files, all from `@temper/game-companions-ui/companion-equipment-quality-helpers`: `companion-armor-panel-card.tsx:31`, `companion-jewelry-panel-card.tsx:34`, `companion-weapon-bar-panel-card.tsx:31` and `global-companion-bulk-edit-tags.tsx:15`.\n\nThe companion-typed home already sits in akasha. `@akasha/temper-companions-core/companion-equipment-quality-rules` exports `AVAILABLE_QUALITY_OPTIONS`, `LEGENDARY_QUALITY_OPTIONS`, `getAvailableQualityOptions` and `capQualityForSlot`, and `companion-armor-panel-card.tsx:24` already reads the first of those from it. Neither helper is among the four.\n\nThe legacy helper returns `"elevation-muted" | "normal" | "fine" | "superior" | "epic" | "legendary"`. The akasha equipment-ui helper returns those plus `"mythic"`. `companion-armor-panel-card.tsx:253` writes `<Badge variant={getQualityVariant(...)}>`, so the wider return reaches a prop rather than an inner variable.\n\n`COMPANION_EQUIPMENT_QUALITY_DATA` holds six ids and `EQUIPMENT_QUALITY_DATA` seven, the extra being `mythic`, so the argument narrows safely and only the return widens.',
} as const satisfies Finding
