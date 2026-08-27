---
id: 3c2307f1-39b6-5cef-9456-98456dcc5158
page-type-slug: finding
title: "Generated files do not round trip"
domain-slug: domain/global
---

# Claim

Six committed `*.generated.ts` files do not round-trip through the emitters that name them: re-running rewrites five of six metrics files and `companion-metrics.generated.ts`. So a check that certifies a file's provenance claim as well-formed is certifying a claim that is false for those members — the header says an emitter wrote this, and what the emitter writes today is not what stands.

# Evidence

Routed by #18476 while widening `check-generated-suffix` and explicitly not settled there: which side is right is a call about those packages, not about the check.

WHAT WAS MEASURED. Both emitters were executed, each wrote only `.generated.ts` paths, and the worktree was restored to HEAD after each. Re-running rewrites 5 of the 6 metrics files and `companion-metrics.generated.ts`. The two `*metric-ids.generated.ts` round-trip byte-identical, so the emitters are not simply non-deterministic. On the companion side the difference is import style — package-absolute emitted, relative committed — plus ordering. Both sides stand on `main`, so this is not the branch's.

WHY IT BELONGS TO THIS INITIATIVE RATHER THAN TO THOSE PACKAGES. `check-generated-suffix` judges whether a provenance claim is well FORMED — a machine-agency word against a production participle — and after #18476 it does that over the whole opening comment across 14,304 source files, green. What no check anywhere judges is whether the claim is TRUE: that the emitter named would produce the bytes committed. So a file can carry a correct-looking header, pass the gate that exists for headers, and be something no emitter would write. The gate's own success line is honest about what it measured; nothing measures the other half.

WHAT MAKES IT WORTH A ROW RATHER THAN A SHRUG. A reader who sees `.generated.ts` does not edit the file, they edit the emitter — that is the whole point of the suffix. Where the committed bytes and the emitter have diverged, editing the emitter silently drops whatever the committed file gained in between, and re-running is the act most likely to do it. The suffix is a promise to the next reader, and for six files it is not kept.

Adjacent and already repaired at `3b072ac5ee`: `generate-metrics.script.ts` wrote `METRIC_IDS_FILE` to a directory that does not exist, so it could not have written where its importers read.

Not measured: whether other emitters round-trip. Two were run because one project reached them.
