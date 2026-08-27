---
id: dc8a925b-2cb5-5e09-b1fe-3b7bef7223c4
slug: check-md-anchors-oom-at-ci-default
page-type-slug: finding
title: "Check MD anchors oom at CI default"
domain-slug: page-type/pipeline
---

# Claim

`check-md-anchors`'s steady-state resident memory (measured 1.06 GiB by #16962, corroborated at ~1.25 GiB by #16959) sits at or over its CI step's default 1Gi memory limit, so an OOMKill like pipeline 26675's is the expected outcome of that margin rather than a flaky test or a fault in the branch it lands on — confirmed by same-corpus runs producing opposite pass/fail verdicts back to back.

# Evidence

From project #17042 (status `someday_maybe`, `live-on: deploy`, domain `pipeline`), captured and never defined — no objective was ever written.

The defect: `check-md-anchors` peaks at 1,115,220 kB (~1.06 GiB) resident, measured by #16962 with `/usr/bin/time -v` over the full corpus (22.9s, exit 0, 2941/2941 fragments resolved, 1884 tracked `.md`). Its CI limit is the engine default, `limits: { memory: "1Gi" }` from `workflow-dsl/src/dsl/types.ts:241`, no override declared. The check covers only this repo's tracked `.md`, matching what CI scans.

Footprint exceeds its own ceiling. Four passing runs (26666, 26670, 26672, 26677, exit 0 at one to two minutes) are the lucky ones; the OOMKill on pipeline 26675 is the expected outcome, not the anomaly.

Not a flaky test: it charges a red to a branch that did nothing wrong. On 26675, one of six failed steps (five exit 1, one exit 137); two triagers both blamed the branch. Falsified: `92343da` moved 165 lines across 6 files against 1884 tracked `.md` (~0.09%), too small to push 1.06 GiB over a limit unless the limit already sits within a megabyte of it.

Corroborating measurement from #16959's tree (2026-07-28), workstation RSS not pod: untouched origin/main 1,244,280 KB; #16959's branch 1,263,380 KB, both exit 0, +1.5% is noise against the 1 GiB gap. Nondeterminism from step rows: #26675 OOMKilled 15:59, #26682 OOMKilled 16:19, while #26669/70/71/72/73/77/79/80/83 completed, including #26683 one minute after 26682 failed — same code, same corpus, opposite verdicts. Filed by #16959's manager, handing over the measurement only.

A second carrier, different mechanism, observed 2026-07-29 unblocking #16964's manager, was cut at a paragraph boundary; only its head (the defect above) survives.

Still needed: the population of steps running near/over 1Gi, which decides the remedy; and whether to raise the limit or cut the footprint, turning on whether 1.06-1.25 GiB is reasonable for ~2941 fragments or the scanner holding the whole corpus at once.
