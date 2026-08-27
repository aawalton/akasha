---
id: 5fd400ed-88f1-5b66-b559-701fa8fe453a
slug: gate-blind-to-the-package-that-states-it
page-type-slug: finding
title: "Gate blind to the package that states it"
domain-slug: domain/global
---

# Claim

`check-non-optimistic-mutations` cannot see the package that states its own doctrine in full. Discovery requires a `next` dependency and `packages/alanwalton/web` has none, so the seven live files citing `mirror-not-driver` — including the one declaring "the client never sends a save" — are never walked. Nothing live states the doctrine either, and `ops enforcement list` shows the gate green. Third gate found blind, and the first blind to a whole package rather than to a spelling.

# Evidence

Read in `~/code` and `~/instructions` on `main`, draining `dirty/code/`. A seat met a passing citation and handed the shape back; I opened every claim before filing.

`packages/infra/checks/src/checks/check-non-optimistic-mutations.ts:110-114` is the whole of discovery:

    const hasNext =
      pkg.dependencies?.next != null ||
      pkg.devDependencies?.next != null ||
      pkg.peerDependencies?.next != null
    const hasApp = existsSync(resolve(dir, "app"))
    if (!hasNext || !hasApp) continue

`rg -n '"next"' packages/alanwalton/web/package.json` exits 1, so the package is dropped before a file in it is read.

What it drops: `packages/alanwalton/web/app/idle/lib/idle-actions.ts:31` — "SACRED invariant (mirror-not-driver): the client never sends a save. It POSTs" — and six more tracked files naming the doctrine, among them `workers/idle-tick.worker.ts`.

Nothing live states it: `rg -i "mirror-not-driver"` over `domains/`, `notices/`, `tools/`, `settings/` exits 1, against a control on the same pipeline returning a file. Two sources under `dirty/` still name it.

The dark-out is recorded. `check-configs-source-scanners.ts:449-450` says the gate "went dark after the Next→React Router migration (its discovery is `next`-gated)" and that `check-client-page-access-boundary` fills the gap. It fills part: that gate walks the repo but inspects only leading-`"use client"` modules calling `@shared/pages-access` directly, so it refuses one route rather than the doctrine. A seat reported the same reach limit from another package, where a `.server.ts` read passes green.

`pages/finding/code-check/metrics-gate-blind-to-query-builder.finding.md` and `pages/finding/alanwalton-app/location-traces-gate-blind-to-query-builder.finding.md` file this shape, both blind to a spelling inside a package they do walk. Neither leads a reader here: this gate never opens the package.

Where the doctrine should be stated, and by whom, is not settled here.
