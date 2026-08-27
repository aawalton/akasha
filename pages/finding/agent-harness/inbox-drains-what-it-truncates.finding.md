---
id: 85e59d75-bb32-587c-979b-f8ea14f45cf3
page-type-slug: finding
title: "Inbox drains what it truncates"
domain-slug: domain/agent-harness
---

# Claim

`ops seat inbox` drains a message while showing only an 80-character preview of it, so the default read destroys the pending state without ever presenting the body. `ops instructions read` refuses outright in the same situation.

# Evidence

Measured 2026-08-06 during a perimeter pass, after the mechanism cost a handback body.

`ops seat inbox --help`: "By default returns pending (unread) messages and marks them read (drains)." and "Preview collapses whitespace and truncates to 80 chars." The two together mean the consuming form is also the truncating one. `--peek` avoids the drain but is not the default.

Confirmed live: a listing of 40 messages returned each as roughly 80 characters, e.g. "review-instructions on `domains/rule.md` is done. Ten lines, three slices, read ".

`--json` carries fuller content but has its own bound, per the same help: "`content` is truncated to 500 chars when the original exceeds 10000." So a message over 10000 characters cannot be read whole through this verb at all.

What it cost here: at subject 39 of this pass a handback from `claude-review-check-archivist` never arrived by push. Draining the mailbox to find it marked it read and returned the preview, and the body was then recoverable only because that seat had also written a report to disk. The forks were reconstructed from the report. The original body was redelivered by the channel hours later, which is how the reconstruction could be checked — it matched.

The contrast is with a door that already solves this. `ops instructions read` refuses when its output is piped: "nothing was read — this is printing to a pipe, so no body would reach you and a record would have said one had. Run it again with the output reaching you." That is the same hazard — a read recorded as done where the body did not reach the reader — and the instructions door treats it as worth a refusal.

Not established: whether the 80-character preview is intended as an index with the body expected to arrive by push, in which case the gap is that a failed push leaves no second route rather than that the listing is short. Nothing in the help says which.
