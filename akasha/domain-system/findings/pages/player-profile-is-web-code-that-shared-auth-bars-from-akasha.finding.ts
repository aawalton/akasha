import type { Finding } from "../finding.page-type.ts"

export const playerProfileIsWebCodeThatSharedAuthBarsFromAkasha = {
  id: "01a060e2-ace3-7cc7-838c-8c0fbe82332f",
  pageTypeSlug: "finding",
  slug: "player-profile-is-web-code-that-shared-auth-bars-from-akasha",
  domainSlug: "domain/temper",
  claim:
    "`temper/player-profile` is one React hook file that cannot land in akasha, and what bars it is not the `@temper/game-characters` dependency its manifest names. `src/use-player.ts` imports `@shared/auth/use-auth` and three modules of `@shared/pages-ui`, both outside the akasha folder, so `imports-inside` refuses the file whatever else lands. The hook also reads and writes through the dead `@akasha/pages-access`. It belongs with `temper/web`, alongside the seven `-ui` packages.",
  evidence:
    '`temper/player-profile` holds exactly one source file, `src/use-player.ts` at 4,492 bytes, exporting `usePlayer` and `usePlayerByUserId`. Its imports are `@shared/auth/use-auth`, `@shared/pages-ui/supabase/use-pages`, `@shared/pages-ui/supabase/mutations/use-optimistic-patch-page`, `@shared/pages-ui/supabase/mutations/use-optimistic-upsert-page`, `@akasha/pages-access/patch`, `@akasha/pages-access/sentinels`, `@akasha/pages-access/upsert`, `@akasha/utils-narrow/json-value`, `react`, and one type from `@temper/game-characters/build-metadata`.\n\nOnly that last one appears in any dependency-ordered wave plan. What it takes is `ProfileMetadata`, an interface of two optional string unions, so `game-characters` landing would move the package no closer.\n\nThe survey filed as `the-seven-temper-ui-packages-are-the-web-app-rather-than-packages-to-move` measured the same `@shared/*` coupling across seven folders and names none of these. `player-profile` carries `"functionalType": "next-ui"` and no `-ui` suffix, so a census by folder name misses it, and the wave plan in the ember survey schedules it as a wave 2 landing that unblocks two more packages.\n\nThe brief for this wave records `@akasha/pages-access` as dead at `requireFileBacked`, for reads as well as writes. `usePlayer` calls `upsertPage` and `patchPage` from it and `usePagesSupabase` for reading, so a recreation would have to be written against `askingFor` and `writeFiles` rather than carried across.',
} as const satisfies Finding
