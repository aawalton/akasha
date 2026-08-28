---
page-type-slug: finding
title: "Only a walk fills held answers"
domain-slug: domain/graph-system
---

# Claim

The graph holds one answer per file per producer under `.git/answers/said/`, and the only thing that writes one is a walk over every node. Nothing fills the cache on purpose.

The gate asks about the files in one patch, so it fills those and no others. A reader wanting the whole repository therefore finds almost nothing held, refuses its targeted answer, and walks — and that walk is what fills the cache for whoever asks next. The first such reader pays a second and a half; every reader after it pays sixty milliseconds, until something moves a producer's closure and the cycle starts again.

Alan ruled on 2026-08-27 that this is good enough for the pass that found it, on the grounds that what the index is and what the cache is are not yet clearly defined.

# Evidence

Measured 2026-08-27 in akasha at `26bbd3a72`. `said/import/` held 96 answers where the repository has 11,134 distinct `.ts` and `.tsx` blob oids. Three consecutive asks for what reaches `page/page.ts` over `import`, `relation` and `contains`, each in its own process: 1327ms, 62ms, 60ms. The first refused `import.into` and walked; it left 11,134 answers behind, and the two after it hit them.

Only the `import` producer was measured this way. `relation` refuses on a different condition — a pages index behind the working tree — and `contains` and `loader` hold nothing at all, so neither was exercised here.

Not measured: how often a producer's closure actually moves in a working day, which is what sets how often the walk is paid. The 1327ms figure is one repository on one machine with a warm page cache.
