---
id: 4ce580fa-772a-5dfe-a643-baa653df70d6
slug: no-check-refuses-an-undocumented-alert
page-type-slug: finding
title: "No check refuses an undocumented alert"
domain-slug: page-type/alert
---

# Claim

Nothing refuses a firing site whose alert has no document. `alert-names-no-recipient` is the only check standing under the alert domain, it refuses a site that names a persona rather than one with no document, and it is absent from the `CHECKS` registry in `tools/run-checks.ts`, so nothing runs it at all. Every alert emitted today does have a document; nothing keeps that true of the next one.

# Evidence

#18963's first objective reads: "Every alert the fleet can emit has a document under `domains/alerts/`. A check walks the emitters and refuses one whose alert has no document." No such check was built by any of its children.

Measured 2026-08-15, after the #18963 deploy landed as `3f8b095422`:

- `tools/checks/` holds exactly one file matching `alert`: `alert-names-no-recipient.ts`. Its subject is a firing site naming a persona, agent or seat — the second objective, not the first.
- `tools/run-checks.ts` names no check containing "alert" anywhere in the `CHECKS` map, which runs alphabetically from `bash-env-inside` to `tests-bounded`. So even the check that does exist is unregistered.
- `domains/alerts/` holds 85 documents, and every one of the 78 live conditions resolved a holder when #19213 was verified. The property holds today by the work that was done, not by anything that would refuse a regression.

There is a backstop, downstream. `tools/lib/alert-observer.ts` routes an event matching no document to an unmatched lane, whose message reads "Each of these fired somewhere and reached nobody." So an undocumented condition is reported rather than silent — but only once it first fires, and `no-alert-event-has-ever-been-written` records that none ever has. The missing check would refuse at commit time; the backstop catches it at fire time, which may be never.

The population a check would walk is itself unsettled: `page-types/alert.md` declares `code-path:` and that key caps at five globs, where the firing sites numbered six. That is filed separately as `code-path-caps-at-five-and-the-firing-sites-are-six`. A check built on the declared `code-path:` would answer for a population smaller than the fleet.
