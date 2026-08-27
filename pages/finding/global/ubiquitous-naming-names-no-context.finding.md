---
id: b7dbea76-0ef0-5a73-bff5-bbfb936ff26f
page-type-slug: finding
title: "Ubiquitous naming names no context"
domain-slug: domain/global
---

# Claim

Ubiquitous Naming names no bounded context, and the domain vocabulary is one bounded context by construction rather than by that principle.

# Evidence

`domains/global.md` reads "Use the same name for a concept in code, data, interface and prose alike", with no clause admitting that one word may name different concepts in different contexts.

Alan stated on 2026-08-06 that three of his own contexts each name a different thing: `Stress Capacity` in technical conversation about the mechanics, `Health` in his resource-bar model, and `Health` again in his values. All three are live in the corpus.

The tree cannot hold that. `domain-slug` is unique across the corpus and `tools/checks/domain-edges.ts` enforces it, so one slug names one concept whatever a speaker means elsewhere. The collision was settled by giving the concepts distinct slugs — `health` for the value, `health-bar` for the bar — rather than by admitting a context.

Not measured: whether any other estate surface relies on a second sense of a word already declared as a domain, and whether a bounded-context clause would change any judgment now that the uniqueness check settles the tree either way.
