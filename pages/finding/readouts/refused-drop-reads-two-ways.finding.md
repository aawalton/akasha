---
id: 2e5d80b2-00d3-547b-8207-b86b4baa2805
slug: refused-drop-reads-two-ways
page-type-slug: finding
title: "Refused drop reads two ways"
domain-slug: domain/global
---

# Claim

`domains/readouts.md` says a readout "keeps the last body it was given when its feed stops, and drops it when refused". "Drops it" reads two ways: the tile draws none of the kept body, which is what the code does, or the store clears the body, which the code refuses on purpose so the cache is there again the moment the credential works. The false reading is the one reached for first, because "keeps" took the body as its object in the same sentence.

# Evidence

Read 2026-08-10 during a `review-instructions` pass over `domains/readouts.md`, in `~/code` at `packages/alanwalton/native-shell/ios-widget/WidgetFeed.swift`. `FeedResolution.resolve` returns `Resolution(state: .refused, cacheWrite: nil)`, under a comment reading "A refusal also writes NOTHING. Clearing the cache would make the first successful read after a re-signin draw the never-read tile for one refresh cycle, for no gain" and "the cache is left where it is so it is there again the moment the credential works."

The drawing half was seen rather than inferred: `scripts/render-harness/run.sh --widget pipeline-health` passed `pipeline-health-medium-refused` against its reference at 0.0000% moved, and the PNG is a struck-through lock over "Sign in" with none of the tile's own furniture. `refused-is-distinct` passed too — the refused tile differs from all five other renders of that tile.

Not measured: whether any code has already been written against the false reading. The wording is Alan's to settle under `domains/domain.md` Every Changed Line, so nothing was landed; the reading recommends "and draws none of it when refused".
