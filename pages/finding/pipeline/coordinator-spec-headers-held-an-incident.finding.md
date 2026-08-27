---
id: 2b8f112c-feb5-5272-b425-600eed54552c
page-type-slug: finding
title: "Coordinator spec headers held an incident"
domain-slug: page-type/pipeline
---

# Claim

The merge-queue coordinator's FizzBee spec headers held a written-up production incident, and the whole of it now stands only in git history.

# Evidence

Recorded on 2026-08-16 by #19288, which deleted 478669 bytes of comment from 71 FizzBee specs under the code comment domain's rule that a comment outside the forms goes to a domain or goes away.

Most of what went was ordinary drifting rationale. The merge-queue coordinator headers were not. The largest, `packages/infra/ci/merge-queue/coordinator/spec/config-load-timeout.fizz` at 27498 bytes of comment, is an incident write-up: which subprocess timed out, how the throw escaped `advanceForming` and killed the reconcile tick, why the batch held the staging slot for about a hundred minutes, and what bound the retry.

The value is concentrated. The top eight files, all merge-queue coordinator specs, held 125510 of the 478669 bytes.

Deleting was the right call and is not in question here: nothing re-read the headers, nothing held them against the spec below them, and they cite project numbers and symbol names that drift. The domain's rule is delete wholesale precisely so that what is worth keeping is rebuilt deliberately rather than carried along.

This is filed so that whoever later decides some of it should be a domain knows where the material is rather than having to rediscover that it ever existed: the parent tree's branch point, `997aed4667^`, holds every deleted line.

No claim is made here that any of it should be rebuilt. That is a judgment for whoever holds the pipeline domain, and a separate project from the sweep that removed it.
