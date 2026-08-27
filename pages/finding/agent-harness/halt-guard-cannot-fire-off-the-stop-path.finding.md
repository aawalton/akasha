---
id: 7b245264-8361-5d9c-88a6-10a44df99f21
slug: halt-guard-cannot-fire-off-the-stop-path
page-type-slug: finding
title: "Halt guard cannot fire off the stop path"
domain-slug: domain/agent-harness
---

# Claim

Against Negative Control, which asks that an instrument be made to fail before it is trusted. A headless seat whose turn ends without traversing the stop path is left live, unfinished and unguarded, and no instrument names it. The halt guard is a Stop hook, so it cannot fire for such a turn; the fleet's wedge count reports zero while such a seat stands; and the halt census reports `unestablished`, which reads the same as healthy.

# Evidence

One seat measured on 2026-08-17: `claude-file-length-developer-build-child-deploy-19319`, agent `01a00fdd-e440-7342-a9e7-d9077e34ac65`. `ops seat held-wake` returns `own-act-next` with `allowsStop: false`; `ops seat outbound-wake` returns `verdict: none`, `allowsStopAlone: false`, `liveChildren: 0`, `openQuestions: 0`, `outbound: none-sent`. So its own act is next, nothing is owed to it, and it left nothing that will call it back. Its last transcript text is an announced act never performed. It reads `active: false` at a 15-minute window and `active: true` at 90 minutes.

The guard's logic is sound. Run by hand with that seat's `AGENT_ID` and `DECISIONS` pointed at scratch, `tools/hooks/inference-hook-block-headless-halt.inference-hook.code.attachment.ts` exits 2 and records `decision: block`, `reason: dispatch-unfinished`, `mode: headless`, `wake: none`. It would have caught this turn had it run.

It did not run. That agent id appears zero times across all four daily files under `~/agents/hook-decisions`, while 381 decisions were recorded on 2026-08-17 alone, 67 of them `headless`. `ops seat exits` records nothing for the seat, and `ops seat alive` returns `live`. So the process stands, the turn ended, and no stop path was traversed.

`ops seat active` reports `wedged: 0` at 15, 45 and 90 minute windows while this seat stands, and classifies it `io: advancing`. Its help states WEDGED uses a fixed 45-minute window; that window was not observable from outside. The verdict at `tools/lib/decide-revive-io-verify.ts:20` is revive-relative and monotonic: once a seat writes anything after its revive it reads `advancing` however long it is then silent. The count actually reported came from `agent-wedge-roster`, which stood in the code repository and is in no tree now, so the live classifier was not read here.

The halt guard is registered under `Stop` alone — the chain opens at `settings/agents.json:262` and its entry stands at line 272 — and `tools/gates/` holds one gate, `relations-resolve.ts`, so no check covers the Stop hook.

Not measured: why this turn ended off the stop path, and whether any classifier now carries the documented window. The five `ops seat` verbs the readings above were taken with — `held-wake`, `outbound-wake`, `exits`, `alive`, `active` — no longer stand, so those readings cannot be retaken as written.
