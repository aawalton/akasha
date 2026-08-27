---
id: f2e4e685-21b8-504d-9ba8-82fbaf6036a9
slug: code-comments-tree-unmigrated
page-type-slug: finding
title: "Code comments tree unmigrated"
domain-slug: domain/code-quality
---

# Claim

The code tree does not satisfy Code Comments as it now stands. `domains/code-quality.md` reads "Write a code comment only where a tool reads it as a field", widened on 2026-08-09 at `9f6514ccc` from a form forbidding only instructions written as comments. The tree still carries comments no tool parses, including about a hundred prose lines in `tools/document/schemas/domain.ts`. Nothing standing says whether that code is owed a migration or is grandfathered.

# Evidence

Raised by `claude-code-quality-archivist-review-instructions` during a review-instructions reading of `domains/code-quality.md` on 2026-08-09. That seat reported 580 lines beginning `//` landing in `.ts` files in the instructions repository across 25 commits since `9f6514ccc`, and about a hundred lines of prose comment in `tools/document/schemas/domain.ts`. Those counts are its measurement, relayed rather than re-run here.

That seat also tested whether the standing corpus contradicts the rule and found it does not: no document under `domains/` cites a code comment as where a reason is kept. The filing seat confirmed the rule text at `domains/code-quality.md` line 17. Not measured: the same counts in the code repository, and whether any of the surviving comments would qualify as a field a tool reads.
