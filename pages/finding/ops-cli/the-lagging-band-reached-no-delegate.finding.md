---
id: abc9ca58-1906-5324-b002-b7e3bd113b4f
page-type-slug: finding
title: "The lagging band reached no delegate"
domain-slug: domain/ops-cli
---

# Claim

The `lagging` cost band was left out of the brief the command review's delegates work from, so no verb on the reviewed surface carries it and the five-to-fifteen second runs were rounded into the bands either side.

# Evidence

Measured 2026-08-15, running `review-command`, caught by a delegate reading `domains/run-cost-lagging.md` on its own initiative rather than by anything in the walk.

Seven bands stand as declared domains: `domains/run-cost-instant.md` a second, `run-cost-fast.md` five seconds, `run-cost-lagging.md` fifteen seconds, `run-cost-slow.md` a minute, `run-cost-painful.md` five minutes, `run-cost-torture.md` fifteen minutes, `run-cost-eternal.md` longer.

The brief every delegate worked from listed six, omitting `lagging`.

Counted across `domains/commands/*.md` at the moment the gap was found: 61 `instant`, 42 `fast`, 23 `slow`, 9 `eternal`, 4 `painful`, 3 `torture`, and **zero `lagging`**. A band with no members across 142 verbs is what an unreachable vocabulary looks like.

The 23 standing at `slow` are the set at risk, because a delegate measuring eight seconds with no `lagging` available had `fast` and `slow` to choose between and `slow` is the truthful-sounding one. Some are certainly right: `ops audit rule-population` measured 30.4s, `ops migration list` 20.6s, and the six `ops graph` verbs were measured at 38.5s under `--granularity file`. Those are the ones with a timing recorded in a handback.

`domains/run-cost.md` carries two further binds the brief also never passed on: a run waiting on something outside the machine costs the time it waited rather than the CPU, and a first run against an empty cache is measured one band looser than the band it holds. The second one bears directly on `ops audit rule-population`, whose default invocation rebuilds its cache every time, so whether it is `slow` or one band looser turns on a reading of that line.

The brief now carries all seven, and the four delegates running when this was found were sent the list mid-run.

Not measured: which of the 23 `slow` verbs were timed between five and fifteen seconds. Only the handbacks that recorded a number can be re-read, and most bands were reported as a band rather than as a measurement.
