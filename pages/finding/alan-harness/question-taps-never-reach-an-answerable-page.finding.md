---
id: c11506f4-fd39-5bbb-a52c-071ba0ddfb5e
slug: question-taps-never-reach-an-answerable-page
page-type-slug: finding
title: "Question taps never reach an answerable page"
domain-slug: domain/alan-harness
---

# Claim

Alan's question notifications reach a page that can never become answerable. Across twelve days and four builds, every real tap onto a question terminated `not-found` or `timeout`, and none reached `answerable`. No open question exists to reach: all 345 question pages stand answered or dismissed, and the pushes sent announce `question.answered` and `question.dismissed` rather than a question awaiting him. The tap-to-answerable baseline #17052 waits on cannot accrue.

# Evidence

`push_tap.time_to_answerable_ms` in `public.metrics` holds ONE row in twelve days: value 1842, at 2026-07-28T19:02:26Z, labelled `trace: spine-1785265340` and `user_kind: anon` — a synthetic POST demonstrating the sink rather than a tap. The code says the same thing at `packages/alanwalton/web/app/questions/question-detail.component.test.tsx:311`: "every device and simulator reading terminated `not-found` or `rendered`, and the one `answerable` row on record came from a synthetic POST".

`push_tap.non_answerable` holds 21 rows. Twelve carry `user_kind: owner` with `destination: question` — 9 on build 7aab6c87 through 2026-08-06, one each on 8560e6cf, aa55d583 and 90ec87e7, the last at 2026-08-07T00:00:05Z. Outcomes across all 21: `not-found` 19, `timeout` 2.

The instrument itself works. `push_tap.hop_offset_ms` holds 516 rows across five builds, so the head accrues; it is the tail that never reaches its terminal.

In `public.pages` where `page_type_slug = 'question'`: 287 answered, 58 dismissed, zero open, the most recent write 2026-08-09T15:13:25Z. In `apns_push_log` over seven days: `notification.created` 289, `project.done` 223, `question.answered` 56, `question.dismissed` 10 — no transition pushes a question that is waiting on him.

Nothing has reported a tap since 2026-08-07T03:16:48Z, sixty hours. The phone is not silent: `page_view` labelled `platform: shell` last arrived 2026-08-09T15:22:12Z, and pushes still go out, 14 on 2026-08-08 and 46 on 2026-08-09.

Two premises in #17052's own notes are also contradicted by these readings. It reasons from "~430 push taps/day" to justify sampling the head from every tap; `apns_push_log` shows 14 to 132 pushes a day over the last fortnight. And it holds #17054 unclaimable during accrual to protect a "before" reading that has not accrued.
