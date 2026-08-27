---
id: d0322917-536f-52b1-80dc-a100599f6135
slug: confirming-test-cannot-discriminate
page-type-slug: finding
title: "Confirming test cannot discriminate"
domain-slug: page-type/role
---

# Claim

An agent checking a claim it already believes tends to reach for a test both hypotheses predict, and reads the result as confirmation. The test runs, returns what was expected, and is reported as verification — so a belief that was never distinguished from its alternative acquires evidence. What is missing is not rigour but discrimination: nobody asks what the test would have shown had the claim been false.

# Evidence

Two instances on 2026-08-05, on the same row (#17882), by two different agents, neither of whom noticed at the time.

THE LEAD. Claimed the `git_mirror` alert could be raised and never withdrawn, reasoning that `state` being a Prometheus label meant a state change starts a new series and orphans the old one. The exporter query was two files away and unread. It is `SELECT DISTINCT ON (labels->>'repo')` — latest row per REPO, not per repo+state — so a later `mirrored` row supersedes an `unreachable` one and the alert clears on its own. The recovery path claimed to be missing was the design.

The test that "confirmed" it: the alert re-fired at 17:16 with no new metric rows written. That was reported as empirical confirmation. It is equally predicted by the mundane explanation — the CronJob had been suspended, so of course no new rows arrived and of course the last one kept being served. The observation could not tell the two apart and was read as though it could.

THE WORKER. Believed the GitHub destinations were anonymously readable, and ran a command to prove no credential was needed. The shell carried `GIT_ASKPASS`, which git consults before prompting and which no config or `HOME` stripping disables, so the command supplied a credential while appearing to demonstrate that none was required. The probe was deployed on that belief and its first scheduled run failed on every repository. Filed separately as `pages/finding/git-repos/askpass-authenticates-anonymous-tests.finding.md`; the worker's own words for it were "the same error, wearing a conclusion".

WHAT THE TWO SHARE. Both agents ran a check, and both checks executed correctly and returned exactly what was expected. In each case the result was consistent with the belief and equally consistent with its negation, and neither agent asked what a falsifying result would have looked like.

Not measured: whether this shape appears in the estate's standing instruments as well as in agent conduct.
