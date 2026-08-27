---
id: 73395138-11e3-54c2-b934-7eb6a62a7533
page-type-slug: finding
title: "Twelve persona row keys should not migrate"
domain-slug: page-type/persona
---

# Claim

In persona, twelve of the fifty-one keys on the persona rows should not become properties when the rows move to files. Nine have no reader anywhere in either repository: `memoryHolds`, `leadDoctrine`, `readsOnLoad`, `owedPings`, `standingWatches`, `rewardConcepts`, `sessionUmbrella`, `helpers` and `family`. Three more carry a reader but hold no meaning, and Alan ruled them dropped on 2026-08-19: `wallpaperDir`, `voiceClonerModel` and `level`.

# Evidence

Measured 2026-08-19 across all 40 live persona rows, then swept both repositories for each key as a quoted string or a dot access, excluding `node_modules`, `dist`, build output, Python virtualenvs and tests.

No reader, and the rows say why. `memoryHolds` stands on all 40 and is empty on all 40. `helpers` stands on 6 and is empty on all 6. `readsOnLoad` stands on 37 carrying one identical value. `leadDoctrine` stands on 11 carrying `true` and nothing else. `owedPings` (11) and `standingWatches` (15) hold `[]` on the rows sampled. `sessionUmbrella` stands on 4, at 2952 characters mean.

`rewardConcepts` is the costliest of the nine: a back-relation on 39 rows, 3963 characters mean and 8160 at its widest, mirroring the ids of the persona portrait settings that already name their own persona. It is derivable from the settings themselves, and the per-property cap in the pages UI exists because of this one key.

`family` stands on all 40 with 8 distinct values. Its only matches in the sweep are a Python virtualenv and a bundled build artifact.

Dropped by Alan on 2026-08-19, reader but no meaning: `wallpaperDir` is read by `wallpaper-install.ts` and is empty on all 40 rows. `voiceClonerModel` is read by `voice-page-data.ts` and holds `moss` on all 40. `level` holds `1` on the 6 rows carrying it and is computed from `totalPoints` elsewhere. `nonEmptyContentKeys` and `lastViewedAt` are page-system infrastructure rather than anything about a persona.

Corrected in the measuring: `emailAddress`, `wakeSources` and `wallpaperDir` first read as unused against a search scoped to the persona packages. Widening it found real readers for all three — `email/google/src/agent-channels.ts`, `tools/lib/persona-wake-slugs.ts` and `personas/core/src/wallpaper-install.ts`. A scoped search returning nothing is not evidence of nothing.
