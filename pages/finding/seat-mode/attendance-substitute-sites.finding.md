---
id: 279c00eb-59ee-5385-aafb-ec82c7ace8f2
page-type-slug: finding
title: "Attendance substitute sites"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17287 (domain: seat-mode) found seven code sites using interactive-vs-headless as a stand-in for whether a human is attending a seat — six should read the attendance axis instead and one (`alert.ts:35`) is correctly mechanical and must be left alone — with `planCompactResumeDriver` naming a live defect: a `cr`/`ar`-resumed seat nobody is watching gets no driver and silently idles, on a command Alan already uses.

# Evidence

Project #17287 (domain: seat-mode, status: someday_maybe, live-on: deploy); never defined, moved off retired `notes` on 2026-08-15. This is where the parent's cost is paid — the sweep of code sites using interactive/headless as a stand-in for attendance.

Sites verified at source: `block-headless-halt.sh:197` (only BLOCKING Stop hook; interactive exempt before any wake test; comment: "exempt... because a human reads its output and supplies its next turn"); `halt-census-core.ts:300` (`if (seat.sessionKind !== "headless") return []`); `silent-resumes.ts:47` (interactive reads `not-applicable`); `supervisor-args.ts:124` (`decideBootResume` sets `driver: "operator-attended"` for non-`--headless`); `supervisor-resume-decide.ts:225` (`planCompactResumeDriver` sets `drive: "none"` on "Alan at the keyboard" — live defect: a `cr`/`ar`-resumed seat nobody is watching gets no driver, silently idles); `supervisor-self-stop-decide.ts:114` + `supervisor-monitors-wire.ts:69-75` (self-stop wiring); `supervisor-interactive-boot.ts:132-135` (re-auth-mode boot allowance).

One site is correct and stays: `alert.ts:35` refuses when `AGENT_HEADLESS=1`, writing an OSC escape to `/proc/$SUPERVISOR_PID/fd/1` (a spawned seat's log file) — genuinely mechanical.

Precedent, already fixed: #16266 on `supervisor-limit-resume.ts` ("the former `opts.headless` gate read a session kind as an attended human"); #15495 on `persona-last-messaged-hook.sh` (froze `lastMessagedAt` four days, re-keyed onto message content).

Success criteria: (1) each site reads the axis its behavior depends on, mechanical stated where genuine (`alert.ts:35` the worked example); (2) demonstration renders both verdicts on one session across a transition; (3) `halt-census` covers the previously-exempt population; (4) the `planCompactResumeDriver` case closed specifically; (5) no site changed on the list alone — a found instance is evidence instances exist, never how many remain; this list is a floor.
