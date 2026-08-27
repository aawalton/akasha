---
id: df127167-8a83-50dc-8bd8-ce12a69747fc
slug: intent-glob-reaches-quoted-intents
page-type-slug: finding
title: "Intent glob reaches quoted intents"
domain-slug: page-body-section/domain-intent
---

# Claim

`pages/domain/domain-intent.md` declares `instructions-path: "**/*.md#Intent"`, and a `# Intent` heading is not only a domain's. `pages/page-body-shape/project.md` and `pages/page-body-shape/initiative.md` each give `# Intent` a `- {quote}` block, and `tools/lib/project-worker-gate.ts` reads those as quoted criteria. So the glob makes this domain required reading for sections whose entries quote an intent rather than being one.

# Evidence

I read `pages/domain/domain-intent.md` whole on 2026-08-22. Its frontmatter carries `instructions-path: "**/*.md#Intent"` and no other path key.

`pages/page-body-shape/project.md` line 19 is `# Intent` and line 21 is `- {quote}`. `pages/page-body-shape/initiative.md` line 37 is `# Intent` and line 39 is `- {quote}`.

`tools/lib/project-worker-gate.ts` line 8 sets `const INTENT_HEADING = "# Intent"` and line 59 refuses with the words `quotes no intent under its` and that heading, so what stands under it on a project is a quote of a domain's entry rather than an entry.

`pages/page-type/domain.md` Path Globs declares a path glob only where the domain's area is that set of files, and every file a glob matches has the domain as required reading and every domain above it.

Raised by the review-instructions reading of `pages/domain/domain-intent.md`, finished 2026-08-22, at its closing line. It noted that the kept Design line says "the domain", so no reader is misdirected by what they find, and left the width of the area alone.

Not measured: how many project and initiative documents the glob reaches this way, whether any other page shape gives `# Intent` a different meaning, and whether a narrower glob exists that reaches every domain and no project.
