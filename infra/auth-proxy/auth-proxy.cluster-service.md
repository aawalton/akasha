---
id: 0d19e800-16b7-5c11-87ec-d470dd125d51
page-type-slug: cluster-service
title: "Auth proxy"
slug: auth-proxy
domain-parent-slug: domain/network
kind: Deployment
namespace: auth-proxy
resource-name: auth-proxy
---

# Definition

- **Auth proxy** — what decides who a request is from before it reaches anything.

# Design

A request carrying an authorization header is passed straight through, and the backend behind it decides.

A failed check is remembered as well as a successful one, for a shorter time.

A few paths answer with a canned empty body rather than reporting that nothing is behind them.
