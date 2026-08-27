---
id: 0982d957-7dc9-5b48-9501-edcdb682f7d2
slug: code-test-pins-instructions-contract
page-type-slug: finding
title: "Code test pins an instructions contract"
domain-slug: domain/agent-harness
---

# Claim

A test in the code repository asserts the answer of a function that lives in the instructions repository. Every legitimate change to that function fails the code repository's CI, on every branch at once, with nothing in the failing repo having moved.

# Evidence

Seen on project #19350 on 2026-08-17, whose own change reached only `packages/agents/cli` and one baseline file.

`packages/agents/shared/project-binding.unit.test.ts:247` asserts `composeSeatName({ persona: "athena", …, principal: "agent" })` returns `athena-17646`. That composer is not code-repo code: the shim resolves through `seatCallPath()` to `~/instructions/tools/seat-call.ts`, the live shared checkout, so the test reads whatever the corpus says today.

The instructions commit `33c94efde` on 2026-08-17 rewrote `composeSeatName` to drop the persona segment for a seat whose principal is not Alan. The code was byte-identical either side of it: pipeline 28199 green at 18:33:46Z, pipeline 28200 failing the same step at 18:48:18Z, with the instructions commit at 18:42:48Z between them.

The instructions change was correct. `domains/seat-name.md` has stated under Intent, since before that commit, that "a seat whose principal is Alan takes its persona's name alone" and "every other seat's name spells everything it states except its persona." The implementation caught up to a contract already written down. The test pinned the behaviour from before it did.

So the test was stale from the moment the intent was written, and nothing said so until a piece of unrelated work tripped over it. What makes this worth recording is not the one assertion — that is repaired — but that the arrangement guarantees a repeat: a contract owned in one repository, asserted in another, with no instrument on either side reporting that the two have parted.

`domains/repos/code-repo.md` states One-Way Dependency, and a reader meeting only the failure reads this as that rule breached from the instructions side. It is not: the dependency runs the legal way, from code onto instructions. What is missing is that a code-repo test asserting an instructions-owned answer is indistinguishable, in the file, from one asserting code-repo behaviour.
