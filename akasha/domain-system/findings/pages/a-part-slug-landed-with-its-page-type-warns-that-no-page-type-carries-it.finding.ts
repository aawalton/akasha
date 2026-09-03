import type { Finding } from "../finding.page-type.ts"

export const aPartSlugLandedWithItsPageTypeWarnsThatNoPageTypeCarriesIt = {
  id: "01a0685f-f6ff-70e0-956e-98a8a62bd881",
  pageTypeSlug: "finding",
  slug: "a-part-slug-landed-with-its-page-type-warns-that-no-page-type-carries-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "`landedMechanically` says \"the index took less than the whole of this — <file>: `part-slugs` — no `page-type` carries the slug <X>\" when the page type X is written in the same batch as the part-slug naming it. The landing is whole and the file is on disk; the index resolves part-slugs before it has taken in that batch's new pages. A lane reading that line as a failed landing would ablate nothing and re-land needlessly.",
  evidence:
    "Measured 2026-09-03 over four landings from one lane. In `2dc31a6e17` the only warned slug on `akasha/infrastructure/inference.domain.ts` was `page-type/inference-run`, written in that same batch, while `domain/generation`, `workspace-package/inference-pool` and `workspace-package/voice-inference` on the same list drew none. In `786842b154` all eleven `agent-hook/*` slugs and both `text-property/*` slugs on `akasha/hook-system/agent-hooks/agent-hook.page-type.ts` resolved and only `page-type/inference-hook`, written in that batch, did not.

The lag outlives the batch by at least one commit: in `7becdec50d` the warning also named `page-type/audio`, whose file `akasha/infrastructure/audios/audio.page-type.ts` had landed one commit earlier in `f8fef7bf51` and stands on disk. `readBack.matched` equalled the count of non-null bodies in every one of the four, with `missing` and `lingering` empty, and `git show --stat` shows every file.",
} as const satisfies Finding
