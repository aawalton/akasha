---
id: 5c756084-7937-5a41-8fb5-c8ed836216ff
page-type-slug: old-graph-node-producer
title: "Graph node producer k8s"
slug: graph-node-producer-k8s
domain-parent-slug: page-type/old-graph-node-producer
code-name: k8s
producer-path: tools/lib/graph/producers/k8s/k8s.node.producer.ts
reads-instructions-path:
  - tools/lib/rbac/**
  - tools/lib/cluster-rbac/**
  - tools/commands/cluster-rbac-manifest.ts
nodes-slugs:
  - graph-node-k8s-resource
  - graph-node-k8s-node-hostname
  - graph-node-k8s-namespace-role
---

# Definition

- **Graph node producer k8s** — the producer that reads the Kubernetes manifests and emits their resources, hostnames and roles.
