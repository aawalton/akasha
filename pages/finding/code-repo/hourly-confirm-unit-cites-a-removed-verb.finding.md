---
id: 8e935714-8600-5aad-b0ea-efbf626e3280
page-type-slug: finding
title: "Hourly confirm unit cites a removed verb"
domain-slug: repo/code-repo
---

# Claim

`tracking-hourly-confirm.service:19` explains its own exit convention by contrasting it with "cardio-ingest's wrote-nothing exit 3", and both halves are wrong: that verb was removed at #18149, and the one live account of the incident it refers to says every run of it exited 0. A reader checking the reasoning against the repo finds no verb, and a reader who finds the incident finds the opposite number.

# Evidence

Measured 2026-08-08 in `/var/home/walton/code`, ingesting `dirty/code/packages-alanwalton-daily-tracking-cli-docs-hourly-confirm.md`.

`packages/shared/dotfiles/.config/systemd/user/tracking-hourly-confirm.service:19-21` reads:

    # A DECLINE EXITS 0, unlike cardio-ingest's wrote-nothing exit 3. There a no-op
    # run is always an outage; here it is usually the design working

The verb is gone. `git ls-files | grep -i cardio` exits 1, and there is no `cardio-ingest.service` or `.timer` among the 25 tracked units in that same directory. A removal rather than a rename: `packages/shared/dotfiles/setup-symlinks.sh:116` says "cardio-ingest was linked here until #18149 and is gone", and `git log --diff-filter=D -- 'packages/**/cardio-ingest*'` names `359379e00a`, "18149: the circle reads the samples, and every writer of the old daily scalar is retired".

The exit code is wrong too, and that is the half a reader cannot catch. `packages/alanwalton/daily-tracking/src/pillar-freshness.ts:7-9` is the one live account of the incident the comment alludes to, and it says the opposite: "`activeCalories` stopped landing on 2026-07-02 and nothing noticed for 23 days. `cardio-ingest.timer` fired three times a day throughout and every run **exited 0**, because a missing relay file was designed as a clean no-op."

So two live files disagree about one measured drought: one cites an exit 3 as the contrasting design, the other records exit 0 as the defect.

What this adds. `pages/finding/alanwalton-app/write-seam-named-after-its-tombstone.finding.md` and `pages/finding/alanwalton-app/health-samples-comments-cite-a-retired-sibling.finding.md` both record #18149 leftovers, and I opened both: each is a dead NAME in a `.ts` file. This one is in a systemd unit, which no grep over `packages/**/*.ts` reaches, and it is not merely a dead name — it is a numeric claim contradicted by a live file, so repairing the name alone leaves the wrong number standing.

NOT MEASURED: whether any other unit cites `cardio-ingest` with an exit code; `rg -c` returns 5 files and I read three.
