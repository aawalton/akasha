---
id: c1bb2df0-88c7-5589-b0e8-c4a872a91cc3
slug: help-bounds-pinned-from-client-modules
page-type-slug: finding
title: "Help bounds pinned from client modules"
domain-slug: old-ops-command/ops-inference-generate
---

# Claim

Four bounds that `ops inference generate` and `ops inference video-qa` print in their help screens
are now literals in each verb's own file, where the client module still declares them as the
`export const` the enforcement reads. A change to either declaration moves what the verb enforces
and leaves what it advertises behind, and nothing reports the disagreement.

# Evidence

`tools/lib/inference/cli/mlx-image-client.ts` exports `GEN_SIZE_MIN = 256`,
`GEN_SIZE_MAX = 2048` and `GEN_SIZE_MULTIPLE = 16`. Before the move, `generate`'s help block
interpolated those three names, so a change to the bound reached the help screen in the same edit.
A help block here cannot await, so the three crossed as the literals `256`, `2048` and `16` in
`tools/commands/inference/generate.ts`. The body still calls that module's `parseGenerationSize`,
which reads the real constants — so after such a change the refusal and the help screen would
disagree, the refusal being right.

`tools/lib/inference/cli/mlx-vlm-client.ts` exports `DEFAULT_FRAMES = 16`, which
`video-qa`'s help block interpolated twice. It crossed as the literal `16` in
`tools/commands/inference/video-qa.ts`. Here the parser substitutes the declared default, so the
literal IS the runtime value and help and behaviour cannot disagree with each other — only with the
client module's declaration.

Both were flat `export const` declarations rather than values computed at run time, so no
environment variable or filesystem lookup was pinned by the move: the exposure is staleness alone.
The verbs' remaining interpolations came from constants file-local to the handler
(`DEFAULT_SERVICE`, `STEPS_MIN`, `STEPS_MAX`, `DEFAULT_BACKEND`, `BACKEND_NAMES`, `DEFAULT_LANG`,
`DEFAULT_MODEL`), which stayed file-local here and so kept their coupling to the bodies that read
them.
