import type { Finding } from "../finding.page-type.ts"

export const dndSheetScopedParked = {
  id: "01a06555-9f3d-70b6-b5e0-04caac311b7c",
  pageTypeSlug: "finding",
  slug: "dnd-sheet-scoped-parked",
  domainSlug: "domain/all-about-alan",
  claim:
    "A real-life DND-style character sheet for Alan, reading live values-levels, persona-relationship-levels and real-life progress data, is scoped and parked, likely to compose with astra's custom-display platform as its rendering rail.",
  evidence:
    "Alan capture (alanNotes batch, intake 2026-07-15): 'Real life DND character sheet'. At capture, this was design work with the intake interview pending (after the unlock-system items); scope was unknown — possibly a persona/values-facing surface rather than Idle-game-internal.\n\nSCOPE SETTLED + PARKED (Alan, question-answer, 2026-07-16T06:02:08Z): the sheet's subject is ALAN — real-life stats and tracking as a DND-style character sheet (a read over live pages data: values levels, persona relationship levels, real-life progress). Alan parked it at someday_maybe. When activated: design a character-sheet surface over the live values-personas data; likely composes with astra's custom-display platform (project #15513) as the rendering rail.\n\nThis was project #15561 (domain all-about-alan, status someday_maybe). The row was captured and never defined — it carried no objective. The text above is its capture, moved off the row's retired `notes` attribute on 2026-08-15.",
} as const satisfies Finding
