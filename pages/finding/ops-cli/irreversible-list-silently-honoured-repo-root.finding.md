---
id: 0e2d98ac-a972-5a30-ad87-c21cf0092927
page-type-slug: finding
title: "Irreversible list silently honoured repo root"
domain-slug: domain/ops-cli
---

# Claim

`ops irreversible list` silently honoured an undeclared `--repo-root <path>` flag while its body stood in the code repository, and refuses it now that the body has moved. Nothing declared the flag and nothing calls it, so the narrowing is the surface finally binding — but it is an observable change made by a move that was meant to make none, and it is the shape any verb parsed by `packages/infra/checks/src/lib/cli-args.ts` will show.

# Evidence

Found 2026-08-13 by the seat moving the `misc-b` bodies, running the verb both ways.

Before the move, `ops irreversible list --repo-root /tmp` exited 0 and printed `[irreversible] no verb declares itself irreversible` — it had scanned `/tmp` and found no registries. After the move it exits 1 with `unknown flag: --repo-root`.

The cause is which parser ran. The code-repository body called that repo's own `parseArgs(argv, { ...STANDARD_FLAGS }, { passthrough: true })`, and `STANDARD_FLAGS` declares `json`, `repoRoot`, `config`, `only` and `verbose` for every check in that package. The help block at `tools/commands/irreversible/list.ts` declares `--json` alone and always has, so the four others were reachable and undocumented. The moved body calls `parseArgs` from `tools/lib/code-parse-args.ts` against that declared help, which is what refuses them.

The declared surface did not change: the help block landed byte-identical and `--help` diffs clean. What changed is that the file's own declaration is now what the parser reads.

No caller is affected. `ops irreversible list` is named in one place in this repository, `tools/lib/ops-verb.ts`, which invokes it with `--json`.

Worth filing rather than repairing, two ways: adding `--repo-root` to the help would be inventing a surface while moving a body, and removing `STANDARD_FLAGS` from the far side edits the code repository. Whether the other four flags were ever meant to be part of a check's `ops` surface is a question about that package rather than about this verb.
