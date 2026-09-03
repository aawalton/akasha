import type { Finding } from "../finding.page-type.ts"

export const anIdReplacedForBeingNoUuidV7DroppedTheOldLastEightHex = {
  id: "01a0685f-3f4b-7484-8994-7ecbd125e58e",
  pageTypeSlug: "finding",
  slug: "an-id-replaced-for-being-no-uuid-v7-dropped-the-old-last-eight-hex",
  domainSlug: "domain/akasha-migration",
  claim:
    '`page.page-type.ts` carries the departure "An identity replaced for being no uuid version 7 keeps the last eight hex of the old one." Two page types already landed in akasha replaced a non-v7 predecessor id and kept none of it, so the tie back to the page the identity belonged to is gone from the file and recoverable only from the ablated markdown in git.',
  evidence:
    "Measured 2026-09-03 while migrating `pages/page-type/`. `pages/page-type/selection-policy.page-type.md` line 2 carried `id: 446ba68c-c5d4-5364-8290-8c845eff7e6e` — third group `5364`, so version 5, not 7. `akasha/alan/fitness/selection-policies/selection-policy.page-type.ts` line 8 carries `01a06838-7a9d-7d0a-8e41-674ebea29caf`; last eight hex `bea29caf` against the old `5eff7e6e` — no overlap. `pages/page-type/subagent-kind.page-type.md` line 2 carried `id: 8a4513ac-7dab-5e37-a141-4a20ac3c5f22`, third group `5e37`, version 5; `akasha/seat-system/subagent-kinds/subagent-kind.page-type.ts` line 12 carries `01a06838-7a9d-7394-97ff-d069ea588410`, last eight hex `ea588410` against the old `ac3c5f22` — again no overlap. The two akasha ids share the prefix `01a06838-7a9d`, so both were minted in one pass without the predecessors in hand.\n\nThe content did carry: every design line of both markdown files stands as an invariant on its counterpart, which is why the markdown was ablated rather than held. Only the identity thread was lost.\n\nNot repaired here. Rewriting the id of a page that has already landed is a change to identity rather than a mechanical migration edit, and I could not tell from inside this lane whether anything keyed off either id in the meantime. The call belongs to whoever decides whether the invariant binds retroactively or only from the next replacement on.",
} as const satisfies Finding
