---
id: 280d7f8d-fb35-5953-94c3-3c20d06308a9
slug: suite-runs-races-live-corpus
page-type-slug: finding
title: "Suite runs races live corpus"
domain-slug: domain/global
---

# Claim

The `suite-runs` check reads the live instructions corpus while other seats are committing to it, so a seat running `ops instructions run-checks` at its documentation stage can be handed a failure that no tree caused and that does not reproduce. The seat-name ambiguity test is the observed case: it failed once between two passing runs of the same command, over a corpus that grew by fifteen domains while those runs were happening.

# Evidence

PASS, FAIL, THEN PASS. Running #18969's documentation stage on 2026-08-13 I ran `ops instructions run-checks` twice. The first run reported `[suite-runs (instructions)] pass [over 419 test file(s)] 6124 test(s) across 419 file(s)`. The second, minutes later, reported `fail` on the same denominator: "`bun test tools/` reported 1 failing test(s) and exited 1", naming `every name the live corpus can spell reads to exactly one seat > every full name the persona, domain and role vocabularies spell over a bound row". I then ran that file alone, `bun test tools/tests/read-seat-name.test.ts`: 17 pass, 0 fail, 81 expect() calls. Nothing was changed by me between any of the three.

THE CORPUS MOVED UNDER THE RUNS. Between the two full runs `terms-in-reach` went from "122 term(s) against 1047 domain(s)" to "122 term(s) against 1062 domain(s)", and `documents-conform (memory)` from 2739 to 2743 governed documents. Fifteen domains and four memory documents landed from other seats inside that window, which is the population this test derives seat names from.

WHY THIS TEST IS THE ONE THAT SHOWS IT. It spells every full name the persona, domain and role vocabularies can produce and requires each to resolve to exactly one seat, so its input is the whole live domain set rather than any fixture. A domain arriving mid-read is enough to make two spellings collide or a row go unbound, and the same corpus read a moment later is consistent again.

WHAT IT COSTS. `domains/tasks/projects/build-parent-deploy.md` puts `ops instructions run-checks` at the documentation stage and tells that seat to escalate a failure its tree did not cause. A seat that does not re-run reads this as its own, and the repair it would reach for is somebody else's domain document.

NOT MEASURED. How often it fires, which other checks in the suite share the exposure, and whether the test reads the corpus once or several times within a run. I changed nothing in the check or the test.
