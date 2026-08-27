---
id: 9a54dae0-2610-5a92-b8d5-37cf34816631
slug: mark-clearing-intent-reads-two-ways
page-type-slug: finding
title: "The mark-clearing Intent entry reads two ways that ask for opposite acts"
domain-slug: domain/ops-claude-account
---

# Claim

The Intent entry "A mark the running fleet set is cleared by the command named for it, never by writing the field." reads two ways that ask for opposite acts. Read as "no mark is cleared by hand-writing a field", it is already true, and `domains/domain-intent.md` says an entry found true is moved or deleted. Read as "each mark has a command of its own", it is unmet at four marks of five: only `subscription-disabled-reason` has one, in `re-enable`.

# Evidence

Found during the review-instructions reading of `domains/ops-claude-account.md` on 2026-08-19, and left standing because the two readings ask for different work. `ops claude-account re-enable --account aine` answered `ok` and cleared that one mark. `retry-after`, `terminal-at`, `terminal-alerted-at` and `last-window-trigger-at` are set and cleared by the fleet itself, `terminal-at` returning to null on the refresh that succeeds.

Measured: the five marks and which has a command. Not measured: which reading was meant.
