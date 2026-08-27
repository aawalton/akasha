---
id: 8a28a4e8-d736-5be5-bcf8-a7666668a520
slug: two-doors-disjoint-rules
page-type-slug: finding
title: "Two doors disjoint rules"
domain-slug: domain/global
---

# Claim

Two doors gate the instructions repository and enforce completely disjoint rule sets, sharing zero rules in common. The old door (`ops instructions {write,edit,mv,rm,verify}` in `packages/agents/instructions/`) is the weaker of the two: demonstrated in-session, it landed a change to `domains/global.md` without levying `read-before-write` or `hold-identity`, which the new door then refused the same file for. Its own help still calls itself "the only door into the instructions repo."

# Evidence

Project #17566, domain `instructions-harness`. Alan's ruling: neither `dirty/` nor `findings/` should have source-position enforced, and, on seeing the cause, that instructions work should not require code-repo changes. Never defined. Moved here from the row's retired `notes` attribute on 2026-08-15.

Two doors, zero shared rules, measured 2026-08-03 on the same file:
new door (`~/instructions/tools/{write,edit,mv,rm}.ts` via `tools/run-gates.ts`): document-conforms, domain-slug-unique, glossary-generated, hold-identity, hook-liveness, links-resolve, principles-generated, read-before-write, read-the-schema, read-what-governs, token-ceiling, typecheck.
old door (`ops instructions {write,edit,mv,rm,verify}` in `packages/agents/instructions/`): census, citations, claim-probe, context, frontmatter, hub, length, link, placement, repo-path, roles, routing, sibling-statement, source-position.

Per-rule cost of retiring the old door, across 979 surfaces: DEAD on all 979 (sibling-statement, routing, claim-probe); NEAR-DEAD (hub); NEVER FAILS (placement, repo-path); QUARANTINE NOISE (link: 263 fail, 894 of 894 under `dirty/`; source-position: 129 fail); SUPERSEDED (length by token-ceiling, link by links-resolve); LIVE, NO COUNTERPART (roles, census). `roles` is the only rung that can judge the role vocabulary since no pipeline holds the corpus; reports 14 corpus roles / 14 declared extensions / 28 stored, reconciled.

The work: port `roles` and `census` into `~/instructions/tools/checks/`; retire the old door's rules and the `ops instructions` verb set with them; the 1,487 violations go with it as one retired instrument's output, not 1,487 defects.

Also true, does not survive retirement on its own: `sourcePositionRule` emits "the file resolves and the line is real" as a constant; `exists()` runs only when a document declares a pinned upstream. Of 69 cited paths: 29 resolve, 33 are bare basenames resolving against no root, 7 name a directory and still do not resolve.
