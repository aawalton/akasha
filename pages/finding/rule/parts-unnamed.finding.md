---
id: a0dc08fa-5b0b-55af-a226-8b0675b3dd88
page-type-slug: finding
title: "Parts unnamed"
domain-slug: domain/global
---

# Claim

A rule has an act and a description that nothing names, while a principle's three parts each carry a term-domain of their own. The schema gives the two kinds an identical shape, so the vocabulary is asymmetric where the form is not.

# Evidence

`tools/document/schemas/ranked.ts` defines one shape for both kinds: `const act` is one paragraph capped at Statement with `marks: { every: "strong" }`, `const description` is one paragraph capped at Gloss with `marks: { bare: true }`, composed as `contains: [act, description]`.

`domains/principle.md` glosses three term-domains — `domains/principle-act.md`, `domains/principle-aid.md`, `domains/principle-warrant.md`. None of the three declares an `instructions-path`, so they govern no files and stand purely as vocabulary for a principle's anatomy.

No `domains/rule-*.md` exists.

The reviewer's recommendation, recorded as evidence rather than as a decision: leave it. A principle's description earned two terms because it carries two distinguishable jobs, the aid and the warrant; a rule's description carries one. On that reading the asymmetry is the shape being right rather than the rule side being unfinished.

This is a fork over `principle` and `rule` jointly. Both are owned by ryn.

Raised by the `review-instructions` reading of `domains/rule.md` on 2026-08-05, which established that this sentence is the only authority for what a rule is: `ranked.ts` explicitly declines to say what separates the two rungs, and the only other instance of the definition, `domains/global.md:27`, is generated from a glossary manifest rather than binding.
