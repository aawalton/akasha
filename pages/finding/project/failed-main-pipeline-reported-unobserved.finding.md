---
id: 7ca03330-e56d-56a3-815c-230921bcb975
slug: failed-main-pipeline-reported-unobserved
page-type-slug: finding
title: "Failed main pipeline reported unobserved"
domain-slug: barred-meaning/project
---

# Claim

`ops project deploy` reports a definitively failed main pipeline as unobserved and exits 2, the code its own help defines as "nothing is known to have gone wrong". Every `deploy.error` maps to `pipeline-unobserved`, the wait layer's own "main deploy failed (commit X) — failing workflow(s): …" included, so the rendered reason reads "the main pipeline's outcome could not be observed: main deploy failed …" — a sentence quoting the observation it denies. The help lists that case under exit 3.

# Evidence

MEASURED AT ~/code HEAD `47a2a573e4`, following one string end to end.

PRODUCER. `packages/alanwalton/projects/cli/src/lib/move-to-deploy-wait.ts:405` sets `error: \`main deploy failed (commit ${commitSha}) — failing workflow(s): ${detail}\``. This is a workflow that failed on a pipeline that resolved, not a wait that could not look.

COLLAPSE. `src/project/deploy.ts:122-123`: `if (deploy.error !== undefined) return { kind: "pipeline-unobserved", mergeSha, error: deploy.error }`. The string is not inspected and there is no other route out of an error.

RENDER. `src/pure/decide-deploy-verdict.ts:191-196` returns `kind: "unknown"` with `reason: \`the main pipeline's outcome could not be observed: ${outcome.error}\`` and `coverage: { observed: 0 … }`.

THE DOCUMENTED CONTRACT SAYS OTHERWISE. `ops project deploy --help`, code 2: "the outcome could NOT be observed … Distinct from code 3 on purpose: nothing is known to have gone wrong, and nothing is known to have gone right." Code 3: "either verdict is `fail` — … the main pipeline resolved non-passing".

THE OVERLOAD WAS REASONED ABOUT AND RESOLVED THE OTHER WAY. `deploy.ts:103-109`: "The distinction that used to be lost is the third one: the wait layer returning 'I could not look' is stored as `passed: false` alongside an `error`, and collapsing that into the failed branch reports an alarm the run never earned." The repair routed EVERY error to unobserved rather than splitting the channel, so the loss reversed direction rather than closing.

NOT SILENT, PRECISELY. The failure text is carried into the `the-deployed-main-pipeline` stdout line, so a human reading the output sees it. What is wrong is the verdict and the exit code — the parts a caller branches on.

NOT MEASURED. How often this path fires, and whether any caller distinguishes exit 2 from exit 3 today.
