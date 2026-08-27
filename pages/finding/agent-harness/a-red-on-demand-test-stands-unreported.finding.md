---
page-type-slug: finding
id: 013e2a15-148a-540a-9079-44d6196b25cf
slug: a-red-on-demand-test-stands-unreported
title: "A red on-demand test stands unreported"
domain-slug: domain/agent-harness
---

# Claim

`tools/tests/door-loading.on-demand.test.ts` has one failing test, and nothing reports it.

# Evidence

Run on 2026-08-21 it answers `2 pass 1 fail`. It needs nothing in place: it was run cold, with no browser, database or network, and the two passing cases passed.

Seven other on-demand files sampled the same way that day were fully green — `agent-governance-absent` 17, `ask-alan-carried` 15, `bash-env` 5, `block-code-comments` 13, `block-destructive-git` 84, `compose-boot-draws` 2, `discarded` 8.

Alan has directed that on-demand tests are not to run automatically, so this is a note of one red test rather than a case for running the set.

Whether the failure is a defect in what the test covers or a stale assertion in the test is not judged here; nobody has read it.
