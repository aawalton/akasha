---
id: 6ac7f8f6-9907-535a-b628-fd492404f752
page-type-slug: domain
title: "iOS install"
slug: ios-install
domain-parent-slug: domain/change-harness-device
---

# Definition

- **iOS install** — a change becoming part of the app on Alan's device, through the build that carries it.

# Design

The build on Alan's device stays as it is until the next install, so it can disagree with what the server is already sending.

An install carries every change already on main, not the change that asked for it.
