---
id: 2554ba45-9289-57bb-b68f-10125c5ada23
slug: daemon-not-restarted-on-deploy
page-type-slug: finding
title: "Daemon not restarted on deploy"
domain-slug: domain/deploy
---

# Claim

A deploy does not restart the long-running `wake-watcher-daemon`, so its running behaviour can silently disagree with what main describes for as long as the process stays up, on an SMS-arming path exercised so rarely (zero matching `sms:` sources in `public.messages` over fourteen days) that a real breakage would produce no signal for weeks.

# Evidence

From project #17043 (status `someday_maybe`, `live-on: deploy`, domain `deploy`), captured and never defined — no objective was ever written.

Near-miss, observed not reasoned: during #16878's deploy, `project-16878` deleted the helper rows `wake-watcher-daemon.ts` read. Deployed code armed both SMS front doors from code with zero rows; the running process had started at 09:58, still executing pre-deploy code folding row-derived specs. Had it stayed up, two real humans' inbound SMS would have gone dark with nothing failing loudly. The manager restarted it and re-verified, rather than trusting the startup log as observation.

The gap: a file on main is live the instant a deploy lands; a long-running daemon is live only when something restarts it. Nothing in the deploy path closes that interval here, so behaviour and code can disagree for as long as the process lives.

What makes it serious: `public.messages` carries no `sms:` source in fourteen days — a search for `sms:jenny-handler`, `sms:ki-handler`, or any `sms%` source returns one row, `system:agent-kill-alert`, matching only the substring `ki` inside `kill`. The zero does not show routing broken or working; it shows the path is exercised so rarely a breakage gives no signal for weeks. Nobody can verify this on demand, not the lead, not Alan, both third parties, so the remedy can't be a verification step; it must be a restart the deploy performs or a probe the system runs itself.

Definition still needs: the population — one process observed once; which other resident workloads read code or data a deploy can change, and which get restarted, is unmeasured, and decides one restart hook vs. a deploy-phase obligation. And which remedy: restarting on deploy drops in-flight state and at this fleet's cadence would restart constantly; a synthetic probe exercising the arming path end-to-end and failing loudly may dominate it, since it also covers the quiet-path problem.
