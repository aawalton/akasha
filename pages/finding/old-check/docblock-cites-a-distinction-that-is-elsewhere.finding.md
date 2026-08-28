---
id: 7033b1b9-ef3b-5319-b041-c0f2e7a5aa3e
slug: docblock-cites-a-distinction-that-is-elsewhere
page-type-slug: finding
title: "Docblock cites a distinction that is elsewhere"
domain-slug: domain/old-check
---

# Claim

A docblock cites `instructions-harness` for a distinction that surface does not draw, and quotes a phrase that lives on `check` where it is said of a check rather than of a gate — so the sentence's own authority states the opposite of what it needs.

# Evidence

`tools/checks/findings-sorted.ts:10` reads: "A CHECK AND NOT A GATE, by the distinction `domains/instructions-harness.md` draws: a gate is paid on every change forever, and neither the migration that sorted the store nor a shell write passes one."

`domains/instructions-harness.md`'s entire Design section is one line: "Anything a gate or a check could enforce is not written as an instruction." It lumps the two rather than distinguishing them.

The quoted wording is `domains/check.md`: "An audit is paid once over standing state; a check is paid on every change forever." It is said there of a CHECK, not of a gate.

Not repaired despite Adjacent Repair. Repointing the citation to `domains/check.md` would cite a surface saying the opposite of what the sentence needs, and every other repair reclassifies the file. So this is downstream of the conflict between `domains/check.md`'s definition and `tools/lib/check.ts`'s, rather than a path that moved.

Raised by the `review-instructions` reading of `domains/check.md` on 2026-08-06.
