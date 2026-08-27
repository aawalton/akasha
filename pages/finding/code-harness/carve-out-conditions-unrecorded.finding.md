---
id: 4bc16d59-fa71-5706-b82b-491a2de940fe
slug: carve-out-conditions-unrecorded
page-type-slug: finding
title: "Carve out conditions unrecorded"
domain-slug: domain/global
---

# Claim

A documented carve-out in the repo records the decision to exempt something from a rule but never records the condition that justified the exemption, so a live carve-out and a silently expired one are indistinguishable without re-deriving the original reasoning from scratch — as happened with the `all_characters` exception in `packages/temper/player/completion/addon/src/ui/CLAUDE.md`, which #15972's worker judged expired and widened.

# Evidence

Project #15999 (domain `code-harness`). Carried no objective — captured but never defined; moved off the row's retired `notes` attribute on 2026-08-15.

Origin: #15872 Temper M1 sweep. Not Temper-specific — about every carve-out in the repo.

The category: two shapes already known for a rule beside unconverted call sites — (a) adoption gap; (b) the narrowness was correct. #15972 produced a third: an exception once correct that silently expired.

Worked instance: `.../addon/src/ui/CLAUDE.md` forbade the local cross-character walk by name, under `next_character`, carrying an explicit `all_characters` exception. The condition justifying the carve-out no longer held and nothing recorded it. #15972's worker judged it expired and widened the bullet to all scopes.

Why structurally invisible, the whole finding: a carve-out records the decision and never the condition, so live and dead exceptions are indistinguishable without re-deriving the reasoning — and nobody re-derives a documented exception, since it reads as settled.

Operational test proposed (ember's): not "is this exception justified?" but "is the condition still true, and is it written down anywhere?" Almost none of the repo's carve-outs record the condition.

Population to audit (source-reasoned, not counted): `ast-unused` pragmas, `biome-ignore`, file-length allowlist entries, the repo-wide-scanner allowlist, documented exceptions in `CLAUDE.md`/`.claude/docs/`, tsconfig excludes/check skips.

Noted: suppression pragmas are Dalla-gated, requiring a stated reason — but a reason is not a condition; it records why added, not what would make it removable.

Fix framed as constructional: require carve-outs to carry a machine-checkable expiry condition where one exists; where none can be expressed, that absence is itself the finding.

Related: #15991 (domain `rule`), this row's sibling — that asks whether a rule's boundary was ever justified, this whether an exception's justification still holds.
