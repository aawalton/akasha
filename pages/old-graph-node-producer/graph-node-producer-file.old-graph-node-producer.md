---
id: eeebf33d-2670-5dae-b1bb-ceff4f6c3b8a
page-type-slug: old-graph-node-producer
title: "Graph node producer file"
slug: graph-node-producer-file
domain-parent-slug: page-type/old-graph-node-producer
code-name: file
producer-path: tools/lib/graph/producers/file/file.node.producer.ts
reads-instructions-path:
  - package.json
  - services/**
  - tools/**
  - packages/**
nodes-slugs:
  - graph-node-file-ts
  - graph-node-file-tsx
  - graph-node-file-js
  - graph-node-file-jsx
  - graph-node-file-css
  - graph-node-file-md
  - graph-node-file-yaml
  - graph-node-file-yml
  - graph-node-file-lua
  - graph-node-file-sql
  - graph-node-file-json
  - graph-node-file-sh
  - graph-node-file-rust
  - graph-node-file-toml
  - graph-node-file-swift
  - graph-node-file-dockerfile
  - graph-node-file-systemd-unit
  - graph-node-file-txt
  - graph-node-file-lock
  - graph-node-file-tsconfig
  - graph-node-file-image
  - graph-node-file-xml
  - graph-node-file-html
  - graph-node-file-python
  - graph-node-file-csv
  - graph-node-file-certificate
  - graph-node-file-env
  - graph-node-file-conf
  - graph-node-file-ignore
  - graph-node-file-sops-config
  - graph-node-file-biome-config
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-package
---

# Definition

- **Graph node producer file** — the producer that walks a repository and emits a node for every file it tracks.
