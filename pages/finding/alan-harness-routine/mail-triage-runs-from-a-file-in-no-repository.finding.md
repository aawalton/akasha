---
id: 0aed8189-d596-5f4b-a598-86f5039542af
slug: mail-triage-runs-from-a-file-in-no-repository
page-type-slug: finding
title: "Mail triage runs from a file in no repository"
domain-slug: domain/global
---

# Claim

A shipped resolver mutates Alan's Gmail from `~/agents/amy/email-rules.md` — 93 enumerated cases, 29,626 bytes, in no git repository. No history, no gate, nothing reviews a change to it. The `email` domain that should own it does not know it exists. Every case has stood at PROPOSED, pending Alan's call, since 2026-06-27.

# Evidence

Verified by me, 2026-08-11, except where marked.

**Not in any repository.** `git rev-parse --show-toplevel` from `~/agents/amy` returns `fatal: not a git repository (or any parent up to mount point /var)`. The file is 29,626 bytes; `grep -c '^|'` counts 93 table rows.

**It is the live source of truth.** Its own header: "This file IS the resolver's source of truth — `bun ops email rules push` syncs it to a page the in-cluster watcher re-reads each tick (no redeploy)." `packages/alanwalton/email/google/src/email/rules-push.ts:10` hard-codes `DEFAULT_RULES_FILE = join(homedir(), "agents", "amy", "email-rules.md")`.

**So the policy is doubly ungoverned** — authored in a file no repo holds, executed from a database row.

**What it does when LIVE** (survey-reported; header read by me): archives whole senders with no subject guard, unsubscribes, forwards receipts to Jen, and in two cases RSVPs `accepted` on Alan's behalf then archives the invite. Its Maintenance section says "edit freely". Nothing gates an edit.

**The parked decision.** The header states every case is still PROPOSED, so nothing auto-acts and the whole mailbox surfaces — the safe default. Promoting cases to LIVE is marked "Alan's call", and that has stood since 2026-06-27.

**Wider than this file.** `~/agents/` is not a repository and holds other hand-authored documents existing nowhere else, including per-persona design corpora and a credentials backup at `~/agents/amy/aow-credentials.backup.json`. Survey-reported; I did not open them.
