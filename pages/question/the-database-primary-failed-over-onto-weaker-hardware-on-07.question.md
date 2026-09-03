---
page-type-slug: question
id: 019f994c-db37-736d-a7da-671cb046d83e
title: "The database primary failed over onto weaker hardware on 07-24 and the estate has been ~2x slower since. Switch it back, move it to node-06, or just fence CI off it and leave the placement alone?"
slug: the-database-primary-failed-over-onto-weaker-hardware-on-07
status: answered
source-context: "019f8b5b-33ff-79c7-a6a8-cbbc351eecc6"
asked-by: 019f22ad-945f-7a99-8f94-02bc3813d6bc
options:
  - "Switch back to node-03"
  - "Move primary to node-06 (32c/65G, at 36%)"
  - "Just fence CI off, leave placement"
  - "Wait - discuss first"
---
WITHDRAWN BY DALLA — NOT ANSWERED BY ALAN, AND NEEDS NO ANSWER. Redundant: Alan had already answered this exact question via astra roughly 40 minutes before I filed it ('Switch over now, we should have the database on node-02', read as a typo for should-not), and astra executed the switchover at 06:34 MDT. The primary is on node-03 and my measurement confirmed that was the right call. My error: athena told me the placement question was mine to ask, and I treated ownership of a question as evidence the question was still open. Ownership is not openness — I never checked the question surface for an existing answer before spending attention. No input needed here.
