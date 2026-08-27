---
id: 05227404-9a0f-5ecd-8d2a-d4e8f0b2ce1b
slug: mv-breaks-cross-repo-links
page-type-slug: finding
title: "Mv breaks cross repo links"
domain-slug: domain/ops-instructions
---

# Claim

`ops instructions mv` repoints links within the instructions repo and reports zero broken links, while links from the memory repo to the moved file break silently. Its own `[links]` and `[mentions]` gates count only instructions-repo documents, so the run that breaks a memory link is the run that reports nothing broken. A finding, an initiative or a theme citing a domain document is exactly the population at risk, because quoting a domain's intent by link is how the work system is built.

# Evidence

Measured 2026-08-16 by causing it, not by reading about it.

`ops instructions mv --from domains/folders/narrative-engine.md --to domains/narrative-engine.md` landed as commit `767125b`. Its gate output reported `[links] 2604 document(s) checked, 0 link(s) would break among the live documents` and `[mentions] 5021 file(s) checked, 0 mention(s) would be stranded`.

At that moment an initiative of mine under `~/memory/initiatives/awen/` carried three objective bullets, each linking `../../../instructions/domains/folders/narrative-engine.md`. All three broke. `ls` on that path exits 2, "No such file or directory". Nothing reported it at the move and nothing reported it after: the memory repo's own `links-resolve` runs only when a memory file is written, so the breakage stands until somebody happens to edit the document holding it. I found it going to add a fourth bullet, and repaired all three in commit `e36b725`.

The denominator is what makes this legible. `[links]` checked 2604 documents, and the instructions repo holds 2604 live documents — so the population is that repo, whole, and the memory repo is not in it at any count.

The reach is not confined to my case. Initiatives and themes quote a domain's intent by link: `~/memory/themes/adopt-file-backed-pages.md` links `../../instructions/domains/page-type-backing.md`, and `~/memory/initiatives/ryn-all-instructions-have-schemas.md` links `../../../instructions/page-types/refusal.md`. Each is a cross-repo link into a document a later move may take.

The addressing already exists in the tree: `--repo` is a flag `write.ts`, `edit.ts` and `page-check.ts` all take.
