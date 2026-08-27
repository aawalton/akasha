---
id: 8d26d900-4bb7-5925-a89c-8c6a1f9951c1
page-type-slug: domain
title: "Auth proxy"
slug: auth-proxy
domain-parent-slug: domain/network
---

# Definition

- **Auth proxy** — what decides who a request is from before it reaches anything.

# Design

A request carrying an authorization header is passed straight through, and the backend behind it decides.

A failed check is remembered as well as a successful one, for a shorter time.

A few paths answer with a canned empty body rather than reporting that nothing is behind them.
