---
id: 95d46f4c-444d-5742-b0ec-8e1aa0d368df
slug: ephemeral-worktree-manufactures-violations
page-type-slug: finding
title: "Ephemeral worktree manufactures violations"
domain-slug: domain/global
---

# Claim

`check-ast-unused` run through `ops worktree ephemeral` reports violations that are not there. Against deployed main it reported 1940 unused exports where a real checkout and staging CI at the same SHA both certify zero. The ephemeral tree reads a short workspace list and borrows `node_modules` from elsewhere, so exports that are referenced look unreferenced. Nothing in the output says the reading is degraded.

# Evidence

Found by #19212 and flagged rather than chased. The same SHA answers three ways: staging CI completed at 0, a real checkout certifies with zero unused exports, and the ephemeral worktree reports 1940.

The mechanism is a short population. The ephemeral tree read 376 workspaces where a real checkout reads 378, and its `node_modules` is borrowed rather than installed for that tree. An export whose only reference stands in a workspace the run cannot see reads as unreferenced, and the checker has no way to tell that from an export nothing uses.

Why this is worse than a wrong number. The checker's whole value is that it can fail — a green it could not have earned says nothing. Here the failure direction is inverted: it produces a red that could not have been green, and a red is what an agent acts on. 1940 violations is a plausible-looking backlog, not an obvious absurdity, and an agent meeting it has every reason to start working through them. The cost is a whole seat spent chasing exports that are fine.

The cheap cure is the one `ops graph off-workstation` already carries: say when the reading is incomplete. That verb states a degraded line and a `degradedRootClasses` field precisely so a partial population reads as partial rather than as an answer. A check run against a tree it cannot fully see should refuse rather than accuse — which is what `check-ast-unused` already does when its entry set stops at a repository boundary, so the posture exists in this checker and simply does not reach this case.
