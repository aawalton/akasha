---
id: 33ffef8b-7a7e-59de-947f-a5e7d8145bd0
page-type-slug: finding
title: "Ephemeral worktree distorts ast unused"
domain-slug: domain/ops-cli
---

# Claim

`ops worktree ephemeral` cannot validly measure `check-ast-unused`, and seats are routed to it precisely when they go to verify that check against main.

# Evidence

Measured by #19102's seat on 2026-08-14. Run through `ops worktree ephemeral` against `origin/main`, `check-ast-unused` reported 1,965 violations, including exports that are certainly live across `packages/agents/shared` and `packages/temper`. Run in a real checkout at the same SHA — `~/code` at `73c5174495`, which I ran myself — it exits 0 with zero unused exports over 13,631 modules.

THE CAUSE IS IN THE CHECK'S OWN HEADER. In the ephemeral tree it reports rooting 712 modules and resolving 261 outside this repository's own source; in a real checkout, 970 and 3. The instructions repository resolves its code reaches through `codeRoot()`, which is `$HOME/code` and not the ephemeral path, so most of the entry set it should be rooted from is read as foreign and the modules behind it look unreached.

THE DISTORTION IS ONE-WAY. It invents violations and cannot conceal one, so a zero from an ephemeral tree is still trustworthy and a non-zero from one establishes nothing at all. That asymmetry is what makes it dangerous rather than merely wrong: the reading is plausible, large, and points at real files.

WHY IT WILL FIRE. The prohibition on `git checkout` and `git stash` routes a seat to `ops worktree ephemeral` exactly when it wants to measure a check against main without disturbing the shared checkout — which is the case where this check is most often reached for, since a seat blocked by a red is trying to establish whether the red is main's or its own. The next seat sent to confirm a green tree will read it as catastrophically red, and the correct-looking act on that reading is to escalate a fleet-wide break that does not exist.

Two fleet-wide breaks on 2026-08-14 were each established by measuring in `~/code` rather than in a scratch tree. Had either been measured ephemerally the reading would have been unusable, and the noise would have been indistinguishable from the signal.
