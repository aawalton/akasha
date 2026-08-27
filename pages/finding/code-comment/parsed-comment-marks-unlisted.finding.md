---
id: acac9c52-477c-5db2-9641-e9a48eaed01f
slug: parsed-comment-marks-unlisted
page-type-slug: finding
title: "Parsed comment marks unlisted"
domain-slug: domain/code-comment
---

# Claim

The `command` entry on `domains/lists/code-comment-forms.md` names one mark and one reader — `// command:`, read by `tools/ops/declared.ts` — and there are now two of each. A block-header `* command:` line, with a `* repos:` line under it, is parsed by `tools/lib/tool-declaration.ts` and decides whether a file under `tools/` is an `ops` verb.

# Evidence

The list is what `domains/code-comment.md`'s `No Code Comments` rule admits, so a comment in none of its forms reads as one that may be taken out. The two marks:

- `// command: <summary>` on a file under `tools/commands/`, where the file's path is the verb. This is the form the list names.
- `* command: <summary>` in a block header on a file directly under `tools/`, with `* repos:` read only on the line immediately after it. 30 files carry this today and it yields the 42 `ops instructions` and `ops memory` verbs. The list names neither the mark nor the reader.

What the gap costs is on record twice. `262deee67` is a revert titled `revert the comment sweep: it took out lines the ops CLI parses for its verb list`, and `9f686c140` restored five declarations a sweep had removed. The residue of that fight is still standing: `tools/glossary.ts`, `tools/dag.ts`, `tools/file-finding.ts` and `tools/compose-subagents.ts` each carry the declaration twice, once in the header and once in a standalone block above the imports. Only the first is ever read, by either parser.

Two further readings that bear on it. `tools/gates/command-kept.ts` reads the same declaration through the same parser, so a sweep that takes one of these lines out of a file that already stands is refused at the command — but the gate is not-applicable to a file that does not exist yet, and `tools/rm.ts` and `tools/mv.ts` do not run it at all. And a file carrying the declaration twice would survive the deletion of the first block, because the parser would find the second and the gate would report the command kept.
