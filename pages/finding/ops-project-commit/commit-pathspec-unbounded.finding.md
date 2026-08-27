---
id: 4e2dd1d2-97ee-5bd6-8d26-daadf3ce441d
page-type-slug: finding
title: "Commit pathspec unbounded"
domain-slug: domain/global
---

# Claim

`ops project commit` promises in its help text that the commit is bounded by a pathspec, and it is not. A caller who bypasses the pre-flight lands whatever else is staged.

# Evidence

`tools/commands/project/commit.ts:22`, in `help.description`, tells the caller: "The commit itself is invoked with the declared paths as a pathspec, so even if the pre-flight is bypassed, only the declared paths land in the commit."

`tools/commands/project/commit.ts:250` runs `["commit", "-m", message, ...(await code.commitAgentTrailerArgs())]` — no `--`, no paths. The commit takes the whole index.

Until this pass the file's own header said the opposite of its help text, deliberately: "THE COMMIT TAKES NO PATHSPEC". The header agreed with the code. That header has now been removed under the code-comment ruling, so the false claim in the help text stands alone with nothing beside it disagreeing.

The two are not both satisfiable: either the help sentence is corrected, or the commit is given the pathspec the sentence describes.
