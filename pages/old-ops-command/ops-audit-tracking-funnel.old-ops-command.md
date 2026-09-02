---
id: fcd25075-983a-5ca9-b1bc-da734d17c0ff
page-type-slug: old-ops-command
title: "Ops audit tracking-funnel"
slug: ops-audit-tracking-funnel
domain-parent-slug: domain/ops-audit
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/audit/tracking-funnel.ts
path: audit tracking-funnel
irreversible: false
---

# Definition

- **Ops audit tracking-funnel** — every file outside `akasha/` reaching a tracking day around the day-place funnel.

# Help

Rule that every read or write of one of Alan's tracking days, anywhere in the checkout outside `akasha/`, goes through `dayPlaceOf` in `tools/lib/tracking/day-place.ts`.

THE POPULATION IS WALKED RATHER THAN LISTED: every TypeScript file in the checkout, holding out only `akasha/`. An akasha file imports nothing outside the akasha folder, so it cannot take the funnel at all, and a check refusing with a fix nobody can take is a check that gets exempted into silence — akasha's own gate governs akasha. Its files are still READ, because a day page type can travel out of one into a file that is weighed. Test and declaration files are set aside from the denominator, stating the rule rather than being bound by it.

A FINDING NEEDS BOTH HALVES, AND EACH IS A CLOSURE. A file NAMES a day when it spells one of the two day page types, takes the funnel's own constant, takes a binding that is one of them however it was renamed, or hands work one hop to a module that spells one. A file REACHES the page store when it takes one of the store's verbs, directly or through imports to any depth. Naming without reaching is no finding, and neither is reaching without naming.

`tools/lib/tracking/day-place.ts`, `tools/lib/tracking/activities.ts` and `tools/lib/inbox-tracking/email-entry.ts` are permitted to reach, and neither closure travels through them: the funnel spells both page types, so a naming closure that ran through it would make a namer of every caller the funnel has.

Three folders are stricter still — `tools/lib/tracking`, `tools/commands/tracking` and `tools/lib/inbox-tracking` may not spell a day page type at all, even where they touch no store.

THIS ONE REFUSES ON A FINDING rather than reporting one, unlike its neighbours under `ops audit`: a reach around the funnel needs no reading to settle. While the day migration is half done one day is markdown and the next is akasha, so a write that decides for itself puts a new day at the old place after that day has moved, and a read that decides for itself answers that a moved day is empty.

IT ALSO REFUSES WHERE IT COULD NOT LOOK — no TypeScript file found at all, a folder it could not list, or a file it could not read — because a run that read nothing must not print like a run that found no bypass.

THE HUMAN REPORT CARRIES AT MOST 40 REACHES and says how many it left out; `--json` carries every one. A count read off the printed list is a floor rather than a census.

A reach the funnel does not govern is admitted by naming its file in `ALLOWED_TO_REACH` in `tools/lib/tracking-funnel.ts`, not by a flag here.
