---
id: 6464db5c-3c34-52d2-b857-648d43400d2e
slug: mirror-and-projector-name-one-thing
page-type-slug: finding
title: "Mirror and projector name one thing"
domain-slug: domain/pages-system
---

# Claim

One thing carries three names — projector, projection and mirror — and the two a reader meets first disagree with the one the code is filed under.

# Evidence

Measured 2026-08-15, running `review-command` on `ops pages-mirror reconcile`.

The code stands in `packages/shared/pages/fs-projector/`, and its entry points are `daemon.ts` and `reconcile-once.ts`. Inside that same package sits `mirror-io.ts`, so both spellings are already in one directory.

The systemd unit uses all three in a single line. It is named `pages-fs-projector.service` and describes itself as the "Pages filesystem-projection daemon — materializes the read-only .pages-mirror/ projection of public.pages into every live checkout".

The interface says mirror and only mirror. The verbs are `ops pages-mirror run` and `ops pages-mirror reconcile`, and the artifact on disk is `~/code/.pages-mirror`. So a reader coming from the CLI or from a checkout learns "mirror", and a reader coming from the repository learns "projector", with nothing telling either that the other name is the same thing.

The cost is live rather than hypothetical: writing `domains/ops-pages-mirror.md` this run, the code's own spelling pulled the first draft of the definition toward "projector" against the name every reader of the command surface sees.

Not measured: which spelling the pages system's own prose prefers, since no domain named the thing at all before this run.
