---
id: 2062e78a-4134-537b-9fad-bebd5c7d0888
slug: tollfree-verification-history-unrecorded
page-type-slug: finding
title: "No record holds what any toll-free verification round submitted or why it was refused"
domain-slug: domain/ops-sms
---

# Claim

No record holds what any round of the Telnyx toll-free verification for `+18445122550` submitted or why it was refused, and Telnyx's API keeps only the two most recent requests. Rounds one through four are unrecoverable from every source this system holds.

The reviewer's request for changes appears in the Telnyx portal alone and is never emailed, so nothing wakes anyone when a round starts waiting on Alan. Round five expired on that clock rather than on a verdict.

# Evidence

Measured 2026-08-19 against `GET /v2/messaging_tollfree/verification/requests?page=1&page_size=50`, which returns two records and no more:

- `e7d8be0f-17bc-59e5-b10d-3797208f0557` — created 2026-06-28T18:03:46Z, updated 2026-08-05T05:02:39Z, `Rejected`, reason `Submission Editing Timed Out`.
- `25418a34-7d8c-5304-af97-9679752f983c` — created 2026-08-07T02:40:19Z, updated 2026-08-07T16:13:35Z, `Waiting For Customer`, reason `opt-in link to google doc must be public, unable to view. update contact email: info@mytowerapp.com`.

The second had sat twelve days awaiting Alan when it was read, with nothing on disk naming it and nothing scheduled to look.

Its reason does not match what was submitted. The submission's `optInWorkflowImageURLs` names `https://alanwalton.com/sms#opt-in` and no Google Doc; that URL, with `/privacy` and `/terms`, answered HTTP 200 to an unauthenticated fetch that day, carrying the consent box, the STOP and HELP language and the opt-in workflow. `info@mytowerapp.com` appears nowhere in the submission, and a full-text search of Alan's mail returns no message naming that domain.

That the earlier rounds left no record is itself recorded only in a session transcript, which states that Telnyx keeps the current request alone and that nothing anywhere held what the earlier five were refused for. The same session proposed filing this observation; no such file was landed.

That the reviewer's request is portal-only is likewise transcript-resident, in a boot digest of 2026-07-21 carrying the watch "portal-only edit request, no email — last one died unwatched". That watch existed as session text, never as a file, and did not survive.

Outbound SMS from `+18445122550` is blocked while the verification is unapproved: a send on 2026-08-18 failed `HTTP 400`.
