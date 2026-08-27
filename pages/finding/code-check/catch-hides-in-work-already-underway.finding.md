---
id: 89206bcc-1642-5917-bea5-9a903df7f88e
slug: catch-hides-in-work-already-underway
page-type-slug: finding
title: "Catch hides in work already underway"
domain-slug: domain/global
---

# Claim

A catch is invisible to a sweep built on commit messages when clearing it is indistinguishable from the work the author was already doing. The fix goes inside the commit in flight and the subject describes that work, so a gate that fired reads identically to one that never has. `f725fea5a5` cleared two checks at once — one by byte-exact regeneration, one by four hand-typed lines of prose — and names neither.

# Evidence

Measured 2026-08-08 against `~/code` at `4799485a23`, by replaying gates against trees extracted at each suspect commit.

`f725fea5a5` is the controlled case. It cleared `check-liveness-census` by a regeneration reproducing the landed baseline byte for byte, and `check-cli-help-flag-references` by four hand-typed lines in `agent/stop.ts`. Remedy shape varied, visibility did not. The invisibility is a property of the commit rather than of the remedy or the check.

Instances found, each cleared under a subject naming nothing a sweep could match:

- `check-tstl-plugin-emit-fresh` — `--write` run, output landed inside unrelated work. Red on main 52 minutes.
- `check-app-capacitor-parity` — four, each a one-line divergence entry inside a batch of CI findings. This check has no write mode at all.
- `check-cli-help-flag-references` — two. One was an eight-line `--tree`-to-`--repo` rename inside a ten-file vocabulary sweep, red on main about two days.
- `check-liveness-census` — six, all regenerations.
- `check-liveness-subject` — four.

Availability of a remedy does not predict it. `check-app-capacitor-parity` and `check-cli-help-flag-references` both lack a usable one and both went invisible, because the fix was work the author was doing anyway.

The one case that came out documented is the one where clearing required reasoning belonging to no surrounding task. `check-liveness-routing` refused two new bypasses, its ratchet being shrink-only, so the author had to establish why the gate was wrong and edit `DECIDER_MODULES` in the check's own source. The clearing commit `df84630103` names the check, the constant and the distinction. That check's docblock states the design: shrink-only exists "so the regenerate-and-commit escape that would make this advisory does not exist".

Counts are floors. `check-liveness-census`'s six comes from 31 interval endpoints rather than 1,858 opportunities, and four intervals stayed red past a twelve-step backward walk, so their first red is bounded rather than pinned.
