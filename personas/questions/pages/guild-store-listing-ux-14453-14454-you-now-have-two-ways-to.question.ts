import type { Question } from "../question.page-type.ts"

export const guildStoreListingUx1445314454YouNowHaveTwoWaysTo = {
  id: "019f71e0-d7f9-7f54-b7ed-00287b5530d6",
  pageTypeSlug: "question",
  slug: "guild-store-listing-ux-14453-14454-you-now-have-two-ways-to",
  ask: "Guild-store listing UX (#14453/#14454): you now have TWO ways to list items — the manual sell-helper overlay (TemperListings: you pick item + price, single confirmed post) and the rule-driven auto-lister (TemperInventory: TTC-priced, fires automatically when you open a trading house). Keep them as two separate surfaces, or merge into one listing UX?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "Keep separate — manual overlay + invisible auto-list (current shape, no change)",
    "Merge — one listing surface, rules pre-fill, manual override",
    "Keep separate but surface the auto-list (visible queue/log, no merge)",
  ],
  answer: "Keep separate — manual overlay + invisible auto-list (current shape, no change)",
  closedAt: "2026-07-17T21:00:55.010Z",
  context: "txt",
} as const satisfies Question
