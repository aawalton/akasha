---
page-type-slug: question
id: 019f9942-77ab-74bd-b010-70c2bdd8b8b3
title: "Your database failed over yesterday at 16:44 and the new primary is 3-5x slower. I can try moving it to the quieter node, but that drops every connection for ~10 minutes. Want me to, and when?"
slug: your-database-failed-over-yesterday-at-16-44-and-the-new-pri
status: answered
source-context: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6"
asked-by: 019f1412-b223-74d5-93f3-d09bf6d6107f
options:
  - "Switch over now"
  - "Switch over during my nap"
  - "Ride it, investigate more first"
answered-at: 2026-07-25T12:32:13.308Z
---
Switch over now, we should have the database on node-02, that explains a lot.
