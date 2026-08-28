---
id: 2c9f75a1-43c3-5694-b41f-108b29aea234
page-type-slug: finding
title: "A $HOME-spelled path resolves only the repository that is gone"
domain-slug: domain/repo-system
---

# Claim

`tools/lib/hook-settings.ts:29-40` turns a token from a settings document into a path relative to a repository, and it does so down two branches that disagree about which repository exists.

The second branch, at lines 36-39, resolves an absolute token against `rootFor(roots, AKASHA)` and is correct.

The first branch, at lines 30-35, handles a token spelled with `$HOME/`, `${HOME}/` or `~/`. It strips the prefix, strips `repos/`, and then ends at line 34:

```
return under.startsWith("instructions/") ? under.slice("instructions/".length) : null
```

`instructions` was absorbed into `akasha` and is not among the `*.repo.md` pages `REPOS` is scanned from. So this branch resolves a path only for the one repository that no longer exists, and answers `null` — meaning "outside every repository" — for the one that does.

Two spellings of the same file therefore disagree. `$HOME/repos/akasha/tools/bash-env.sh` reads as outside the repository; the absolute spelling of that same file reads as `tools/bash-env.sh`.

This has two readers, and it goes wrong differently in each.

`tools/audits/bash-env-inside.ts:54` calls `repoRelative` on the declared `BASH_ENV`. A correct declaration spelled with `$HOME` comes back `null` and the check reports `bash-env-outside-repo` against a file that is inside the repository and on disk.

`tools/audits/hooks-agree.ts:56-57` builds `dead` by filtering `byScript(theirs.document, repo.roots)`, and `byScript` keeps only tokens `repoRelative` resolved. A hook registration spelled `$HOME/repos/akasha/...` never enters that map, so it can never be reported as a dead registration however long the script has been gone. The inverse also holds: a registration spelled `$HOME/repos/instructions/...` does resolve, and line 57 then tests it for existence under the akasha root — so a registration naming a repository that no longer exists passes wherever the same relative path happens to exist here.

# Evidence

Verified on 2026-08-28 against the tree as it stood.

`REPOS` is `["akasha", "code-editor"]`, scanned at module load from `pages/repo/*.repo.md`.

`repoRelative` called against the live roots gives:

- `"$HOME/repos/akasha/tools/bash-env.sh"` → `null`
- `"$HOME/repos/instructions/tools/bash-env.sh"` → `"tools/bash-env.sh"`
- `"$HOME/repos/code-editor/tools/bash-env.sh"` → `null`
- `"/var/home/walton/repos/akasha/tools/bash-env.sh"` → `"tools/bash-env.sh"`

The dead repository is the only one the `$HOME` branch resolves. Both live repositories come back `null` down that branch, and the third and fourth lines are the same file under two spellings, answered two ways.

`bun test tools/tests/bash-env-inside.test.ts` is 9 pass, 1 fail. The failing case is "a startup file in this repo, which is there, passes over the one declaration", at `tools/tests/bash-env-inside.test.ts:49`, expecting `pass` and receiving `fail`. Its fixture declares `INSIDE`, which is `` `$HOME/repos/akasha/${STARTUP}` ``, and writes the file.

That failure is not the roots repointing landed in `72c662b6`. `git show 72c662b6 -- tools/tests/bash-env-inside.test.ts` is two hunks: an added `rootsNamed` import, and `roots: { akasha: root, "code-editor": "/nonexistent-code-editor" }` becoming `roots: rootsNamed({ akasha: root })`. The failing case travels the `$HOME` branch at lines 30-35, which reads no roots at all.

Standing beside this and not part of the claim: `repo/roots/roots.d.ts` is untracked — `git ls-files --error-unmatch` reports it matches no file known to git — and stale. It still declares `BOOKS`, `CODE`, `INSTRUCTIONS` and `MEMORY`, two of which were deleted from `repo/roots/roots.ts` in `744595e0` and two of which the source no longer carries at all. It is left in place, being another seat's build output rather than a tracked file.

Not measured: whether any settings document in use actually spells a hook with `$HOME/repos/instructions/`, and how many other readers strip a `repos/` prefix and then test against a fixed repository name.
