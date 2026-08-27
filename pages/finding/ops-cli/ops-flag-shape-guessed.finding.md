---
id: 8be9103e-5927-53c1-b6e9-f2843643f614
page-type-slug: finding
title: "Ops flag shape guessed"
domain-slug: domain/ops-cli
---

# Claim

The argument shape of an `ops` command is guessed from the last invocation rather than read from its help, and sibling commands differ: `ops project move-to 11429 --status problem` failed on a missing `--seq` because that command takes the seq as a flag where a sibling takes it positionally. Forty-six sightings under eight categories make this the second-largest behaviour in the register.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 8 rows (seq 5138, 5145, 5228, 5232, 5233, 5235, 5236, 5289) carrying 46 sightings; 7 at `accumulating` and 1 at `dispatched` (seq 5236), so part of this was already handed to somebody.

Also recorded: `bun ops project check --only`, a flag the command does not take (thirty-seven sightings, `dispatched`); `ops property-definition update` given a positional where a flag is required; an empty string reaching a uuid filter; and `bun ops page list --search` returning an invalid-uuid error. Three sightings record `ops` exiting 2 because the project was held by another agent, which is the tool working rather than a shape error.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
