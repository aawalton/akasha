---
id: fcd325cd-8032-5e0e-9c1d-1caec9b40a46
slug: cli-suites-run-on-the-default-clock
page-type-slug: finding
title: "CLI suites run on the default clock"
domain-slug: domain/global
---

# Claim

212 of the 216 `*.cli.test.ts` suites declare no timeout and so run on bun's 5-second default, while every one of them pays a subprocess spawn. On an idle workstation a spawn costs about 295ms, so the default holds until the machine runs some 17x slower — which a workstation running a fleet reaches. Two suites have been seen crossing it. The declaration convention already exists in the other four.

# Evidence

COUNTED AT ~/code HEAD `47a2a573e4`. `git ls-files "*.cli.test.ts"` returns 216. Four contain `TIMEOUT_MS` or `timeout:`: `agent/reap.cli.test.ts`, `projects/cli/src/project/list.cli.test.ts`, `git/cli/src/worktree/ephemeral.cli.test.ts`, `graph/producers/src/cli/producer.cli.test.ts`.

THE HEADROOM. `bun test packages/alanwalton/projects/cli/src/project/claim.cli.test.ts` on this workstation: 5 pass, 0 fail, 1474ms total — about 295ms a spawn against a 5000ms cap.

TWO OBSERVED CROSSINGS, both at the cap rather than on an assertion:

- `packages/infra/loki/cli/src/loki/logs.cli.test.ts`, case `typo --pdo → suggests --pod`, "timed out after 5000ms" — measured by me on 2026-08-07 with a bare `bun test`.
- `packages/alanwalton/projects/cli/src/project/claim.cli.test.ts`, case `missing --seq → exit 1, stderr names --seq`, at 5001.99ms beside `killed 1 dangling process` — reported by #16766, over three runs of the same unmodified checkout returning 2 fail, 0 fail, 1 fail across ~1254 tests.

THE REMEDY SHAPE IS NEXT DOOR. `list.cli.test.ts:139` declares `CAPPED_QUERY_TIMEOUT_MS = 60_000`, its comment naming the cost as "past bun's 5s default". `claim.cli.test.ts` in the same directory declares nothing.

RELATED AND DISTINCT. `pages/finding/tests/gate-holds-slow-suites-to-a-sixth-of-the-sweeps-clock.finding.md` is the same 5s default seen from the lane: the branch gate keeps it while the sweep threads 30_000ms. This is the per-file exposure rather than the lane disparity.

MY FIRST COUNT LIED. `git ls-files "*.cli.test.ts" | xargs rg -l "TIMEOUT_MS|timeout:"` returned 0, which I nearly recorded. A direct per-file loop returns 4.

NOT MEASURED. How many of the 216 spawn expensively enough to be at risk — spawn cost is not uniform — and how often this workstation is loaded enough to close 17x.
