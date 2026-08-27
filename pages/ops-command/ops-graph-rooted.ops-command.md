---
id: 4eb52c02-03d2-58d6-8c0a-030c4cbf3b63
page-type-slug: ops-command
title: "Ops graph rooted"
slug: ops-graph-rooted
domain-parent-slug: domain/ops-graph
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/graph/rooted.ts
path: graph rooted
---

# Definition

- **Ops graph rooted** — the share of the code repo's files a deploy carries, at the shas and rule it names.

# Design

The code repo is held to carrying only what a deploy carries; the instructions repo is not, so its files stand outside the measure.

The code repo is read at a commit; the instructions repo, which holds the producers, as it stands.

A reading names both shas and the rule it applied, asked for or not.

There is no default commit, and `HEAD` names the main checkout.

The figure counts files; a node standing for none is reported beside it rather than counted in it.

# Intent

Every rootedness figure anyone quotes came from here.

# Rules

## One Measure

**Take rootedness from `ops graph rooted`, and quote it with both shas it printed.**

A hand-built figure picks its own denominator, and one without its shas cannot be checked.

Never write a script to count rooted nodes.

A figure with one sha is a figure with none.

## Loose Type

**Follow a type one hop past the file it roots before adding it to the rooting list.**

`deploy-carries-package` walks these same types, so a loose one adds packages a deploy carries.

A dead file's import lands in a real package.

Ask if you would declare that package a root.

# Help

Report rootedness: of the files the graph holds for the code repository, what share a deploy carries. A file is rooted when any node standing for it is rooted, and a node is rooted when its type is one of the deployed node types, or when a walk from one of those along the rooting edge types reaches it. Both sets are read off the `pages/graph-node/` and `pages/graph-edge/` documents declaring `deployed: true` and `roots: true`, and the walk is `rootedIn` from `tools/lib/graph/queries/rooted.ts` — this command computes no rootedness of its own.

The figure counts files, so a file standing as more than one node is counted once. What puts a node in it is whether the key it is stored under names a tracked file, read off the node's shape and never off its type name. A node standing for anything else is reported under `outside the figure` and still carries rootedness through the walk to the files it reaches.

The denominator is the code repository's files and nothing else; the instructions repository's stand outside the measure and are reported beside the figure.

Every reading prints the two shas it was taken at, unasked, because the figure moves with both. The code repository is read AT A COMMIT. The instructions repository is read AS IT STANDS — its working tree, at no commit at all — and the graph's producers live there, so the same code commit measured an hour apart can give a different count. A rootedness figure quoted without both shas cannot be checked and should not be believed.

Every reading also prints the rule it applied: the deployed node types and the rooting edge types, by name. A figure rises either because the tree got tidier or because the rule got looser, and those two lists are how a reader tells one from the other.

The population line answers a different question from the percentage: not what share of the files a deploy carries, but what share of the repository's files stand as a node at all. It counts out the files outside the graph's own domain by the same `isOutsideGraphDomain` that `pathsStandingNowhere` applies, so this command and that query cannot disagree about which file is owed a node. The figure reconciles against it: every in-domain tracked file either stands as a node and is counted, or stands as no node and is reported there.
