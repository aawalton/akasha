---
id: 35b5493f-81c4-5019-93a2-61946fa2e63d
slug: detector-open-only-on-failure
page-type-slug: finding
title: "Detector open only on failure"
domain-slug: domain/sleep
---

# Claim

The sleep domain's only detector is a morning read from Alan, and a morning read requires him to have been awake enough to form one — so the feedback channel is open only on the nights the work failed. Five trials have produced three verdicts on the content and none on the sleep. Whether anything can be observed that does not depend on the intervention having failed is unexplored, and the constraint that the measurement must not itself surface him rules out most of the obvious answers.

# Evidence

Recorded 2026-07-27 in `dirty/skills/sleep/findings.md`, now cut from there and filed here so it outlives the sweep.

The trial log itself is live and needs no copy: project row #15572 carries 28,424 characters of `notes` running from the 2026-07-16 intake through the 2026-07-19 staging of exp-5, read today through `ops project list --seqs 15572 --json`. It holds every verdict in Alan's own words — trial 4's read as "Sounds right — count it verified", and immediately after it the line that is this finding's whole point: "the SLEEP verdict on the narrated form still pends an actual lights-down with clean audio."

That is the shape across all five. Trial 1 read as mechanics passing and content failing, content about him being stress and unearned progress feeling bad. Trial 2 read as liked a lot, too much people-prose. Trial 3 read as switch density too distracting. Trial 4's read was on the sound and was verified after a clean re-render; the read on whether the form settles him is open. Trial 5 has been staged and unrendered since 2026-07-19. Three verdicts on the content, none on the sleep.

Each of those reads came from a listener awake enough to form one. A night the piece worked produces no read, because he was asleep. So the instrument is not merely thin — it is biased, and biased in the one direction that matters: it reports on failure and is silent on success.

Nothing carries this. `rg -uuu -i -l "evidence ceiling|feedback channel|morning read|survives success|only.*when.*failed"` over `~/memory/findings/` returns two files, `alan-harness/safety-widget-design.md` and `interviewer/forwarding-fails-silently.md`, neither about this. The project row carries the trials; it does not carry the observation about the channel.
