---
id: 9476bba6-38c9-57a1-9598-481f2c1b8132
page-type-slug: finding
title: "Commit track closes unchecked"
domain-slug: barred-meaning/project
---

# Claim

A project written `commit` when its change needs deploying can close `done` having run no CI and no deploy, with nothing reporting it. The row goes to a commit build task and onto a ladder with no deploy span, and `move-to`'s lead gate then excuses it from any CI verdict as "unsatisfiable by construction". `domains/tasks/lead/define-project.md` is the only place in the corpus a lead is told to set this value, and it says nothing about which direction of error costs.

# Evidence

Raised by `claude-define-project-archivist-review-instructions` during a review-instructions reading of `domains/tasks/lead/define-project.md` on 2026-08-09. That seat reports tracing the path through the code rather than trusting a comment, and it cut a clause on the subject line that stated the machinery backwards — `23121889a` — rather than replacing it, on the ground that the expensive error is the one the clause was silent about.

The trace is that seat's, relayed rather than re-run by the filing seat, which read neither `move-to` nor the ladder definitions. The opposite direction is the loud one: that seat reports `project-stub.ts` recording at the line writing the `deploy` default that the direction was chosen because it fails at the deploy step and the repair is one word in the document.

Not measured: whether any project has in fact closed `done` this way, and whether spending boot on the asymmetry is warranted.
