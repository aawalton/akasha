---
id: 977bd2b2-0607-5d61-9ae6-bf6e1a2a4446
slug: link-outcome-unsignalled
page-type-slug: finding
title: "Link outcome unsignalled"
domain-slug: domain/temper
---

# Claim

After linking a Temper add-on account there was no signal anywhere telling the user whether the link actually worked — `/cli-link` redirected off Temper with no return path, and no sync-status or watcher/token/revoke UI existed at capture time — making the separate install blocker (F1) fatal rather than merely annoying, and matching a broader class where a success signal's truth is decoupled from the effect it claims to confirm.

# Evidence

Filed as project #16166, domain `temper`, status `someday_maybe`. Captured by aine 2026-07-25 — F10, a named condition on the M1 hand-over gate with no row, whose only record was an ephemeral `/tmp` file (F10 in #15909's cold-path findings index, `/tmp/coldpath-findings.md`, 12,809 b, mtime 2026-07-24 21:23; preserved to `~/agents/aine/scratch/coldpath-findings-15909.md`).

**F10 verbatim:** "after linking there is NO WAY TO TELL WHETHER IT WORKED — this is what makes F1 FATAL." At capture: `/cli-link` redirected off Temper with no return path; no sync-status surface found; Settings had zero watcher/token/revoke UI.

**Why M1-critical.** Alan settled Q3 2026-07-25: addons install from the tempereso.com web app, not hand-delivery — M1 needed proof someone can get it, and F10 is the multiplier making install blocker F1 fatal.

**Class**, four 2026-07-25 instances, confirmation decoupled from effect: (1) F10; (2) #16012 revoke returns 200 ok:true regardless; (3) #15934's Health shortcut reported synced with no activeCalories that day; (4) #15790 Alan answered 08:06Z, row read "awaiting Alan" 5h later.

**Scope:** signal gap only, distinct from #16012, #15939 (lying sync card), #16079 (unread watcher health signal). Homed to ember as Temper's owner, needed her define-front; aine held the hand-over gate.

**Follow-up** (2026-07-25T13:34, origin/main 9a377fa868): confirmed discoverability gap at the terminal step, plus per-operation evidence written by the watcher and read by nothing. REFUTED surface-absent: `/watcher` exists (`packages/temper/web/app/routes/watcher.tsx`), nav item #2, two evidence cards, own copy already says linking alone proves nothing — aine's 07-24 read was stale. REFUTED wrong-question: `deriveWatcherSyncVerdict` (`app/lib/watcher-sync-status.ts:116-125`) already splits not-connected from connected-no-data. Note on the three confirmed pieces was cut at a boundary in the retired-notes capture.
