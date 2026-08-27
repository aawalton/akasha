---
id: 9cbb637c-a441-5e22-b72d-a8c8d359eca3
slug: attributes-and-identity-unrecorded
page-type-slug: finding
title: "Attributes and identity unrecorded"
domain-slug: domain/the-graph
---

# Claim

Six edge types carry no attributes, and 17 of 35 node types carry exactly one that repeats what their node id already holds. Two edge types do the same with their endpoints: `db-trigger-function` builds its `to` from the same schema and name it puts in its attributes. Nothing on any graph domain records either fact, so an absent `attributes:` key reads as unwritten rather than empty, and a repeated attribute reads as independent evidence.

# Evidence

The six with no attributes declare `Record<string, never>`: `pkg-contains-file` and `tsconfig-ref` in `packages/shared/graph/producers/src/package/types.ts`, `workflow-depends-on`, `step-depends-on` and `step-of-workflow` in `.../pipeline/types.ts`, `tunnel-config-recipe-input` in `packages/infra/k8s/cloudflared/producer/types.ts`.

The 17 single-attribute node types each carry the value inside their own id: `fizzFileNodeId(relPath)` against `attrs.path`, `tunnelConfigRecipeNodeId(name)` against `attrs.name`, and so on.

The edge case is in `.../db/trigger/db-trigger.edge.producer.ts`, where `attrs.functionSchema` and `attrs.functionName` feed both `fnAttrs` and `dbFunctionNodeId(...)` for the `to` endpoint.

Design lines for both were drafted and stripped at ad6df10b17 — the placement was unresolved, since the id-repetition holds on nodes and edges alike and was written on graph-node alone.
