---
id: 8c29ccc6-e006-5669-953e-fbdea64c6964
page-type-slug: domain
title: "Ops CLI"
slug: ops-cli
domain-parent-slug: domain/agent-tools
settled: true
---

# Definition

- **Ops CLI** — how agents do things that need no judgment.

# Design

The file path a command is given says which repository it works in.

A relative path is read from the directory the command ran in.

Where nothing says which repository, the command refuses rather than guess.

# Intent

How often each ops command runs, and how often each of its flags is used, can both be answered from what is recorded.
