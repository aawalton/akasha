---
id: 4265ef1c-c3d7-4a77-8bd2-2c3e9d909996
page-type-slug: file-kind-domain
title: "File kind sops yaml"
slug: file-kind-sops-yaml
domain-parent-slug: domain/file-kind-code
name-pattern: "*.sops.yaml"
---

# Definition

- **File kind sops yaml** — a file of secrets encrypted by sops.

# Design

A sops yaml file is not a yaml file: its keys are sops's own and its values are ciphertext.
