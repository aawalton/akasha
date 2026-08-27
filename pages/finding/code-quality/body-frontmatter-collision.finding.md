---
id: 2fbd237d-487c-518a-b6db-c8fbf2c597a5
page-type-slug: finding
title: "Body frontmatter collision"
domain-slug: domain/code-quality
---

# Claim

Two exported types in `tools/lib` both name a field `body`, and they disagree about whether frontmatter is inside it.

# Evidence

`tools/lib/frontmatter.ts:60` declares `parseFrontmatter(body: string)`. The argument is a whole file, frontmatter included — that is what the function exists to split off. So here `body` means everything on disk.

`tools/lib/markdown.ts:64` declares `readonly body: string` on `Section`, documented at `:64-68` as "Everything below the heading, up to the next heading at this depth or shallower." So here `body` means what remains after something has been taken off the front.

The two are opposite about the same question. A caller holding a `body` cannot tell from the name whether the frontmatter is still in it, and both spellings are exported and read across `tools/`. The readers of `Section.body` are `tools/compose-glossary.ts`, `tools/compose-notices.ts`, `tools/lib/section.ts` and `tools/checks/resume-notices.ts`; `parseFrontmatter` is reached from the document machinery.

This surfaced during a jargon pass on the word `body`, which ruled the word ordinary English and recommended no rename. The collision is not evidence of jargon and no rename to `content` repairs it — `content` is a mass noun and breaks at three of the four sites where `body` is counted ("every body", "two bodies", "a body"). What is wrong is that one of the two fields is named for the wrong thing, and which one is not obvious from either file.

The word is otherwise sound across 843 occurrences in this repository in six senses — a person's body, a body of material, a file's text, a heading's text, a message's text, and a heredoc or function body — all of which a reader of English arrives at correctly.
