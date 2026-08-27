---
id: 9e6052eb-75f9-5a38-9482-42bdbbd091a6
page-type-slug: domain
title: "iOS build"
slug: ios-build
domain-parent-slug: domain/change-harness-device
required-reading-slugs:
  - domain/build
  - host/macbook
---

# Definition

- **iOS build** — source turned into an iOS app.

# Design

An iOS build runs on the macbook, the only host with Apple's toolchain.

No pipeline runs an iOS build.

A build makes its web assets on the workstation and compiles the native shell on the macbook.

A build compiles a tree its own run made.

A build copies nothing into an app that the same run did not stage for it.

A build that uploads records what it uploaded.

# Intent

Two builds of one commit install the same dependencies.

