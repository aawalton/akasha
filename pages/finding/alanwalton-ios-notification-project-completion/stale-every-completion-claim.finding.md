---
id: 1ae9ad8a-c234-5bcb-b278-471c85cc47a4
slug: stale-every-completion-claim
page-type-slug: finding
title: "Stale every completion claim"
domain-slug: domain/global
---

# Claim

`payload.ts` still states that every project reaching done pushes, which the guard landed in #18932 made false.

# Evidence

`packages/alanwalton/apns-push-notifier/src/payload.ts`, in the docblock over `formatProjectLabel`, reads: "(Alan's amendment, canon #15452: every project→done pushes, distinguish by title + seq)".

Since 2026-08-13T00:57:34Z a project whose track is `child` mints nothing, so the parenthetical describes behaviour the package no longer has. The claim it carries is the same one #18932 removed from the T1 docblock in `producers.ts`, which now names the domain that settles the question and records that the amendment was cited as authority for a question it was never put.

The sentence around it is about the title format and is unaffected — `#<seq> <title>` is still what a lock-screen glance gets. What is stale is the scope clause inside the parenthesis.

Measured 2026-08-13 while verifying #18932, by reading every occurrence of `15452` in `packages/alanwalton/apns-push-notifier/src`. The other occurrences describe the chokepoint, the push bridge and the mark-read route, and none of them says anything about which completions qualify.
