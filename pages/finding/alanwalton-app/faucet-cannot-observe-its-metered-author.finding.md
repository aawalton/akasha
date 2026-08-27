---
id: caa03297-2b88-508f-bbd2-a40093b5fb0c
page-type-slug: finding
title: "Faucet cannot observe its metered author"
domain-slug: domain/alanwalton-app
---

# Claim

Lali's writing faucet meters "net markdown bytes Alan adds" and cannot observe the author. `net-bytes-points.ts` carries no author predicate, and every commit in the books repo is authored `Alan Walton` — agent commits included — so a line an agent writes credits identically to a line Alan writes. The metered subject is the one thing the mechanism cannot read, and nothing reports it: the number returned is a real byte count, of a different quantity than the one it is described as.

# Evidence

Measured 2026-08-07 against `~/code`, `~/books` and the live database, while emptying `dirty/skills/mathematics/SKILL.md`, whose item 8 names the same gap and is queued for removal.

The stated subject. Lali's `persona` row in `public.pages` carries an `earningNarrative` reading "The metered act is **net markdown bytes Alan adds under `packages/books/my-math/`** (added minus removed, per commit) — bytes for trying and writing, never 'problems solved.'" Read through `ops db psql`.

The mechanism has no author predicate. `rg -n "author|--author|user.name|Alan"` over `packages/alanwalton/daily-tracking/src/net-bytes-points.ts` returns nothing, exit 1. Its header describes the scan as `git log -p` scoped to the prefix's pathspecs, streamed through a per-commit byte accumulator. Bytes are attributed to a path and a day, never to a person.

Nothing else supplies the distinction. `git config user.name` returns `Alan Walton` in `~/instructions`, `~/code` and `~/books` alike, `user.email` `aawalton@gmail.com`. Every agent commits under that identity.

The metered history is almost all agent work and reads as his. `git log --numstat -- my-math` in `~/books` returns eight commits, all authored `Alan Walton`. Two on 2026-06-27 created the book, `af828c8` adding 39 lines of `my-math/CLAUDE.md` and 5 of `000-beginnings.md`, `70a6796` adding 4 more. The six since carry project numbers and are harness maintenance — delinking, frontmatter retirement, citation rewording — ending at `f7bad60`, which removed all 38 remaining lines of that `CLAUDE.md`. Alan's own writing in the metered tree is nine lines.

Unmeasured. The row's `totalPoints` is 2310 and did not fall across that deletion; why is not established here. Two mechanisms could account for it and I read neither: the row's `pointsPathPrefix` is `packages/books/my-math/`, which holds no markdown in `~/code`, and `chess/faucet-zero-is-unreadable.md` reports that `decideTotalPointsWrite` high-waters the total.
