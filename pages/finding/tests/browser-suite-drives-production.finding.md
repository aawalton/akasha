---
id: 8429f91e-052e-586e-813c-ce80b2100c1a
slug: browser-suite-drives-production
page-type-slug: finding
title: "Browser suite drives production"
domain-slug: domain/global
---

# Claim

Every `*.browser.test.ts` under `packages/alanwalton/web` resolves its target from `BROWSER_TEST_URL`, which on this machine is `https://alanwalton.com`. So an agent running the package's suite drives live production with a real user's credentials, and the result is a reading of what is deployed rather than of the branch under test — a suite that cannot fail on a bad change and cannot pass on a good one, while writing to the real site as it goes.

# Evidence

Measured 2026-08-06 on this host. `BROWSER_TEST_URL=https://alanwalton.com`, and `BROWSER_TEST_REAL_USER_EMAIL` and `BROWSER_TEST_REAL_USER_PASSWORD` are both set. Each browser test skips only when one of those is missing — for example `packages/alanwalton/web/reader-pager.browser.test.ts:31` prints "[browser skip] … missing BROWSER_TEST_URL / BROWSER_TEST_REAL_USER_EMAIL / BROWSER_TEST_REAL_USER_PASSWORD / SUPABASE_URL / SUPABASE_ANON_KEY". With all five present they run, and they run against whatever that URL names.

RAISED BY A SEAT, GROUNDED BY ME. The #18074 worker reported 60 failures in that suite among its pre-existing-failure triage and said they ran against deployed production. I did not take the count on report; what I checked myself is the target and the credentials, which is the part the claim rests on. The 60 is its measurement, not mine.

TWO SEPARATE COSTS, and they want separating by whoever picks this up.

As an instrument: a suite pointed at a deployed site is blind to the diff. A branch that breaks the reader passes if production is healthy; a branch that fixes it fails if production is not. Anyone triaging a red here is reading the wrong tree, and the seat that hit it spent time proving the failures were not its own.

As an act: these are not read-only probes. They authenticate as a real user against the live site, so running the package's tests is a write to production by a process nobody thinks of as touching it. `ops` treats sending content to a service one does not control as publishing; this is the same shape and reaches it through `bun test`.

WHAT I DID NOT MEASURE. I did not run the suite. I did not establish what `BROWSER_TEST_URL` is set to in CI — it may well point at a branch preview there, which would make this a local-only trap rather than a defect in the suite, and those want different fixes. I did not check whether the other packages carrying `*.browser.test.ts` resolve their target the same way.
