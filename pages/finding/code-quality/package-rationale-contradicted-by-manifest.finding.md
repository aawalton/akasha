---
id: 6288093d-5ecc-5ebf-acd6-8332f9640f6b
slug: package-rationale-contradicted-by-manifest
page-type-slug: finding
title: "Package rationale contradicted by manifest"
domain-slug: domain/code-quality
---

# Claim

A live docblock justifies a package's existence with a dependency fact that a package.json two directories away contradicts, and the contradiction is invisible from the docblock.

# Evidence

`packages/agents/instruction-document/src/index.ts` says its shared grammars live there "because the two cannot reach each other: `@infra/checks` declares `@infra/scripts`, which declares `@agents/instructions`, so an edge in either direction closes a cycle."

`packages/infra/checks/package.json` declares `@agents/instructions` DIRECTLY, among its dependencies. So `@infra/checks` reaches `@agents/instructions` in one hop rather than two, and that edge closes no cycle. Only the reverse direction is blocked. Both clauses a reader is given are false as written: the two DO reach each other, in one direction, and an edge in that direction already exists.

The conclusion survives on the docblock's other stated ground — a second copy in either consumer would drift from the first — and the placement is right: both consumers declare `@agents/instruction-document`, so neither pays a new edge. What is wrong is the reason, not the decision.

Found while emptying `dirty/code/packages-agents-instruction-surface-claude.md`, the package's own former head document, which carries the same two clauses. That document is quarantined and being removed, so the claim would otherwise survive only in the live docblock, unchecked.
