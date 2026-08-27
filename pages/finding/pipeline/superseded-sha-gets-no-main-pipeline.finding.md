---
id: 34964c58-aa8b-5034-823f-58aeb3546400
page-type-slug: finding
title: "Superseded sha gets no main pipeline"
domain-slug: page-type/pipeline
---

# Claim

A main pipeline is created for the tip of main, so a commit landing immediately before another never gets one of its own.

From the branch side that is indistinguishable from a land that never deployed: a seat looking for a pipeline at its own SHA finds none however long it waits. The successor's pipeline carries the change, since foundation workflows deploy from the tip. The cost is a redeploy of work already in production, and an escalation naming a fault that is not there.

# Evidence

Read 2026-08-14 against the pipeline rows and the live cluster.

MEASURED. #19098 landed at `160b2f7dcc`, and `9be8f73d42` landed on top of it. `ops pipeline list --branch main` records no main pipeline at `160b2f7d` at all, and three at `9be8f73`: 28001 created 15:41:58Z, 28004 at 15:51:18Z, 28005 at 15:57:04Z. The previous main pipeline before those was 27980, seven hours earlier.

`ops pipeline workflows 28005` lists `auth-proxy`, `electric` and `prometheus`, all `foundation`, all completed — so the tip's pipeline runs them whatever the tip's own commit touched.

The deploy did happen, on the ordinary path. The auth-proxy ReplicaSet carrying the compaction-free image `5fee870ba659` was created 15:46:18Z, four minutes after 28001, and its two pods started 15:46:18Z and 15:46:29Z. The previous ReplicaSet's environment carried `ELECTRIC_SHAPE_CHUNK_BYTES_THRESHOLD=1048576`; the current one does not.

The seat holding #19098 read this correctly by its own lights and wrongly in fact. It reported the change "on main and NOT in the cluster", waited 20 minutes for a pipeline at its SHA, saw the newest main pipeline as seven hours old, and delivered the change with `ops pipeline redeploy` for all three workflows. Those redeploys landed on top of a deploy that had already succeeded 19 minutes earlier.

NOT MEASURED. Whether the seven-hour gap between 27980 and 28001 has the same cause or a different one; nothing read here explains why creation stopped or why it resumed, and that is escalated separately. Whether a main pipeline is created per push or per commit, which decides whether this is inherent or a race. What a seat could read instead to tell "my content is in the cluster" from "my content is on main only" — no such reading was found here.
