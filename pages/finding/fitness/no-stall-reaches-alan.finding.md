---
id: fd1d3837-dd2d-5853-b91f-86a753a3b129
page-type-slug: finding
title: "No stall reaches Alan"
domain-slug: domain/fitness
---

# Claim

Nothing reports a training stall to Alan: push was last trained 39 days ago and pull 35, and the only staleness check the domain has fires while a workout is being designed, so a gap in training is what silences it.

# Evidence

Measured 2026-08-07, while ingesting a quarantined document that reported this against a 6am ritual which has since been removed. The removal did not close the gap; it took away the one daily surface that ran at all.

`ops exercise digest` today prints, under `# last trained by focus`:

    push  2026-06-29
    pull  2026-07-03
    legs  2026-07-29

That is 39, 35 and 9 days. The digest reports it only when someone runs the digest.

Nothing is wired to notice. `systemctl --user list-timers --all` matches no unit on `exercise`, `fitness`, `aelwyn` or `stall`. Across `ops exercise --help` no verb names staleness, reminding or nudging. The single verb in the estate whose name carries "stall" is `ops tracking hourly-confirm-stall`, and its own help scopes it away from this twice over: it concerns the hourly confirmation stream rather than training, and it says it "files a record for Amy … never reaches Alan".

The one instrument the domain does have runs inside workout design — the quarantined source states it as Aelwyn's conduct, *"when a comparable focus-day is more than two weeks stale, or three comparable sessions sit at unchanged weight, I say so and propose the bump."* Designing a session is what invokes it, so no session means no design means no check. The trigger is a subset of the behaviour whose absence it exists to catch.

The 6am ritual the source named as the daily wake is gone. `ops tracking --help` lists no `morning` or `ritual` subcommand, and `rg -in "morning.ritual|morningRitual|morning_ritual"` across `~/code` outside `dist` and `node_modules` returns three coincidental `queue-staleness-core` test fixtures and nothing else.

Not established: whether the removal was meant to be replaced, and whether Alan considers these gaps a stall or a deliberate rest.
