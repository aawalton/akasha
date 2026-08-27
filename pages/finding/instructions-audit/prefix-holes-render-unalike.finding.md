---
id: 0d7a1e3e-949c-52e0-bb75-0d8cdae325c3
page-type-slug: finding
title: "Prefix holes render unalike"
domain-slug: domain/global
---

# Claim

`prompt-shape-mirror.ts` renders its two comparison holes differently: one carries the whole assignment and the other the JSON of the value alone. So a reader is shown `CHANNEL_ENVELOPE_PREFIX='<channel'` against `"<channel "` and has to strip the name and re-quote before seeing that the difference is a trailing space. The JSON quoting is what makes a trailing space visible at all, so the asymmetry is half right.

# Evidence

Observed by the dispatched `review-instructions` seat reading `refusals/prompt-prefix-disagrees.md` on 2026-08-12, while rendering the body across three realistic drifts on both arms.

It is neither false nor ambiguous, so no verdict on the document's own lines reached it. The change is at the call site rather than in the document.

Not measured: how the two holes read on a drift that is not whitespace.
