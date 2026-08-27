---
id: 52d88b96-eea6-5e26-9373-fbfe0395ed2c
page-type-slug: finding
title: "Talos cluster name literal"
domain-slug: page-type/old-ops-command
---

# Claim

Two talos surfaces spell `"main"` as a literal where akasha holds it as `DEFAULT_CLUSTER_NAME` in `infra/talos/src/nodes.ts:37`. If that constant is renamed there, both advertise and default to a cluster that no longer exists, and nothing reports it.

# Evidence

`ops talos bootstrap` (`tools/commands/talos/bootstrap.ts:10`) and `ops talos health` (`tools/commands/talos/health.ts:10`) each declare a file-local `const DEFAULT_CLUSTER_NAME = "main"`, interpolate it into the `--cluster` flag description, and use it as the default value `--cluster` falls back to. `ops talos apply`, `kubeconfig` and `secrets gen` now import the real constant from `@infra/talos/nodes`; `admin-bootstrap` no longer exists.

A help block can reach the constant: a plain static import serves both the help block and the body, and `tools/commands/talos/apply.ts:16`, `kubeconfig.ts:8` and `secrets/gen.ts:10` each do exactly that. The literal is not the only route, so in the two that keep it it is a duplicate the rename will not follow. Within one file the literal is still spelled once and used by both help block and body, so the two cannot disagree with each other.

It was proved by running the surfaces rather than transcribed on faith: `ops talos secrets gen` with no `--cluster` refuses with the path `clusterSecretsSopsPath` builds for the default cluster, now `pages/cluster/main.sops.yaml` (`infra/talos/src/lib/paths.ts:6`).
