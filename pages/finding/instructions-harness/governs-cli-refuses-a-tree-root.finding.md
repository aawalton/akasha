---
id: 01f3ef92-f503-5861-9d85-5dcf1861f757
slug: governs-cli-refuses-a-tree-root
page-type-slug: finding
title: "Governs CLI refuses a tree root"
domain-slug: domain/global
---

# Claim

`ops instructions governs` throws a `TypeError` when asked about a tree's own root, though `governsTree` in `tools/lib/governs.ts` exists to answer exactly that question.

# Evidence

`tools/lib/governs.ts:190` declares `governsTree`, whose comment says a rule claiming a whole tree binds a seat before it opens a file and that nothing else answers that. Its command-line block at `:212-232` never calls it: `locate()` returns `relPath: ""` for a root, `governedBy` runs `outOfBounds("")` and throws `\`\` does not name a path inside the instructions root`.

Measured 2026-08-03 on all three roots. `ops instructions governs --file-path ~/code` and `--file-path ~/memory` both exit 1 with the raw stack trace rather than a refusal, and `~/instructions` does the same. This predates the memory tree and is not caused by it; the third root only makes the same hole reachable one more way. A seat asking what it is under before touching anything gets a crash and no answer.
