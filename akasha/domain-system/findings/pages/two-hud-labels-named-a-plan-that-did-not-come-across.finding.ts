import type { Finding } from "../finding.page-type.ts"

export const twoHudLabelsNamedAPlanThatDidNotComeAcross = {
  id: "01a060ae-70e1-7b77-8205-12657f13c839",
  pageTypeSlug: "finding",
  slug: "two-hud-labels-named-a-plan-that-did-not-come-across",
  domainSlug: "domain/temper",
  claim:
    "Two hand-written HUD component labels carried notes naming phases of a plan this initiative does not bring across. Both were rewritten to say what is true of the component and nothing about the plan. No consumer reads the field they sit in, so nothing broke, but the plan they named is now recorded nowhere.",
  evidence:
    "The labels are in what is now akasha/temper/temper-hud-components/hud-component-labels. PERFORMANCE_METER_FRAGMENT read `Already suppressed by TemperHud via SetHiddenForReason (prior art for Phase 2).` and now reads `Already suppressed by TemperHud through SetHiddenForReason.` PROMOTIONAL_EVENT_TRACKER_FRAGMENT read `FCOChangeStuff hides this today via a bespoke path — the Phase-3 child project target.` and now reads `FCOChangeStuff hides the tracker today through a path of its own.` The second was forced: `project` is a taboo term whose barred sense is a unit of work serving an initiative, which is what it meant there. A grep of temper/shared-interface-hud-addon finds no reader of grainNotes at all, so the field is documentation baked into the catalog data and reaches no player. The rest of the recreated catalog is value-identical to the committed one, 51 records compared field by field, and the recreated reading run over ~/esoui gives output identical to the original reading's.",
} as const satisfies Finding
