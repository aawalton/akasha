import type { Question } from "../question.page-type.ts"

export const atlasThePersonaThatOwnsTheAtlasAppAlanwaltonAtlasW = {
  id: "019f9617-45c7-7528-a9a0-25489cc4e2db",
  pageTypeSlug: "question",
  slug: "atlas-the-persona-that-owns-the-atlas-app-alanwalton-atlas-w",
  ask: "Atlas — the persona that owns the atlas app (@alanwalton/atlas/web) — is DEAD (wrapper pid gone, not in the agent list), so the 4th keyboard-standard adoption is stalled: my hand-off is queued but nothing's processing it. The other 3 are moving well (alanwalton + archive DONE and live-verified in prod, temper in progress). How should the atlas adoption proceed? I'd lean toward driving it myself under #15792 to keep the rollout moving (same mechanical template as the other 3), but it's Atlas's app, so your call.",
  askedBy: "olwen",
  askedIn: "019f9450-57a1-764b-9ea9-ede89f8c0ffd",
  status: "answered",
  offered: [
    "You (Olwen) drive the atlas adoption directly under #15792",
    "Reassign it to Astra (owns parent alanwalton, just did 2 identical adoptions)",
    "Revive Atlas first — it should own its own app",
  ],
  answer: "Revive Atlas first — it should own its own app",
  closedAt: "2026-07-24T21:49:09.537Z",
  context: "txt",
} as const satisfies Question
