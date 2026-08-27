---
id: b223e9da-9f31-5027-a2f8-98f4bed48ac2
slug: guarantee-must-be-legible
page-type-slug: finding
title: "Guarantee must be legible"
domain-slug: domain/instrument
---

# Claim

A claim being true is not sufficient; it must also be legible to the mechanism that has to rely on it. A dynamically-certain guarantee a scanner cannot read is, to that scanner, indistinguishable from no guarantee, so the strictly stronger argument is correct and loses. The estate enacts this and states it nowhere: `tools/document/tokens.ts` says "a raw figure in a ceiling position does not typecheck", and `domains/instrument.md` carries nothing on it.

# Evidence

A standing ruling of 2026-07-28, held in `dirty/skills/agent-harness/rulings/instruments.md` and reached by an ingest seat emptying that source. Its case: a spread-of-actual mock factory satisfies its superset guarantee by construction — it cannot omit an export, including one added later — and is therefore strictly stronger than an enumeration a human maintains. "That argument is correct and it loses." The check does not enforce that the guarantee holds; it enforces that the guarantee is statically verifiable.

The specimen is live and unchanged, which is why filter 1 did not touch it. `packages/infra/checks/src/checks/check-mock-module-surface.ts` stands, and its header requires "an inline object-literal factory whose keys form a superset of the mocked module's runtime named-export surface", defining the finding `unanalyzable-factory` as "factory shape is not a statically-scannable object literal (spread, helper call, computed key, etc)". It enforces scannability, not the guarantee.

Nothing states the claim, and the estate builds it everywhere. `tools/document/schemas/` is the markdown-schema perimeter re-expressed as typed values so a gate can evaluate them, and `tools/document/tokens.ts` gives the one-field version: "The `Ceiling` brand is what makes the rank structural rather than a convention — a raw figure in a ceiling position does not typecheck." The nearest STATED neighbour is `domains/code-quality.md`'s Code Comments — "Never write an instruction as a code comment... A comment is capped by nothing. Write it where it is bounded" — which binds where an instruction goes rather than what form a certified property must take.

Searched: `legib|statically|by construction|cannot express|does not typecheck` over `domains/`, five lines and none of them this; in this corpus `legib|statically verifiable|cannot read it|by construction`, plus `findings/instrument/` and `findings/check/` read by name.

NOT MEASURED: how many standing checks enforce legibility rather than the property.
