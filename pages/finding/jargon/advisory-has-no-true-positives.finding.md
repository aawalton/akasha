---
id: 2af6b258-460c-5a5d-ab24-676decccba59
slug: advisory-has-no-true-positives
page-type-slug: finding
title: "Advisory has no true positives"
domain-slug: barred-meaning/jargon
---

# Claim

Every live `terms-in-reach` advisory fires on a capitalised word, not a term use. All nine: `Agent` on agent-governance, agent-harness, folders/agent-fleet and subagent; `Health` on health-bar and define-domain-structure; `Reference` on repetition; `Love` and `Link` on capture-time-tracking. `Reference` and `Link` are verified bolded imperatives opening a bullet, and every bullet in that schema opens with one. The check cannot part a sentence-initial capital from a declared term.

# Evidence

I ran `bun tools/run-checks.ts` on 2026-08-07 and read the whole advisory: 49 terms against 434 domains, 9 uses out of reach among live documents and 12 under quarantine. Every one of the nine live hits is a capitalised word at the head of a sentence or a bolded bullet.

Two are verified as imperatives rather than term uses. `domains/repetition.md:23` is "**Reference a design-system token; never write the value it resolves to.**" `domains/tasks/alan-harness/capture-time-tracking.md` opens the flagged bullet with a bolded **Link**, and a review-instructions seat on that document reported every bullet in the schema opening the same way.

This generalises `pages/finding/jargon/reference-plain-sense-collides.finding.md`, filed earlier in this pass against the single `Reference` hit. That one reads as a collision peculiar to one word. The population says otherwise: the advisory has no true positives among live documents right now.

Not measured: whether the check has ever produced a true positive, and whether the seven `Agent` and `Health` hits are also imperatives or merely sentence-initial. I did not open those seven.
