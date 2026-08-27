---
id: 05796cfc-b874-504b-af44-9c146bd41733
slug: quarantine-mentions-zero-unseen
page-type-slug: finding
title: "Quarantine mentions zero unseen"
domain-slug: domain/global
---

# Claim

The `[mentions]` arm of the instructions repo's `rm` door reports zero stranded mentions under quarantine when sibling quarantined documents still name the file being removed, because quarantine flattened the paths while the links inside those documents kept their original relative form. The gate counts "under quarantine" as its own category and reported 0 for it on two removals today where the true counts were 2 and 1.

# Evidence

Measured 2026-08-08 emptying two quarantined Tower documents, read off the gate's own stdout at each removal.

Removing `dirty/code/packages-alanwalton-tower-docs-loop-rules.md` (commit e586f43f2), the door printed `[mentions] pass — 1910 file(s) checked — 0 mention(s) would be stranded among the live documents, 0 under quarantine`. At that moment `dirty/code/packages-alanwalton-tower-docs-standing-context.md` named it twice: L15 `see [loop-rules.md](loop-rules.md) (internal); never restate or foreshadow it`, and L24 `Protect the held-dark mechanic — see [loop-rules.md](loop-rules.md) (internal)`. That file is untouched since the quarantine batch; `git log --oneline` on it returns only `ba5878d65`.

Removing `dirty/code/packages-alanwalton-tower-docs-helper-spawning.md` (commit 69542dbdc), the same door printed `0 mention(s) would be stranded among the live documents, 0 under quarantine` over 1912 files, while `dirty/code/packages-alanwalton-tower-claude.md:22` read `- **[Helper spawning](docs/helper-spawning.md)**`

The two surviving link forms differ, which points at the cause. Quarantine flattened `packages/alanwalton/tower/docs/loop-rules.md` to `dirty/code/packages-alanwalton-tower-docs-loop-rules.md`, and neither form resolves to that path: one is a bare sibling filename, the other the pre-quarantine relative path. A matcher keyed on the removed file's repo path sees neither.

Not established: whether the live-documents arm shares it. Both removals were of quarantined files, so only the quarantine arm met a known-nonzero population.

The dangling itself is expected — the ingest task says to leave `dirty/` siblings standing. What is reported is that the gate prints a specific zero for a category it names, so a zero from an arm that cannot see reads exactly like one from an arm that looked.

Distinct from `pages/finding/reference/no-check-measures-mention-state.finding.md`, opened before filing: it says nothing measures mention state AWAY from the `rm` door.
