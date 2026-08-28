---
id: 225f7d61-0f2b-52cc-a8ef-a6271896537a
slug: web-select-options-not-creatable
page-type-slug: finding
title: "Web select options not creatable"
domain-slug: web-app/alanwalton-web
---

# Claim

Book entries cannot be edited from the web side with new select options created inline, the way a Notion-style select behaves. Creating a rating or genre option that does not yet exist needs a privileged path the web client does not hold, so the option set is fixed from the client's side at edit time.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 1 row (seq 5301) carrying 1 sighting, all at `accumulating`.

The row's own recommendation was a server-mediated privileged option-create wired into `select.tsx` through an `onCreate` hook, by way of a server action or an ops command that validates and appends the new option. That is a proposal rather than part of this claim.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.

This row is not a mined behaviour category. It is one of only two live `issue` rows carrying `attributes.kind = 'feature-request'`, and its `observations` holds a proposal object with `problem`, `options`, `recommendation` and `intentQuestions` rather than an array of sightings — the shape `packages/alanwalton/feature-requests/src/proposal/normalize.ts` builds. The claim is drawn from that row's `problem` and `recommendation` alone: I did not open the code it names, did not check whether the condition still holds, and did not read the options it weighed.
