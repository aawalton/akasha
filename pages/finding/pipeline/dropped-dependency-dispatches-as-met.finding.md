---
id: 70ac502c-91a1-594f-8557-b7de56886fc2
slug: dropped-dependency-dispatches-as-met
page-type-slug: finding
title: "Dropped dependency dispatches as met"
domain-slug: page-type/pipeline
---

# Claim

Nothing binding states that a pipeline step whose dependency was dropped by path filtering dispatches as though that dependency were met. `resolveDeps` treats a dependency absent from the selected steps as satisfied, so every `dependsOn` is best-effort in exactly the case it exists for — a commit touching only a dependent selects it and drops the upstream. A reader meets this by measuring it from source. `domains/pipeline.md` carries the workflow-level sibling and not this one.

# Evidence

Found on 2026-08-10 by the seat delivering #18355, which was cut on this semantic and had to establish it from `resolveDeps` rather than from any document. Its remedy, `withAddonBuildCoDep`, derives `addon-build`'s watch seeds as the union of every entry declaring `dependsOn: ["addon-build"]`, so selection cannot take a dependent while dropping the build — a widening chosen precisely because the engine offers no way to say "pull this in".

`domains/pipeline.md` carries the neighbouring selection facts: "A workflow whose watched files resolve to nothing fails rather than falling back to the commit", and three others. The step-level case is absent.

The lead attempted to land it as a Design line reading "A step whose dependency path filtering dropped from the run dispatches as though that dependency were met." The write was refused by `document-conforms`: the `# Design` section is capped at 500 characters and measured 549 with the line added. It is filed rather than forced, because fitting it means displacing one of the four entries standing there and none of them is weaker than this one — that is a judgement about what `pipeline` is for, not a repair to slip in beside a verdict.

NOT ESTABLISHED. Whether the shortest faithful wording fits under the cap was not measured to the character. Whether this belongs on `pipeline` at all rather than on a narrower domain about step selection was not weighed. Whether any other project has been cut on the same unstated premise was not surveyed — #18355 measured its own case unreachable for the six checks it covered, so the semantic is real but its live blast radius is unmeasured.
