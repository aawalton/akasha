---
id: 5cff0314-25a4-5eb2-b56f-e0291b1d15c4
slug: source-header-denies-the-auto-acting-it-causes
page-type-slug: finding
title: "Source header denies the auto acting it causes"
domain-slug: rules-engine-rule-set/email-rule
---

# Claim

The file that is the email resolver's source of truth opens by stating that no rule auto-acts and the whole mailbox surfaces. The resolver has been auto-acting for six weeks. So the first line a reader meets about Alan's mail is false, and it is false in the reassuring direction — it claims a safe default that is not in force.

# Evidence

Measured 2026-08-12 against the live `pages` table, read-only.

**What the file says.** `~/agents/amy/email-rules.md`, line 3: "As of now EVERY case is still PROPOSED, so nothing auto-acts yet — the whole mailbox surfaces, which is the safe default. Promoting cases to LIVE is the remaining go-live step."

**What the resolver did.** Decisions recorded on `gmail-processed-message`, by kind:

    archive              489   2026-06-29 .. 2026-08-12
    surface              319   2026-06-28 .. 2026-08-12
    skip-spam            106   2026-06-30 .. 2026-08-12
    agent-handle          48   2026-06-28 .. 2026-08-09
    ignore                20   2026-07-04 .. 2026-07-29
    skip-self-sent        18   2026-07-25 .. 2026-08-10
    forward                3   2026-07-08 .. 2026-08-04
    unsubscribe-archive    2   2026-08-06 .. 2026-08-09

**Why the header went stale rather than being wrong when written.** The same file's case table carries Alan's dated approvals — 2026-07-11 through 2026-08-10 — and roughly twenty cases read LIVE. Each promotion was recorded in the table and none of them touched the header, which describes a state the file has since left.

**The structural cause, which outlives this one line.** The file holds TWO tables. The case enumeration says of itself that it "is not machine-parsed"; the machine table below it is the only thing the resolver reads. Two carriers of one decision set, free to disagree, and the header is the disagreement showing.

**Not established.** Whether any auto-action was one Alan would not have approved. The counts say the mechanism ran, not that it ran wrongly.
