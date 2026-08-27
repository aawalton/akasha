---
id: b354c9ba-1922-5fbe-a706-f8b529e6f0d7
slug: limit-death-predicate-names-its-own-verdict
page-type-slug: finding
title: "Limit death predicate names its own verdict"
domain-slug: domain/agent-harness
---

# Claim

`classifyRateLimitDeath` spells its own verdict inside the effects module: it answers "is this a rate-limit death" from `apiErrorStatus === 429` rather than handing the last assistant message to a rule of its own. An auth-refused turn end therefore never reaches `decide-limit-resume.ts`, and the seat is left idle with nothing reporting it. This is `harness-in-instructions` objective four, and the domains it needs on this side now stand.

# Evidence

The predicate is `tools/lib/supervisor-limit-resume-effects.ts:19`, with a second copy of the same line at `tools/lib/session-jsonl.ts:45`, and its consumer gates on it at `tools/lib/supervisor-limit-resume.ts:73`, which returns before ever reaching `decideLimitResume` at `tools/lib/decide-limit-resume.ts:21`. That consumer's own header describes the symptom in general terms — a seat that "sits alive-but-idle in the TUI showing the limit banner and does nothing further" — while its gate admits one cause.

Measured on this workstation: seats `019fecc9` and `019feccb` both ended a turn on `error: authentication_failed`, at 2026-08-10T17:55:40.191Z and 17:55:38.735Z, with `model: "<synthetic>"` and the text "Login expired · Please run /login". Neither appears in the halt guard's decision log, which held 3223 invocations across the fleet over the following 72 hours, and neither transcript carries a `stop_hook_summary` record. Both seats were still resident 46 hours later.

The seam is already fast in one direction: `tools/lib/supervisor-limit-resume.ts:23` ticks at `LIMIT_RESUME_INTERVAL_MS = 30_000` and reaches this repository by spawning the `supervisor-decide` verb as a subprocess, which reads the decider fresh on every call. So once the predicate hands the message over, what counts as an error turn end and what follows from each kind is decided here and live within thirty seconds of a commit, with no restart.

The definitions this needs are landed: `seat-turn-end-error` with `-auth` and `-limit`, `seat-turn-end-approval` and `seat-turn-end-refusal`, and `claude-account` with `-eligibility` and `-selection`. `claude-account-eligibility` carries the distinction the auth arm turns on — some unusable accounts have a time they will work again, others need a person — and `agent.md`'s Auto-Relaunch rule settles that the second is reported rather than resumed.
