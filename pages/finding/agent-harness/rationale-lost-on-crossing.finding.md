---
id: fd7d95cc-9e07-5dfe-b3bf-7b2d939f0df4
slug: rationale-lost-on-crossing
page-type-slug: finding
title: "Rationale lost on crossing"
domain-slug: domain/agent-harness
---

# Claim

Moving a part into the instructions repository strips its design rationale, and nothing catches what is lost.

Only the eight machine-parsed comment forms are admitted here, so every explanatory comment on a part crossing the boundary has to go. The rule sends that prose to a domain, but a domain's lines are Alan's to approve. A seat can therefore always finish the deletion and never the relocation — and `comment-forms` reports the file clean exactly when the rationale is gone.

# Evidence

Measured while moving `@agents/messages` into `tools/lib/messages-*.ts` (#19204).

The four moved modules carried about 150 lines of prose comment and now carry none. What went was not decoration. It named the defect each shape exists to prevent, and in several places said explicitly that a plausible simplification is the defect returning:

- Why `deliverClaimedMessage` claims, renders, then releases on failure, and why the call is contained rather than re-throwing — a render that throws must return the row to `pending` rather than leave it consumed-but-never-seen.
- Why the witness is retrospective rather than synchronous: the render writes into a one-way pipe, so a mark taken at that point knows only that a row was fetched, which is the original defect at a later line.
- Why `not-yet` never retires, and why `self-found` does not advance — retiring a queued message is what turns a confirmation step into a fleet-wide redelivery loop.
- Why `console-stdout-guard` must be the first import: a dependency writing to stdout corrupts JSON-RPC framing. This one is load-bearing on import ORDER, which no type or test constrains.

The gates confirm the asymmetry. `comment-forms` passed on all seven written files, reporting `0 comment(s), 0 outside the forms` — the same reading a file whose rationale was carefully relocated would give, and the same one a file that never had any would give.

Two things narrow it. The rule is right about the failure it names: a drifted comment does compete with what stands, and these comments cite project numbers a reader cannot check. And the code repository still holds this prose in its history, so it is recoverable by someone who already knows to look — which is the part that does not survive a seat's context.
