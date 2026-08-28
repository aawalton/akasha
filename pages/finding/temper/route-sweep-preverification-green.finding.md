---
id: bae46252-cd07-534f-ab56-3a6374ffd2f7
slug: route-sweep-preverification-green
page-type-slug: finding
title: "Route sweep preverification green"
domain-slug: domain/temper
---

# Claim

The route-sweep instrument for temper (project #16055) has a verification plan covering pre-deploy and post-deploy agent-runnable checks, and every pre-deploy check in that plan (P1-P7) ran and returned green on 2026-07-25.

# Evidence

Source: project #16055 (domain in front matter: `temper`), status `someday_maybe`, `live-on: deploy`. Carried no objective — captured and never defined; text below is drawn from its capture notes, retired from the row's `notes` attribute on 2026-08-15.

**Verification plan, 2026-07-25T12:40:55Z**, for the route-sweep instrument. All checks stated agent-runnable, none routing to `verification_user`, since each criterion is a fact (count, exit code, status code, DOM observation) and no taste judgement is in scope.

Pre-deploy: P1 unit suites; P2 mutation proof of the pure core (each rule deleted -> red -> restored -> green, plus a control); P3 denominator provenance (matches a flatten of `app/routes.ts`; throws on empty module); P4 live FAIL induction with a matched control; P5 identity real (bound `:userId` is Alan's own uid, localhost refused); P6 two-identity coverage (signed-in vs anon, exclusions printed); P7 branch CI green at the exact SHA. Post-deploy: D1 verb resolves from main; D2 a round against https://tempereso.com reproduces denominator 36; D3 exit code 0/2. Out of scope: the in-game surface (needs ESO rig #15805); fixing what the sweep finds; 19 excluded routes (17 `/api/*`, 2 mutating redirects), reasons always printed.

**Verification automated 2026-07-25T14:25:54Z — P1-P7 all PASS.** P1: 72/0 across 3 files. P2: three mutation rounds, each red -> restored -> green. P3: denominator 36 confirmed; empty-module throw confirmed. P4: `/watcher` on a nonexistent route gave FAIL http 404 exit 2, `/home` passed in the same session; the 404 page still rendered a populated `<main>` — the status code caught it, not emptiness. P5: bound uid matched the live owner's own; localhost refused. P6: signed-in swept 17 of 36 (14 gated, 3 redirects); anon swept 3 public; 19 excluded with reasons. P7: CI green at the exact SHA, pipeline 25862, 0 non-green of 79 steps.

Cut at a paragraph boundary in the source; the above is its head.
