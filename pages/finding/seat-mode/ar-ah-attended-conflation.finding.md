---
id: 0322ccb4-2820-5c47-97e3-a1a887643028
page-type-slug: finding
title: "Ar ah attended conflation"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17282 (domain: seat-mode) found the single boolean `ParsedArgs.headless` conflates three properties (mechanical detachment, human attendance, model tier) and is spelled three inconsistent ways (`AGENT_HEADLESS`, write-once `sessionKind`, `spawn-state.json`), so an interactive-unattended seat holding an unanswered question is caught by none of twelve traced detectors, though the correct attended value already exists as `wantsRc`.

# Evidence

Project #17282 (domain: seat-mode, status: someday_maybe, live-on: deploy); never defined, moved off the retired `notes` attribute on 2026-08-15.

Alan's directive (2026-07-29, interactive, to athena-intake): two shell commands. `ar {name}` resumes in the FOREGROUND (exists). `ah {name}` stops an interaction session, resumes it in the BACKGROUND (new), switching cleanly without disrupting background jobs/subagents. Alan chose architecture (c): session ALWAYS runs detached behind its pty; `ar` attaches a viewer rather than relaunching.

Problem: `ParsedArgs.headless` is the sole input to three properties — mechanical (log output, no stdin, detached), human (attended, in-band), tier (model budget) — spelled three drifting ways: `AGENT_HEADLESS` env (per-process), `sessionKind` row (write-once, no update path), `spawn-state.json` presence. Relaunch updates the env; row never changes.

Cost: an interactive seat ending a turn holding an unanswered question is caught by nothing. Twelve detectors traced all abstain: `block-headless-halt.sh:197`, `halt-census-core.ts:300`, `silent-resumes.ts:47`, three reapers, wake-watcher, `attention-scan` (resolution-only since #16441); `ops seat active` is a pull, no alert.

Exemption comment ("a human reads its output and supplies its next turn") is false both directions: lead seats are interactive-unattended whenever Alan sleeps; resident personas are headless and attended. The attended value already exists: `supervisor-remote-control-default.ts:4` resolves `wantsRc` as interactive-session OR headless-persona, emitting `ANTHROPIC_UNIX_SOCKET`, inherited as `AGENT_HEADLESS` is.

Class, two landed fixes (#16266 non-nullable field, reintroduced gate fails typecheck; #15495 removed gate from `persona-last-messaged-hook.sh`); remaining: halt hook, halt census, `silent-resumes`, `decideBootResume`, `planCompactResumeDriver`, self-stop wiring, re-auth gate, tier `CLAUDE_CODE_SUBAGENT_MODEL`. Children: #17283-#17289.
