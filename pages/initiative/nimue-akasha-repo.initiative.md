---
id: 6242d01b-65f6-58e1-9268-7bc9aa727585
page-type-slug: initiative
slug: nimue-akasha-repo
persona-slug: nimue
domain-slug: repo/akasha-repo
parent-slug: aine-global
---

# Intent

- No references to the old repos remain in akasha.

# Notes

## Scope

`code`, `instructions`, `memory`, `books` and `stories` are retired as repositories, and their bare repos are not to be deleted from the remote. `akasha` and `code-editor` are live.

Kept on the remote means the transport keeps creating and mirroring them. Removing an entry from `infra/git-transport/src/repos.ts` or `infra/git-transport/synth-deployment/init-bare-repo.ts` deletes a repository by a slower route, so what goes is the code that clones one to do work.

References under `pages/finding/` are out of scope. A page whose whole subject is a retired repository is deleted rather than corrected.

No workflow template is live, so the group is deleted rather than repointed. Repointing the addresses one instrument can see, while the rest go on naming a retired repository, leaves a half-migrated dispatch surface nothing can report as wrong.

## The meter

```
bun infra/cluster-checks/src/checks/check-instruction-references.ts --repo-root /var/home/walton/repos/akasha
```

It reads every tracked text file, but it matches three patterns and all three are shaped for one retired repository: an `instructions:` scheme reference, a bare `domains|page-types|properties` document path, and a path through `repos/instructions/`. It sees no `code:`, `memory:`, `books:` or `stories:` address, and no prose spelling at all. Its count is a floor rather than a measure.

It refuses without `--repo-root`, so a bare run reports no violations without having looked at anything.

Delete the check once it reads zero outside `pages/finding/`.

## Where the count sits

Most of what the meter counts is one shape: a graph node id written `<kind>:<repo>:<path>`, whose repo segment spells a retired name. It concentrates in the check-workflow config tables and their fixtures.

Relabelling those is churn. The graph they address was replaced, and the replacement takes a structured `{repo, key}` rather than a joined triple, so a name rewritten now is written twice. The addresses move when dispatch is ported onto the new graph.

Two validators already refuse a dispatch seed that names a node which is not there. Both are unreachable behind stubs of the old graph, and the seeds they would refuse do not survive at any spelling.
