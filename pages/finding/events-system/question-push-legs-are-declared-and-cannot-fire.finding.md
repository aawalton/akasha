---
id: 01a01fc7-e443-7000-b57f-6ef4a6667710
page-type-slug: finding
title: "Question push legs are declared, reproduced every boot, and cannot fire"
domain-slug: domain/global
---

# Claim

Alan gets no push when he answers or dismisses a question, and booting the notifier will not fix it. The question-answered and question-dismissed manifests still declare a `page`/`pages` subscription keyed on the `question` page type, which is file-backed now, and a file raises no page event. The two rows are not stale: they are what the live manifests project, so each boot writes them back unchanged. The legs want an event stream of their own, as `project.done` already has.

# Evidence

Measured 2026-08-20, against the live database and by running the code.

`getPageTypeIdBySlug("question")` resolves from FILES to `019f4a3b-8e94-78ec-9723-302b992a267f`, the uuid both rows carry and the id `page-types/question.md` states. A nonsense slug throws, so the resolver discriminates. The legs register rather than being skipped.

Booting both manifests through `registerEventsSubscriber` against a scratch PGlite seeded with the 30 real subscriber rows and 12 real subscription rows rewrote both rows byte-identically. A deliberately mangled page type id came back rewritten, so the comparison can tell a difference.

`_pages_emit_db_result` sets an event's `page_type_id` from `SELECT page_type_id FROM public.pages WHERE id = rowId`, and `public.pages` holds zero question pages. No future event can carry that id.

Both cursors sit on seq 25403937, the head of a stream whose last event was 2026-08-19T15:10:07Z, the moment Alan answered his last question. 65 `updated` events stand inside the seven-day horizon; rewinding one seq behind the head returns a row, so the selector matches real events and the zero means the stream stopped rather than that the selector is blind.

Their `RETAINED_SUBSCRIBERS` entries say the page type "resolves to nothing", which it does not, and buy nothing: both names stand in `DECLARED_SUBSCRIBERS`, so dropping the retain entries changes no plan.
