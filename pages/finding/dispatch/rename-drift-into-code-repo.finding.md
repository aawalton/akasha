---
id: 6ad5179c-4f26-5e87-8f5e-3ea51b3b24bf
page-type-slug: finding
title: "Rename drift into code repo"
domain-slug: domain/dispatch
---

# Claim

Project #17347 found that #17314's dispatch-family rename (`project`→`manage`, `worker`→`deliver`) and persona-self-claim retirement, corrected everywhere in `~/instructions`, left three code-repo prescriptive spots (`project-page-claim.ts:85`, `packages/agents/shared/CLAUDE.md:45`, `packages/agents/CLAUDE.md:33`) still stating the false claims, plus a fourth specimen where shipped CLI help still describes the retired `pull-queue` kind.

# Evidence

Project #17347, domain `dispatch`, status someday_maybe, live-on deploy.

Problem: `#17314` renamed the dispatch families (`project`→`manage`, `worker`→`deliver`) and retired the persona self-claim boot step, fixed across `~/instructions`. Three code-repo passages still carry the false claims (one contradicts its package sibling). Cause: the check's criteria named instructions only — the repos run on different clocks (instructions on commit, code on deploy).

Specimens, main 2026-07-30: (1) `packages/alanwalton/projects/cli/src/lib/project-page-claim.ts:85` claims handle `project-{seq}`/`worker-{seq}`; decider confers `manage-{seq}`/`deliver-{seq}`, checked against sibling `CLAUDE.md` and `decide-claim-rename.ts`'s docblock, both disagreeing. (2) `packages/agents/shared/CLAUDE.md:45` claims `name` stays `project-{seq}`; live post-rename claim is `manage-17314`. (3) `packages/agents/CLAUDE.md:33` still prescribes the self-claim boot step; its steal clause ("re-claim from any prior holder is expected, not an error") contradicts landed skills ("re-assert exits 1").

Why nothing caught it: `bun ops instructions verify` covers `~/instructions` only; CI checks code not prose.

Success criteria: (1) three passages checked against the deciding module; (2) `project-page-claim.ts`/`CLAUDE.md` agree, shown by one command's output; (3) `CLAUDE.md:33` sentence gone, steal clause fixed, verified via `bun ops seat set-name --help`; (4) search for the retired handle pair returns zero, positive-controlled, distinct from `parseReapableRunnerSeq`/`pipeline-worker-<seq>`; (5) whether a mechanical check can hold (4) is explored, not asserted from one search.

Fourth specimen (2026-07-30T12:30:20.637Z): `bun ops instructions write --help | grep -n queue` still names `pull-queue` in a length rule; retired by `#17317` (kind list went seven to six) — help names a kind gone.

Capture stopped mid-paragraph; above is its head. Moved off the row's `notes` attribute on 2026-08-15.
