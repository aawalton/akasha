---
id: 453fb711-7ff1-5993-a39e-5bd587f79f9b
page-type-slug: finding
title: "Nothing watches the ground"
domain-slug: domain/technology
---

# Claim

The estate's largest stated exposure has no watcher. Alan's stated biggest risk is Anthropic changing subscription terms or the OAuth surface — the ground-shift that would break an architecture deliberately built with no API fallback — and nothing observes it on any schedule. The estate authors nine systemd timers and none watches this, and its 177 check-steps all fire on a diff, so are blind to a change arriving at zero commits.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/technology/SKILL.md`, whose item 5 states it and is queued for removal. Its words: the biggest risk is "the ground-shift that would break the whole architecture (no API fallback by choice)", and "The lack of a fallback is a price knowingly paid, which makes watching the ground the compensating control, and nothing watches it today."

Checked on the right substrate. A time-triggered watcher is a timer or a cron, not a check, so the check corpus is the wrong place to look and its greenness says nothing here.

The host: `systemctl list-timers --all` reports 8 timers, every one OS housekeeping (`logrotate`, `fstrim`, `raid-check` and the like). `crontab` is not installed.

The estate's own: `git ls-files` in `~/code` returns nine authored systemd user timers under `packages/shared/dotfiles/.config/systemd/user/`, among them `agent-row-reaper`, `macbook-inference-probe`, `review-documents` and `temper-watcher-liveness`. That is the positive control that matters: the estate does build time-triggered instruments, so a search for one could have succeeded. `git grep -l -i -E 'anthropic|oauth'` over every tracked cron, timer and schedule definition returns nothing.

The change-triggered corpus, for completeness: `ops enforcement list` reports 231 mechanisms, 177 of them `check-step`, and filtering on `oauth|api|subscription|proxy` yields only `check-design-tokens`, which is CSS. None could catch this anyway — the defect arrives without a commit.

Beside its neighbours: `subscription-constraint-unrecorded.md` records that the constraint is written nowhere, and `ai-infra-ruling-ungoverned.md` and `scope-ruling-uncarried.md` concern ownership and scope. This is the third thing — the constraint is un-hedged by design, and the compensating control it therefore requires does not exist.

Not established: whether a watcher was ever built and removed, and what it would watch — a terms page, an OAuth endpoint, or a release feed.
