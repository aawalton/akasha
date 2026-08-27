---
id: ac8e4f3f-83a8-52a6-8c52-9071a545fd66
page-type-slug: finding
title: "Class skill spec is now eleven parts"
domain-slug: domain/file-length
---

# Claim

`class-skill-spec.md` is a system prompt handed to an extractor subagent, and bringing it under the character ceiling turned it into eleven files behind an entry that names them in order. Nothing in the repository assembles them, so `defaultClassSkillSpecPath()` now returns an index rather than the contract it used to return.

# Evidence

Measured in the #19315 worktree after #19320 committed. The original was 18,323 characters at `packages/alanwalton/awen/ingest/class-skill-spec.md`. Every non-blank line of it survives across the eleven parts — the split was checked line by line and none is absent — behind a 3,004-character entry file.

`defaultClassSkillSpecPath` is defined in `packages/alanwalton/awen/ingest/src/config.ts`. It has zero references anywhere in the repository outside its own definition, and so do its two siblings `defaultSpecPath` and `defaultChronologySpecPath`. Confirmed by search rather than taken from the report. So nothing is broken today: no caller reads the path, and no extractor is wired up.

A loader that assembles the eleven parts was written during the split, verified to recover every line, and then deliberately removed, because the code repository holds no unused code and a loader with no caller sitting beside three path functions with no caller is speculation about an interface nobody has built. That was the right call and it is why this is a finding rather than code.

What it costs: whoever wires the class-skill extractor up has to assemble the parts rather than read one file, and the function that looks like it hands over the prompt hands over a table of contents instead. A reader who takes the path at face value gets an index and a model that reads it as the whole instruction.

Not measured: whether the extractor is wanted at all, or whether the spec should be one file again once something reads it. Both are for whoever owns `awen-ingest`.
