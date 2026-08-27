---
id: 633d6b5b-1f3e-5266-aaf2-98dbccb056a5
slug: cluster-downtime-source-silent
page-type-slug: finding
title: "Aranya's cluster-downtime points scored a flat maximum after its feed went silent"
domain-slug: persona/aranya
---

# Claim

Aranya's daily and total points came from cluster downtime, read as wedge envelopes out of `public.messages` and scored two for a clean day, one for a day a wedge opened and closed, none for a day one stayed open. No wedge envelope has been written since messages became files, so the feed scored every day a clean two whatever the cluster did, and nothing reported the difference between a quiet cluster and a silent one. With the feed torn out, infra has no persona points source at all.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`,
and against the working trees of the instructions, code and memory repositories.

`public.messages` held 2,401 rows spanning 2026-08-12 to 2026-08-21 18:22, and none of them
matched the `{"wedge_class"` prefix the feed selects on. No file under
`/var/home/walton/repos/memory/pages/message/` carries `wedge_class` either. The scoring
follows from `tools/lib/daily-tracking/cluster-downtime-points.ts`: with an empty envelope
list neither `enteredOpen` nor `activeInWindow` is set, so `classifyDowntimeDay` returns
`CLEAN_DAY_POINTS`, which is 2. The source is declared on
`pages/persona-points-source/aranya-points-source.md` as `marker: cluster-downtime`, and
Aranya's page stood at `total-points: 66` and `green-day-points: 4`.

A producer does exist and is not the gap it looks like. `packages/infra/k8s/postgres/gfs-promoter/src/main.ts:26` and `longtail-main.ts:33` in the code repository both build an envelope carrying a `wedge_class`, then `console.error` it and exit non-zero. The envelope reaches a pod's stderr and nothing further; neither writes a row. So the reader was not orphaned by messages moving to files. Nothing ever carried an envelope from the promoter to the store the scorer read.

Not measured: when, if ever, a wedge envelope reached `public.messages`, since the rows were
already gone rather than merely stale; whether Aranya's 66 points were earned or accumulated
at two a day; and whether the feed's own definition, "the projects completed in infra", ever
matched what the code scored.
