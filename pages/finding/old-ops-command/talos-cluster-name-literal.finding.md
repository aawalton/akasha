---
id: 52d88b96-eea6-5e26-9373-fbfe0395ed2c
page-type-slug: finding
title: "Talos cluster name literal"
domain-slug: page-type/old-ops-command
---

# Claim

Six talos surfaces spell `"main"` as a literal where the code repository holds it as `DEFAULT_CLUSTER_NAME` in `packages/infra/talos/src/nodes.ts`. If that constant is renamed there, every one of the six advertises and defaults to a cluster that no longer exists, and nothing reports it.

# Evidence

`ops talos apply`, `bootstrap`, `health`, `kubeconfig`, `secrets gen` and `admin-bootstrap` each interpolate the cluster name into a flag description, and five of the six also use it as the default value `--cluster` falls back to.

A help block cannot reach the constant: `codeModule` is async and the dispatcher imports a verb's file at module load to render a usage screen, so a capability resolved at that level would open one to print `--help`. The literal is the only route, and it is spelled once per file and used by both the help block and the body so the two cannot disagree with each other.

It was proved against the code repository rather than transcribed on faith: `ops talos secrets gen` with no `--cluster` refuses with the path `packages/infra/talos/secrets/main.secrets.sops.yaml`, byte-identical before and after the move, which is the body's default reaching `clusterSecretsSopsPath`. The rendered `--help` of all six is byte-identical too.
