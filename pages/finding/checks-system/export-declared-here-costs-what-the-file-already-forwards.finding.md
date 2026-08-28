---
id: c430abe9-ce65-5928-85a5-d5d4ac8e4ba5
page-type-slug: finding
slug: export-declared-here-costs-what-the-file-already-forwards
title: "What export-declared-here costs a change is set by the file it lands on, not by the change"
domain-slug: domain/checks-system
---

# Claim

`export-declared-here` judges a changed file whole, and that one behaviour has two opposite effects. On a barrel it is a tripwire with no repair path, which is what `export-declared-here-refuses-lines-a-patch-never-touched` records. On a file carrying one stale forwarding export it is the opposite: the refusal names a dead line, deleting the line is the whole fix, and the file comes out cleaner than the change alone would have left it. Which one a change meets is decided by how much forwarding the file already held, before the author arrived and independent of what they came to do. Only the tripwire half is currently written down, so the check reads as a gate that refuses the wrong thing rather than one whose cost is predictable from its target.

# Evidence

Read and run in the tree on 2026-08-28.

**The refusal.** A one-line transport change to `tools/lib/daily-tracking/points-source-engine.ts:266`, repointing a dead-origin asker to an in-process one, was refused by `export-declared-here` naming `SOURCE_POINTS_FIELD` at `:21` — a line the patch never touched. That is the complaint finding's mechanism exactly, met on an ordinary change with nothing to do with exports.

**The line was dead.** `SOURCE_POINTS_FIELD` is declared at `alan/persona/closeness/closeness.ts:83` and forwarded to the daily-tracking files through `tools/lib/daily-tracking/tracking-modules.ts:15`. Nothing took it from `points-source-engine.ts`: `session-points-totals.ts:7` imports it from `./tracking-modules.ts`, and `write-daily-points.ts:9` declares its own local `const` of the same name. Checked by ripgrep over the tree with `dist` excluded — the re-export at `:21` had no consumer anywhere.

**The cost was one deletion.** `git show 5d762fac6^:tools/lib/daily-tracking/points-source-engine.ts` shows one forwarding export against ten exports declared in the file. Removing the single dead line cleared the check, and the change landed at `5d762fac6`. The gate cost one round trip and removed a re-export nobody was reading.

**The same refusal on a barrel is not one deletion.** `pages/finding/checks-system/export-declared-here-refuses-lines-a-patch-never-touched.finding.md:15` records an audit of 843 failures over the tree, with `shared/design-system/src/index.ts` at 144, `shared/design-patterns/src/index.ts` at 50 and `tools/lib/daily-tracking/tracking-modules.ts` at 14. `pages/initiative/astra-pages-system-ablation.initiative.md:50` records that for a barrel there is no repair path at all, only deletion, and that deleting one can silently disarm tests that mock it through the re-export chain. Not re-measured here: those counts are taken from those pages, read the same day, rather than from an audit I ran myself. What I verified firsthand is the single-forwarding case above.

So the check's cost is a property of its target: proportional to the forwarding already standing in the file, and unrelated to the size or subject of the change. That is what makes it feel arbitrary to an author, and it is also what makes it predictable in advance — the audit already names which files are traps. `pages/finding/checks-system/eight-of-nine-patch-checks-can-be-woken.finding.md:23` separately establishes that the check does not judge a genuinely undeclared export at all, only forwarding, so neither effect here is the one its Definition claims.
