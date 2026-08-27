---
id: 9cf535c2-71b5-5be7-bc0c-a328ac2fe1d6
slug: scratch-rule-unmeasured-at-home
page-type-slug: finding
title: "Scratch rule unmeasured at home"
domain-slug: domain/agent-harness
---

# Claim

The Scratch Location rule is unmeasured in the repository that states it: 26 files under `tools/` create scratch through `tmpdir()`, which is `/tmp` here, and the only check for the rule reports the instructions repo UNMEASURED on every arm.

# Evidence

Measured 2026-08-11, raised by a `review-instructions` reading of `refusals/bash-env-unresolved.md` as an aside about the check's own test file; the scope below was measured here.

`domains/agent-harness.md`, Scratch Location: "Write every throwaway file under `/var/tmp`, never `/tmp`. `/tmp` is tmpfs here, so a file left there holds RAM the whole fleet shares, and fills on inodes rather than bytes."

A grep for `tmpdir()` across `tools/` returns 37 uses in 26 files — gates (`typecheck.ts`, `document-conforms.ts`), libraries (`hook-probe.ts`) and tests (`corpus.ts`, `hooks-agree.test.ts`, `hook-liveness.test.ts`, `block-ungoverned-writes.test.ts` among them).

`packages/infra/checks/src/checks/check-tmpfs-scratch.ts` in the code repository is the check for the rule. Run here, it reports "233 file(s) create scratch under /tmp — 233 on the ratchet, 0 declared exception(s), 0 undeclared", and every arm carries "[repos: code-repo 14409, instructions UNMEASURED, books UNMEASURED, memory UNMEASURED, stories UNMEASURED]". So the instructions files are not on the ratchet, not declared exceptions, and not scanned.

The check's own docblock says the rule "was broken by the package that authors the instruction documents, and a documented rule its own authors break is not a weaker check but a different thing that does not work" — which names the authoring package in the code repo rather than this tree.

`domains/agent-harness.md`'s Intent already holds "Every check on the harness runs in the instructions repository rather than as a test in the code repository's CI", so the placement question is open on the document.

Not measured: whether any of the 37 sites leaks a tree rather than removing it — the check declares that arm UNMEASURED for the code repo too — or whether `tmpdir()` resolves to `/tmp` on every host this repo runs on.
