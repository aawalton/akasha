---
id: 775743a1-407d-52e7-818a-5ff152917d90
slug: custody-passover-leaves-no-notice
page-type-slug: finding
title: "Custody passover leaves no notice"
domain-slug: domain/global
---

# Claim

A headless seat whose row is held in another layer's custody is not woken by the compact-resume driver and leaves no deferred notice saying so, which is the state the driver's own live acceptance test calls a stalled seat. The row is silent about why it was passed over, so the seat and everyone reading after it see a wake that simply did not happen.

# Evidence

Found while verifying #18082, which touched none of this.

`packages/agents/supervisor/src/supervisor-compact-resume.integration.test.ts` fails reproducibly at `337811e7a6`, run twice — once inside the whole supervisor suite (973 pass, 1 fail over 88 files) and once alone (1 pass, 1 fail). The failing assertion is line 240, `expect(held).not.toBeNull()` on the value `readDeferredNotice(agentId)` returns, and it receives `null`. The test's own comment beside it reads: "On the untouched base this marker is absent, which is the state a stalled seat is in — so the assertion that fails there is this one." The first of the file's two tests, which asserts the same slot is null earlier in the run, passes.

The machinery it reaches for exists. `packages/agents/shared/db-deferred-notices.ts` carries `mergeDeferredNotice` and `claimDeferredNotices`, and `db-messages-write.ts` drains the slot on the next real inbound. What is missing is the write on this path — the driver deciding not to wake a seat in another layer's custody and recording that decision.

NOT ATTRIBUTABLE TO #18082. The file is not among that commit's seventeen, and its imports — `@agents/shared/agent-resume-record`, `@agents/shared/db`, `@shared/pages-access`, `@shared/supabase-auth`, `@shared/supabase-server`, `./supervisor-resume-notices` — reach nothing it renamed.

WHAT I DID NOT MEASURE. I did not establish when this started failing, and did not run it against an earlier tree. I could not check whether CI runs this file or what it reports there: `gh` is refused to this seat, and I found no workflow definitions under the code repo's root. So a green main pipeline and this local red are not yet reconciled, and one of the two readings is incomplete rather than one of them being wrong.

NOT A SECOND DEFECT: `packages/agents/shared/project-binding.unit.test.ts` also reported a failure in the same sweep, at exactly 5000.07ms, and passes 36 of 36 in 13.79s under a 60s timeout — a slow live-corpus test meeting the default bound.
