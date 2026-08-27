---
id: 5599b081-3524-5215-ad13-fdb5173344bb
page-type-slug: finding
title: "Role store header denies its body"
domain-slug: barred-meaning/identity
---

# Claim

The header of `packages/agents/shared/persona-facts.ts` states that a persona's default role is answered by the `role` attribute on her database row and that it "has no representation in the corpus at all". The same file's body reads the role from the corpus and deliberately does not select it from the row, so the file's opening paragraph tells a reader the opposite of what its own code does.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-personas-docs-creation-checklist-steps.md`, whose step 8 carried the same row-borne claim and was cut as false.

The header, lines 9-13: "*which role does she hold by default* by the `role` attribute on that same row. `playerCharacter` and `role` are what remains row-borne, and neither has any representation in the corpus at all."

The body, same file. `readPersonaRoster` selects `["slug", "playerCharacter"]` under its own comment: "`role` is deliberately NOT selected: a persona's default role is read from `domains/personas/*.md`, and selecting it here would be a second source for one slot." `readPersonaDefaults()` calls `collectPersonaBindings(corpus.defaultRoles, corpus.championedDomains)` off `readPersonaCorpus()`, and that function's docblock heads a paragraph "THE ROLE MOVED OFF HER DATABASE ROW".

The corpus does represent it: `tools/document/schemas/persona.ts:62` declares the `role:` key on `domains/personas/*.md`, beside `championed-domain:` at line 55.

Not what already stands. `pages/finding/seat/seat-design-lives-in-code-comments.finding.md` cites this file's lines 1-45 for arguing design in comments, which is placement rather than a header disagreeing with a body. `pages/finding/identity/persona-default-role-unpinned.finding.md` is about the front pinning `worker` over a declared role.

Why nothing reports it: the two statements sit about a hundred lines apart in one file, the header reads as the file's summary, and both halves are prose, so neither typechecks against the other.

Not established: which side Alan wants. `playerCharacter` genuinely is row-borne and the sentence bundles it with `role`, so the repair may be to split the sentence rather than reverse it.
