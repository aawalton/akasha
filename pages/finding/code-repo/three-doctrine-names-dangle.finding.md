---
id: e64b234c-f155-5948-9e61-60cc52658253
page-type-slug: finding
title: "Three doctrine names dangle"
domain-slug: repo/code-repo
---

# Claim

Three more doctrine names cited in prose across 60 tracked files resolve to no document in either
repository — part of what `pages/finding/code-repo/doctrine-names-cited-without-paths.finding.md` called a floor
nothing had measured. One of the three is load-bearing on arithmetic rather than on tone: a
per-commit points floor holds only while a cited mandate is kept, and the surface stating that
mandate exists nowhere a reader can reach, so the reasoning reads as though it justified itself.

# Evidence

Read and run 2026-08-07 against `~/code` at `main` `1313565199`, and the instructions repo at `main`.

**Consume on Demand** — 53 tracked files, across three spellings: 37 `Consume on Demand`, 13
`Consume-on-Demand`, 3 `consume-on-demand`. The named exemplars still carry it:
`packages/agents/main-pipeline-alert/src/main-pipeline-alert.worker.ts:32` calls itself "the
Consume-on-Demand doctrine's named exemplar"; `packages/agents/supervisor/src/
supervisor-proxy-version.ts:150` and `.../wake-watcher-config.ts:27` justify their own shape by it.
No path spelling survives — `git grep "consume-on-demand.md"` returns nothing — and the repo-root
`CLAUDE.md` that routed every agent to it is not tracked at all.

**no-as-assertions** — six `web/server.ts` files carry the same sentence, that the dynamic import is
narrowed "per the no-as-assertions rule's brand-constructor exemption": `atlas` `:55`, `alanwalton`
`:53`, `archive-of-worlds` `:53`, `audhdalan` `:54`, `smilingjenny` `:54`, `temper` `:53`. The slug
is the whole citation and names no file in either tree. The comments also name the wrong enforcer —
the gate is `check-type-assertions`.

**ali-recorder / ali-archivist skills** — `packages/alanwalton/daily-tracking/src/
net-bytes-points.ts:192-193` explains the per-commit floor with "distinct commits are required for
this to hold (see the ali-recorder / ali-archivist skills, which commit separately by mandate)".
`git ls-files` finds no `SKILL.md` anywhere in the repo, and there is no `~/.claude/skills`
directory. Both names exist as personas — `persona-capture-helpers-spec.unit.test.ts:84` resolves
`byName("ali-archivist")` — but the commit-separation mandate is stated in no reachable document.

Nothing resolves on the other side. `grep` over `domains/` finds none of the three names, and no
`principles/` tree exists in the instructions repo.

Found while ingesting `dirty/questions/code-repo-pathless-citations.md`, which raised all three. That
file is quarantined and queued for removal.
