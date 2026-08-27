---
id: 1a4de216-a2b5-54a5-b56b-34be39f3cc68
slug: on-row-keys-held-against-no-caller
page-type-slug: finding
title: "On row keys held against no caller"
domain-slug: domain/global
---

# Claim

The asker arm of `tools/checks/resume-notices.ts` holds only its handed and clause keys against the supervisor file, so neither key that is supposed to arrive on a message row is held against any caller at all.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/notice-on-row-stamped.md` on 2026-08-12, while tracing each key the refusal prints for to the thing that actually delivers it.

Not measured: whether the two on-row keys have callers that would pass such a check, and whether the arm was narrowed deliberately.
